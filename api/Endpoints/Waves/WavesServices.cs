using System.Security.Claims;
using System.Text.Json;
using api.Data;
using api.Endpoints.Waves.RequestResponse.NdbcWaves;
using NRedisStack;
using NRedisStack.RedisStackCommands;
using StackExchange.Redis;

namespace api.Endpoints.Waves;

public class WavesServices : BaseService
{
    private readonly IDatabase _redisDatabase;
    private readonly JsonSerializerOptions _jsonOptions;

    public WavesServices(
    LakeTrackerContext context,
    IConnectionMultiplexer redis,
    ILogger<WavesServices> logger,
    ClaimsPrincipal principal,
    IConfiguration config)
    : base(context, redis, logger, principal, config)
    {
        _redisDatabase = redis.GetDatabase();
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = false
        };
    }
    private string buoyId = "45176";
    
    public async Task<Domain.Waves?> GetWavesFromCache()
    {
        var key = $"waves:{buoyId}";
        var cachedWaves = await _redisDatabase.StringGetAsync(key);
        if (cachedWaves.IsNullOrEmpty)
        {
            Logger.LogInformation("No cached waves data found.");
            return null;
        }
        var waves = JsonSerializer.Deserialize<Domain.Waves>(cachedWaves.ToString(), _jsonOptions);
        return waves;
    }

    public async Task<ICollection<Domain.Waves>> GetWaves()
    {
        
        var cachedWaves = await GetWavesFromCache();
        if (cachedWaves != null)
        {
            Logger.LogInformation("Returning cached waves data.");
            return new List<Domain.Waves> { cachedWaves };
        }
        
        var NDBCWavesClient = new HttpClient();
        NDBCWavesClient.BaseAddress = new Uri("https://www.ndbc.noaa.gov/data/realtime2/");

        var wavesRequest = await NDBCWavesClient.GetAsync(
            "45176.txt");
        
        if (!wavesRequest.IsSuccessStatusCode)
        {
            Logger.LogError("Failed to fetch air wave data from NDBC API.");
            return null;
        }
        
        var allWaves = NdbcWaveParser.ParseAllValid(wavesRequest.Content.ReadAsStringAsync().Result);

        var wavesData = new List<Domain.Waves>();

        for (int i = 0; i < allWaves.Count; i++)
        {
            var wave = allWaves[i];
            var waveWVHT = allWaves
                .Where(w => w.WaveHeight > 0)
                .FirstOrDefault();
            var waveDPD = allWaves
                .Where(w => w.DominantWavePeriod > 0)
                .FirstOrDefault();

            wavesData.Add(new Domain.Waves
            {
                Time = wave.Timestamp,
                Buoy = buoyId,
                WaveHeight = waveWVHT?.WaveHeight ?? 0,
                DominantWavePeriod = waveDPD?.DominantWavePeriod ?? 0,
            });
        }

        var waves = wavesData.FirstOrDefault() ?? throw new Exception("No data");
        waves.Buoy = buoyId;
        var key = $"waves:{waves.Buoy}";
        var serialized = JsonSerializer.Serialize(waves, _jsonOptions);
        await _redisDatabase.StringSetAsync(key, serialized, TimeSpan.FromMinutes(60));

        return wavesData;
    }
}