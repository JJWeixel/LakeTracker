import React, { useContext, createContext, useState } from "react";

type StationContextType = {
    stationId: number;
    setStationId: (value: number) => void;
};

const StationContext = createContext<StationContextType | undefined>(undefined);

export const StationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [stationId, setStationId] = useState(1); // Cleveland, matches your Station seed data

    return (
        <StationContext.Provider value={{ stationId, setStationId }}>
            {children}
        </StationContext.Provider>
    );
};

export const useStation = () => {
    const context = useContext(StationContext);
    if (!context) throw new Error("useStation must be used within StationProvider");
    return context;
};