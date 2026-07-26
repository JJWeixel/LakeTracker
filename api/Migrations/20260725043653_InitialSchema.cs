using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class InitialSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Stations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RegionCode = table.Column<string>(type: "text", nullable: false),
                    RegionLabel = table.Column<string>(type: "text", nullable: false),
                    WeatherStationId = table.Column<string>(type: "text", nullable: false),
                    AlertZoneId = table.Column<string>(type: "text", nullable: false),
                    BuoyId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Alerts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StationId = table.Column<int>(type: "integer", nullable: false),
                    Event = table.Column<string>(type: "text", nullable: false),
                    Effective = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Onset = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Ends = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Severity = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Instruction = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alerts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Alerts_Stations_StationId",
                        column: x => x.StationId,
                        principalTable: "Stations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WaveReadings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Time = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Buoy = table.Column<string>(type: "text", nullable: false),
                    StationId = table.Column<int>(type: "integer", nullable: false),
                    WaveHeight = table.Column<double>(type: "double precision", nullable: false),
                    DominantWavePeriod = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WaveReadings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WaveReadings_Stations_StationId",
                        column: x => x.StationId,
                        principalTable: "Stations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WeatherReadings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Time = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    StationId = table.Column<int>(type: "integer", nullable: false),
                    AirTemperature = table.Column<double>(type: "double precision", nullable: false),
                    WaterTemperature = table.Column<double>(type: "double precision", nullable: false),
                    WindSpeed = table.Column<double>(type: "double precision", nullable: false),
                    WindDirection = table.Column<double>(type: "double precision", nullable: false),
                    WindDirectionReadable = table.Column<string>(type: "text", nullable: false),
                    GustSpeed = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeatherReadings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WeatherReadings_Stations_StationId",
                        column: x => x.StationId,
                        principalTable: "Stations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Alerts_StationId",
                table: "Alerts",
                column: "StationId");

            migrationBuilder.CreateIndex(
                name: "IX_WaveReadings_Buoy_Time",
                table: "WaveReadings",
                columns: new[] { "Buoy", "Time" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WaveReadings_StationId",
                table: "WaveReadings",
                column: "StationId");

            migrationBuilder.CreateIndex(
                name: "IX_WeatherReadings_StationId_Time",
                table: "WeatherReadings",
                columns: new[] { "StationId", "Time" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Alerts");

            migrationBuilder.DropTable(
                name: "WaveReadings");

            migrationBuilder.DropTable(
                name: "WeatherReadings");

            migrationBuilder.DropTable(
                name: "Stations");
        }
    }
}
