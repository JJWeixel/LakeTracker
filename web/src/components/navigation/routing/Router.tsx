import Home from "@/pages/home/Home";
import { createBrowserRouter } from "react-router";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    }
]);

export default Router;