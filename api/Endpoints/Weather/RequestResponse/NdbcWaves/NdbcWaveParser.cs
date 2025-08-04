using System;
using System.Collections.Generic;

namespace api.Endpoints.Weather.RequestResponse.NdbcWaves;

public class NdbcWaveRow
{
    public DateTime Timestamp { get; set; }
    public double? WaveHeight { get; set; }
}

public static class NdbcWaveParser
{
    public static List<NdbcWaveRow> ParseAllValid(string txt)
    {
        var rows = new List<NdbcWaveRow>();
        var lines = txt.Split('\n');

        foreach (var rawLine in lines)
        {
            var line = rawLine.Trim();

            if (string.IsNullOrWhiteSpace(line) || line.StartsWith("#"))
                continue;

            var parts = line.Split(new[] { ' ', '\t' }, StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length < 19)
                continue;

            string WVHT = parts[8];
            Console.WriteLine($"Processing line: {line} | WVHT: {WVHT}"); // Log the line and WVHT

            if (WVHT == "MM" || WVHT == "N/A") 
            {
                Console.WriteLine("Skipping invalid wave height."); // Log skipping
                continue;
            }

            if (double.TryParse(WVHT, out double waveHeight))
            {
                if (!int.TryParse(parts[0], out int year) ||
                    !int.TryParse(parts[1], out int month) ||
                    !int.TryParse(parts[2], out int day) ||
                    !int.TryParse(parts[3], out int hour) ||
                    !int.TryParse(parts[4], out int minute))
                {
                    Console.WriteLine("Skipping line due to invalid date/time."); // Log skipping
                    continue;
                }

                var timestamp = new DateTime(year, month, day, hour, minute, 0, DateTimeKind.Utc);
                Console.WriteLine($"Parsed successfully: {timestamp} | WaveHeight: {waveHeight}"); // Log successful parsing

                rows.Add(new NdbcWaveRow
                {
                    Timestamp = timestamp,
                    WaveHeight = waveHeight
                });
            }
            else
            {
                Console.WriteLine("Failed to parse wave height."); // Log failure
            }
        }

        return rows;
    }
}