import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Auth/Login";
import FormularioTarea from "../components/FormularioTarea";
import FormularioProyecto from "../components/FormularioProyecto";
import Home from "../components/Home";
import Profile from "../components/Profile";
import Layout from "./Layout";
import ListaTareas from "../components/ListaTareas";
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
                    path: "*",
                    element: <h1>Not Found</h1>
                },

                
               
        ],
    },
],
/* {
    basename: "/react_context",
} */
);

export {Router};