import useHttp from "./useHttp";

export type AlertResponse = {
    time: string;
    stationId: number;
    event: string;
    effective: string | null;
    onset: string | null;
    ends: string | null;
    severity: string;
    description: string;
    instruction: string;
};

const useAlerts = () => {
    const { getOne } = useHttp();
    
    const getAlerts = async (stationId: number) =>
        getOne<AlertResponse[]>(`alerts?stationId=${stationId}`);

    return { getAlerts };
}

export default useAlerts;

