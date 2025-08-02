import useHttp from "./useHttp";

export type WeatherResponse = {
  data: Data[];
}

export type Data = {
  datetime: string;
  WDIR: number | null; // Wind direction
  WSPD: number | null;  // Wind speed
  GST: number | null;  // Gust speed
  WVHT: number | null;  // Significant wave height
  DPD: number | null;  // Dominant wave period
  APD: number | null;  // Average wave period
  MWD: number | null;  // Mean wave direction
  PRES: number | null; // Pressure
  ATMP: number | null;  // Air temperature
  WTMP: number | null;  // Water temperature
  DEWP: number | null; // Dew point
  VIS: number | null; // Visibility
  PTDY: number | null; // Pressure tendency
  TIDE: number | null; // Tide level
};

const useWaves = () => {
  const { getRaw } = useHttp();

  const getWaveData = async (): Promise<Data[]> => {
    const txt = await getRaw(
      "https://www.ndbc.noaa.gov/data/realtime2/45005.txt"
    );

    console.log("Raw text received:");
    console.log(txt);

    const lines = txt.split("\n");
    console.log(`Total lines: ${lines.length}`);

    for (const [index, line] of lines.entries()) {
      console.log(`Processing line ${index}: ${line}`);

      if (line.startsWith("#") || line.trim() === "") {
        console.log("Skipping comment or empty line.");
        continue;
      }

      const parts = line.trim().split(/\s+/);
      if (parts.length < 19) {
        console.warn("Skipping line with insufficient parts:", line);
        continue;
      }

      const [
        YY,
        MM,
        DD,
        hh,
        mm,
        WDIR,
        WSPD,
        GST,
        WVHT,
        DPD,
        APD,
        MWD,
        PRES,
        ATMP,
        WTMP,
        DEWP,
        VIS,
        PTDY,
        TIDE,
      ] = parts;

      const toNum = (val: string) =>
        val === "MM" || val === "N/A" || val === undefined ? null : parseFloat(val);

      const WVHTNum = toNum(WVHT);

      if (WVHTNum !== null) {
        const dataPoint: Data = {
          datetime: `${YY}-${MM}-${DD} ${hh}:${mm}`,
          WDIR: toNum(WDIR),
          WSPD: toNum(WSPD),
          GST: toNum(GST),
          WVHT: WVHTNum,
          DPD: toNum(DPD),
          APD: toNum(APD),
          MWD: toNum(MWD),
          PRES: toNum(PRES),
          ATMP: toNum(ATMP),
          WTMP: toNum(WTMP),
          DEWP: toNum(DEWP),
          VIS: toNum(VIS),
          PTDY: toNum(PTDY),
          TIDE: toNum(TIDE),
        };

        console.log("Parsed first valid data row:", dataPoint);

        return [dataPoint]; // Return only first valid WVHT row as single-element array
      }
    }

    console.warn("No valid data rows found.");
    return [];
  };

  return { getWaveData };
};

export default useWaves;
