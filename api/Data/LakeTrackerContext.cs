using Microsoft.EntityFrameworkCore;
using api.Domain;
using Microsoft.Extensions.Options;

namespace api.Data
{
    public class LakeTrackerContext : DbContext
{
    public LakeTrackerContext(DbContextOptions<LakeTrackerContext> options) : base(options) { }

    public DbSet<Station> Stations { get; set; }
    public DbSet<Weather> WeatherReadings { get; set; }
    public DbSet<Waves> WaveReadings { get; set; }
    public DbSet<Alert> Alerts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Weather>()
            .HasIndex(w => new { w.StationId, w.Time })
            .IsUnique();

        modelBuilder.Entity<Waves>()
            .HasIndex(w => new { w.Buoy, w.Time })
            .IsUnique();

        modelBuilder.Entity<Station>().HasData(
            new Station { Id = 1, RegionCode = "cle", RegionLabel = "Cleveland", AlertZoneId = "OHC035", BuoyId = "45176", WeatherStationId = "9063063"}
        );
    }
}
}