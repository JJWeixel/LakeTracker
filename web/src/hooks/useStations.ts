import useHttp from "./useHttp";

export type StationResponse = {
    id: number;
    regionCode: string;
    regionLabel: string;
    weatherStationId: string;
    alertZoneId: string;
    buoyId: string;
};

const useStations = () => {
    const { getMany } = useHttp();

    const getStations = async () => getMany<StationResponse>("stations");

    return { getStations };
}

export default useStations;