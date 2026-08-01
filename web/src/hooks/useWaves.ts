import useHttp from "./useHttp";

export type WavesResponse = {
    time: string;
    stationId: number;
    waveHeight: number | null;
    dominantWavePeriod: number | null;
}

const useWaves = () => {
    const { getOne } = useHttp();

    const getCurrentWaves = async (stationId: number) =>
        getOne<WavesResponse[]>(`waves/current?stationId=${stationId}`);

    const getWaves = async (stationId: number, nDays: number) =>
        getOne<WavesResponse[]>(`waves?stationId=${stationId}&nDays=${nDays}`);

    return { getCurrentWaves, getWaves };
}

export default useWaves;
