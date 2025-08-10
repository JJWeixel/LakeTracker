import React, { createContext, useContext, useState } from "react";

type UnitsContextType = {
  windUnits: string;
  setWindUnits: (value: string) => void;
  temperatureUnits: string;
  setTemperatureUnits: (value: string) => void;
  heightUnits: string;
  setHeightUnits: (value: string) => void;
};

const UnitsContext = createContext<UnitsContextType | undefined>(undefined);

export const UnitsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windUnitsState, setWindUnitsState] = useState("knots");
  const [temperatureUnitsState, setTemperatureUnitsState] = useState("F");
  const [heightUnitsState, setHeightUnitsState] = useState("feet");
  
  const setWindUnits = (value: string) => {
    setWindUnitsState(value);
  };
  
  const setTemperatureUnits = (value: string) => {
    setTemperatureUnitsState(value);
  };
  
  const setHeightUnits = (value: string) => {
    setHeightUnitsState(value);
  };

  return (
    <UnitsContext.Provider value={{ windUnits: windUnitsState, setWindUnits, temperatureUnits: temperatureUnitsState, setTemperatureUnits, heightUnits: heightUnitsState, setHeightUnits }}>
      {children}
    </UnitsContext.Provider>
  );
};

export const useUnits = () => {
  const context = useContext(UnitsContext);
  if (!context) throw new Error("useUnits must be used within UnitsProvider");
  return context;
};
