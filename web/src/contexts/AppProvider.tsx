import type { ReactNode } from "react";
import { StationProvider } from "./StationContext";
import { UnitsProvider } from "./UnitsContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <StationProvider>
      <UnitsProvider>
        {children}
      </UnitsProvider>
    </StationProvider>
  );
};