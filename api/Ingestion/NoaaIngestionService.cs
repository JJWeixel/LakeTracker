using api.Data;
using api.Endpoints.Alerts;
using api.Endpoints.Waves;
using api.Endpoints.Weather;
using Microsoft.EntityFrameworkCore;

namespace api.Ingestion
{
    public class NoaaIngestionService : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly ILogger<NoaaIngestionService> _logger;

        public NoaaIngestionService(IServiceScopeFactory scopeFactory, ILogger<NoaaIngestionService> logger)
        {
            _scopeFactory = scopeFactory;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using var timer = new PeriodicTimer(TimeSpan.FromMinutes(30));

            do
            {
                try
                {
                    using var scope = _scopeFactory.CreateScope();
                    var context = scope.ServiceProvider.GetRequiredService<LakeTrackerContext>();
                    var weatherServices = scope.ServiceProvider.GetRequiredService<WeatherServices>();
                    var alertsServices = scope.ServiceProvider.GetRequiredService<AlertsServices>();
                    var wavesServices = scope.ServiceProvider.GetRequiredService<WavesServices>();

                    var stations = await context.Stations.ToListAsync(stoppingToken);

                    foreach (var station in stations)
                    {
                        try
                        {
                            var latestWeatherTime = await context.Weather
                                .AsNoTracking()
                                .Where(weather => weather.StationId == station.Id)
                                .OrderByDescending(weather => weather.Time)
                                .Select(weather => (DateTime?)weather.Time)
                                .FirstOrDefaultAsync(stoppingToken);

                            var latestWaveTime = await context.Waves
                                .AsNoTracking()
                                .Where(wave => wave.StationId == station.Id)
                                .OrderByDescending(wave => wave.Time)
                                .Select(wave => (DateTime?)wave.Time)
                                .FirstOrDefaultAsync(stoppingToken);

                            var weather = await weatherServices.FetchWeather(station.Id);
                            var newWeather = weather
                                .Where(entry => !latestWeatherTime.HasValue || entry.Time > latestWeatherTime.Value)
                                .ToList();

                            if (newWeather.Count > 0)
                            {
                                context.Weather.AddRange(newWeather);
                            }

                            var alerts = await alertsServices.FetchAlerts(station.Id);
                            context.Alerts.AddRange(alerts);

                            var waves = await wavesServices.FetchWaves(station.Id);
                            var newWaves = waves
                                .Where(entry => !latestWaveTime.HasValue || entry.Time > latestWaveTime.Value)
                                .ToList();

                            if (newWaves.Count > 0)
                            {
                                context.Waves.AddRange(newWaves);
                            }

                            await context.SaveChangesAsync(stoppingToken);
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError(ex, "Failed to ingest data for station {StationId}", station.Id);
                        }
                        finally
                        {
                            context.ChangeTracker.Clear();
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Ingestion run failed");
                }
            }
            while (await timer.WaitForNextTickAsync(stoppingToken));
        }
    }
}