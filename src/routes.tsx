import type { RouteObject } from "react-router-dom"
import Home from "./pages/home"
import SingleWork from "./pages/singleWork"
import WorkShop from "./pages/work"




const routes: RouteObject[] = [
    {
        path: "/home",
        element: <Home />,
        children: []
    },
    {
        path: "/work",
        element: <WorkShop />,
        children: []
    },
    {
        path: "/singleWork",
        element: <SingleWork />,
        children: []
    }
    
    

   
]

export default routes

