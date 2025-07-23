import { RouterProvider } from "react-router";
import Router from "./components/navigation/routing/Router";
import { ThemeProvider } from "./components/theme/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App(){
  return (
    <QueryClientProvider client={ queryClient }>
      <ThemeProvider defaultTheme="dark" storageKey="laketracker-ui-theme">
        <RouterProvider router={Router}/>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App;