import { RouterProvider } from "react-router";
import Router from "./components/navigation/routing/Router";

function App(){
  return (
    <RouterProvider router={Router}/>
  )
}

export default App;