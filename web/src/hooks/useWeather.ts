import useHttp from "./useHttp";

export type WeatherResponse = {
    time: string;
    stationId: number;
    airTemperature: number | null;
    waterTemperature: number | null;
    windSpeed: number | null;
    windDirection: number | null;
    windDirectionReadable: string | null;
    gustSpeed: number | null;
}

const useWeather = () => {
    const { getOne } = useHttp();
    const getCurrentWeather = async (stationId: number) =>
            getOne<WeatherResponse[]>(`weather/current?stationId=${stationId}`);
    
        const getWeather = async (stationId: number, nDays: number) =>
            getOne<WeatherResponse[]>(`weather?stationId=${stationId}&nDays=${nDays}`);
    
        return { getCurrentWeather, getWeather };
}

export default useWeather;
