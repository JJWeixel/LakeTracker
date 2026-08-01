using System.Security.Claims;
using api.Data;
using api.Endpoints.Waves.RequestResponse.NdbcWaves;
using StackExchange.Redis;
using Microsoft.EntityFrameworkCore;

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

    public async Task<ICollection<Domain.Waves>> FetchWaves(int stationId)
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
            return new List<Domain.Waves>();
        }
        
        //var allWaves = NdbcWaveParser.ParseAllValid(wavesRequest.Content.ReadAsStringAsync().Result);
        var allWaves = NdbcWaveParser.ParseMostRecent(wavesRequest.Content.ReadAsStringAsync().Result);

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

    public async Task<ICollection<Domain.Waves>> GetWaves(int stationId, int nDays)
    {
        if (nDays <= 0)
        {
            return new List<Domain.Waves>();
        }

        var fromTime = DateTime.UtcNow.AddDays(-nDays);

        var waves = await _context.Waves
            .AsNoTracking()
            .Where(w => w.StationId == stationId && w.Time >= fromTime)
            .OrderBy(w => w.Time)
            .ToListAsync();

        return FillMissingWaveValues(waves)
            .OrderByDescending(w => w.Time)
            .ToList();
    }

    public async Task<ICollection<Domain.Waves>> GetCurrentWaves(int stationId)
    {
        var latest = await _context.Waves
            .AsNoTracking()
            .Where(w => w.StationId == stationId)
            .OrderByDescending(w => w.Time)
            .FirstOrDefaultAsync();

        if (latest == null)
        {
            return new List<Domain.Waves>();
        }

        var previousValues = await _context.Waves
            .AsNoTracking()
            .Where(w => w.StationId == stationId && w.Time < latest.Time)
            .OrderBy(w => w.Time)
            .ToListAsync();

        var filledRows = FillMissingWaveValues(previousValues.Append(latest).ToList());
        return new List<Domain.Waves> { filledRows.Last() };
    }

    private static IEnumerable<Domain.Waves> FillMissingWaveValues(IReadOnlyList<Domain.Waves> waves)
    {
        double? lastWaveHeight = null;
        double? lastDominantWavePeriod = null;

        foreach (var wave in waves)
        {
            if (wave.WaveHeight == null)
            {
                wave.WaveHeight = lastWaveHeight;
            }
            else
            {
                lastWaveHeight = wave.WaveHeight;
            }

            if (wave.DominantWavePeriod == null)
            {
                wave.DominantWavePeriod = lastDominantWavePeriod;
            }
            else
            {
                lastDominantWavePeriod = wave.DominantWavePeriod;
            }
        }

        return waves;
    }
}