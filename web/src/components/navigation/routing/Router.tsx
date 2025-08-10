import Home from "@/pages/home/Home";
import { createBrowserRouter } from "react-router";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    }
],
    {
        basename: import.meta.env.BASE_URL || "/LakeTracker/"
    }
);

export default Router;