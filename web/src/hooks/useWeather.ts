import useHttp from "./useHttp";

export type WeatherResponse = {
    time: Date;
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
    const getWeather = async() => getOne<WeatherResponse[]>('https://localhost:7249/weather')
    return { getWeather };
}

export default useWeather;
