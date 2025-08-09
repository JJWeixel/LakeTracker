import useHttp from "./useHttp";

export type WavesResponse = {
    time: Date;
    buoy: string;
    waveHeight: number;
    dominantWavePeriod: number;
}

const useWaves = () => {
    const { getOne } = useHttp();
    const getWaves = async() => getOne<WavesResponse[]>('https://localhost:7249/waves')
    return { getWaves };
}

export default useWaves;
