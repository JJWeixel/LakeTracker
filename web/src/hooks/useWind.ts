import type { Metadata } from "@/types/Metadata";
import useHttp from "./useHttp";

export type WeatherResponse = {
    metadata: Metadata;
    data: Data[];
}
export type Data = {
    t: Date;
    s: number;
    d: number;
    dr: string;
    g: number;
    f: string;
}

const useWind = () => {
    const { getOne } = useHttp();
    const getWindTemp = async() => getOne<WeatherResponse>('https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=today&station=9063063&product=wind&time_zone=lst_ldt&interval=h&units=english&application=DataAPI_Sample&format=json')
    return { getWindTemp };
}

export default useWind;