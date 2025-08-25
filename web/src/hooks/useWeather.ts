import useHttp from "./useHttp";

export type WeatherResponse = {
    time: Date;
    station: string;
    airTemperature: number;
    waterTemperature: number;
    windSpeed: number;
    windDirection: number;
    windDirectionReadable: string;
    gustSpeed: number;
    waveHeight: number;
    dominantWavePeriod: number;
}

const useWeather = () => {
    const { getOne } = useHttp();
    const getWeather = async() => getOne<WeatherResponse[]>('weather')
    return { getWeather };
}

export default useWeather;
