using System.Security.Claims;
using api.Data;
using api.Endpoints.Waves.RequestResponse.NdbcWaves;
using StackExchange.Redis;

namespace api.Endpoints.Waves;

public class WavesServices : BaseService
{
    private readonly LakeTrackerContext _context;

    public WavesServices(
    LakeTrackerContext context,
    IConnectionMultiplexer redis,
    ILogger<WavesServices> logger,
    ClaimsPrincipal principal,
    IConfiguration config)
    : base(context, redis, logger, principal, config)
    {
        _context = context;
    }

    public async Task<ICollection<Domain.Waves>> GetWaves(int stationId)
    {
        var station = await _context.Stations.FindAsync(stationId);
        if (station == null)
        {
            throw new Exception($"No station found with id {stationId}");
        }
        
        var NDBCWavesClient = new HttpClient();
        NDBCWavesClient.BaseAddress = new Uri("https://www.ndbc.noaa.gov/data/realtime2/");

        var wavesRequest = await NDBCWavesClient.GetAsync(
            $"{station.BuoyId}.txt");
        
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

            wavesData.Add(new Domain.Waves
            {
                Time = wave.Timestamp,
                WaveHeight = wave.WaveHeight,
                DominantWavePeriod = wave.DominantWavePeriod,
            });
        }

        foreach (var w in wavesData)
        {
            w.StationId = station.Id;
        }
        return wavesData;
    }
}