import type { Metadata } from "@/types/Metadata";
import useHttp from "./useHttp";

export type WeatherResponse = {
    metadata: Metadata;
    data: Data[];
}

export type Data = {
    t: Date;
    v: number;
    f: string;
}

const useWaterTemp = () => {
    const { getOne } = useHttp();
    const getWaterTemp = async() => getOne<WeatherResponse>('datagetter?date=today&station=9063063&product=water_temperature&time_zone=lst_ldt&interval=h&units=english&application=DataAPI_Sample&format=json')
    return { getWaterTemp };
}

export default useWaterTemp;
