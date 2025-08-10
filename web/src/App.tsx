import { RouterProvider } from "react-router";
import Router from "./components/navigation/routing/Router";
import { ThemeProvider } from "./components/theme/theme-provider";
import { UnitsProvider } from "@/contexts/UnitsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App(){
  return (
    <QueryClientProvider client={ queryClient }>
      <ThemeProvider defaultTheme="dark" storageKey="laketracker-ui-theme">
        <UnitsProvider>
          <RouterProvider router={Router}/>
        </UnitsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App;