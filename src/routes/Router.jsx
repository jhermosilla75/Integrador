import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Auth/Login";
import FormularioTarea from "../components/tareas/FormularioTarea";
import FormularioProyecto from "../components/proyectos/FormularioProyecto";
import ListaTareas from "../components/tareas/ListaTareas";
import ListaProyectos from "../components/proyectos/ListaProyectos";
import Home from "../components/Home";
import Profile from "../components/Profile";
import ListaProyectoTareas from "../components/proyectos/ListaProyectoTareas";
import NoExiste from "../components/NoExiste";
import Layout from "./Layout";


import ProtectedRoute from "./ProtectedRoute";





const Router = createBrowserRouter(
    [
        {
            element: <Layout/>,
            children: [
                {
                    index: true,
                    element: <Home/>
                },
                {
                    path: "/login",
                    element: <Login/>
                },
                {
                    path: "/profile",
                    element: (
                        <ProtectedRoute>
                            <Profile/>
                        </ProtectedRoute>
                    )
                },
                {
                    path: "tarea",
                    element:(
                        <ProtectedRoute>
                            <FormularioTarea/>
                        </ProtectedRoute>
                    )
                },
                {
                    path: "tareas",
                    element: (
                        <ProtectedRoute>
                            <ListaTareas/>
                        </ProtectedRoute>
                    )
                },
                {
                    path: "proyecto",
                    element:(
                        <ProtectedRoute>
                            <FormularioProyecto/>
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "lproyecto",
                    element: (
                        <ProtectedRoute>
                            <ListaProyectos/>
                        </ProtectedRoute>
                    )
                },
                {
                    path: "proyectotareas",
                    element: (
                        <ProtectedRoute>
                            <ListaProyectoTareas/>
                        </ProtectedRoute>
                    )
                },
            ],
        },
        {
            path: "*",
            element: <NoExiste/>
        },
    
],

);

export {Router};

/* {
    basename: "/react_context",
} */