import { RouterProvider } from "react-router";
import Router from "./components/navigation/routing/Router";
import { ThemeProvider } from "./components/theme/theme-provider";
import { AppProviders } from "@/contexts/AppProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App(){
  return (
    <QueryClientProvider client={ queryClient }>
      <ThemeProvider defaultTheme="dark" storageKey="laketracker-ui-theme">
        <AppProviders>
          <RouterProvider router={Router}/>
        </AppProviders>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App;