using System;
using System.Collections.Generic;

namespace api.Endpoints.Weather.RequestResponse.NdbcWaves;

public class NdbcWaveRow
{
    public DateTime Timestamp { get; set; }
    public double? WaveHeight { get; set; }
    public double? DominantWavePeriod { get; set; }
}

public static class NdbcWaveParser
{
    public static List<NdbcWaveRow> ParseAllValid(string txt)
    {
        var rows = new List<NdbcWaveRow>();
        var lines = txt.Split('\n');

        int rowCount = 0;
        foreach (var rawLine in lines)
        {
            var line = rawLine.Trim();

            if (string.IsNullOrWhiteSpace(line) || line.StartsWith("#"))
            continue;

            var parts = line.Split(new[] { ' ', '\t' }, StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length < 19)
            continue;

            string WVHT = parts[8];
            string DPD = parts[9];

            if (WVHT == "MM" || WVHT == "N/A") 
            {
                WVHT = null; // Set to null to indicate invalid
            }
            if (DPD == "MM" || DPD == "N/A") 
            {
                DPD = null; // Set to null to indicate invalid
            }

            double? waveHeight = null;
            double? dominantWavePeriod = null;

            if (double.TryParse(WVHT, out double parsedWaveHeight))
            {
                waveHeight = parsedWaveHeight;
            }

            if (double.TryParse(DPD, out double parsedDominantWavePeriod))
            {
                dominantWavePeriod = parsedDominantWavePeriod;
            }

            if (!int.TryParse(parts[0], out int year) ||
            !int.TryParse(parts[1], out int month) ||
            !int.TryParse(parts[2], out int day) ||
            !int.TryParse(parts[3], out int hour) ||
            !int.TryParse(parts[4], out int minute))
            {
                continue;
            }

            var timestampUtc = new DateTime(year, month, day, hour, minute, 0, DateTimeKind.Utc);
            var easternZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
            var timestampEst = TimeZoneInfo.ConvertTimeFromUtc(timestampUtc, easternZone);
            
            rows.Add(new NdbcWaveRow
            {
                Timestamp = timestampEst,
                WaveHeight = waveHeight,
                DominantWavePeriod = dominantWavePeriod
            });

            rowCount++;
            if (rowCount >= 250) break; // Stop after collecting 12 rows
        }

        return rows;
    }
}