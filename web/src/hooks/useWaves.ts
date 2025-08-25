import useHttp from "./useHttp";

export type WavesResponse = {
    time: Date;
    buoy: string;
    waveHeight: number;
    dominantWavePeriod: number;
}

const useWaves = () => {
    const { getOne } = useHttp();
    const getWaves = async() => getOne<WavesResponse[]>('waves')
    return { getWaves };
}

export default useWaves;
