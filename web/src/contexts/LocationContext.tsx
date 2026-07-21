import React, {useContext, createContext, useState} from "react";

type LocationContextType = {
    value: string;
    setValue: (value: string) => void;
    label: string;
    setLabel: (value: string) => void;
    alertStationId: string;
    setAlertStationId: (value: string) => void;
    weatherStationId: string;
    setWeatherStationId: (value: string) => void;
    buoyId: string;
    setBuoyId: (value: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [valueState, setValueState] = useState("cle");
    const [labelState, setLabelState] = useState("Cleveland");
    const [alertStationIdState, setAlertStationIdState] = useState("OHC035");
    const [weatherStationIdState, setWeatherStationIdState] = useState("9063063");
    const [buoyIdState, setBuoyIdState] = useState("45176");

    const setValue = (value: string) => {
        setValueState(value);
    };

    const setLabel = (value: string) => {
        setLabelState(value);
    };

    const setAlertStationId = (value: string) => {
        setAlertStationIdState(value);
    };

    const setWeatherStationId = (value: string) => {
        setWeatherStationIdState(value);
    };

    const setBuoyId = (value: string) => {
        setBuoyIdState(value);
    };

    return (
        <LocationContext.Provider value={{
            value: valueState,
            setValue,
            label: labelState,
            setLabel,
            alertStationId: alertStationIdState,
            setAlertStationId,
            weatherStationId: weatherStationIdState,
            setWeatherStationId,
            buoyId: buoyIdState,
            setBuoyId
        }}>
            {children}
        </LocationContext.Provider>
    );
}

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (!context) throw new Error("useLocation must be used within LocationProvider");
    return context;
};