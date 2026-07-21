import type { ReactNode } from "react";
import { LocationProvider } from "./LocationContext";
import { UnitsProvider } from "./UnitsContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <LocationProvider>
      <UnitsProvider>
        {children}
      </UnitsProvider>
    </LocationProvider>
  );
};