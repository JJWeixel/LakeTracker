import useHttp from "./useHttp";

export type WeatherResponse = {
    metadata: Metadata;
    data: Data[];
}

export type Metadata = {
    id: number;
    name: string;
    lat: number;
    long: number;
}



const useWeather = () => {
    const { getOne } = useHttp();
    const getAirTemp = async() => getOne<WeatherResponse>()
    const getWaterTemp =
}