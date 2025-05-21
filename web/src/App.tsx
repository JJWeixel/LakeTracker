import { RouterProvider } from "react-router";
import Router from "./components/navigation/routing/Router";
import { ThemeProvider } from "./components/theme/theme-provider";

function App(){
  return (
    <ThemeProvider defaultTheme="dark" storageKey="laketracker-ui-theme">
      <RouterProvider router={Router}/>
    </ThemeProvider>
  )
}

export default App;