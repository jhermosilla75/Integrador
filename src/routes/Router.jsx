import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Auth/Login";
import FormularioTarea from "../components/FormularioTarea";
import FormularioProyecto from "../components/FormularioProyecto";
import Home from "../components/Home";
import Layout from "./Layout";



const Router = createBrowserRouter(
    [
        {
            element: <Layout/>,
            children: [
                {
                    path: "/",
                    element: <Home/>
                },
                {
                    path: "/login",
                    element: <Login/>
                },
                {
                    path: "tarea",
                    element: <FormularioTarea/>
                },
                {
                    path: "proyecto",
                    element: <FormularioProyecto/>
                },
        ],
    },
],
/* {
    basename: "/react_context",
} */
);

export {Router};