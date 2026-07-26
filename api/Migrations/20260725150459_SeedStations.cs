using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class SeedStations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Stations",
                columns: new[] { "Id", "AlertZoneId", "BuoyId", "RegionCode", "RegionLabel", "WeatherStationId" },
                values: new object[] { 1, "OHC035", "45176", "cle", "Cleveland", "9063063" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Stations",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
