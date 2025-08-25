import useHttp from "./useHttp";

export type AlertResponse = {
    event: string;
    effective: string;
    onset: string;
    ends: string;
    severity: string;
    description: string;
    instruction: string;
};

const useAlerts = () => {
    const { getOne } = useHttp();
    const getAlerts = async() => getOne<AlertResponse[]>('alerts');
    return { getAlerts };
}

export default useAlerts;

