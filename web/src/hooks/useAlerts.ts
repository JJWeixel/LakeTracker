import useHttp from "./useHttp";

export type WeatherAlertResponse = {
    type: string;
    title: string;
    updated: string;
    features: WeatherAlert[];
};

export type WeatherAlert = {
    id: string;
    type: string;
    geometry: null;
    properties: AlertProperties;
};

export type AlertProperties = {
    id: string;
    areaDesc: string;
    event: string;
    severity: string;
    certainty: string;
    urgency: string;
    headline: string;
    description: string;
    instruction: string;
    sent: string;
    effective: string;
    onset: string;
    ends: string;
    status: string;
};

const useAlerts = () => {
    const { getOne } = useHttp();
    const getAlerts = async() => {
        const result = await getOne<WeatherAlertResponse>('https://api.weather.gov/alerts/active/zone/OHC035');
        return result?.features || [];
    }
    return { getAlerts };
}

export default useAlerts;

