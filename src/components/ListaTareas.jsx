import { useState, useEffect } from "react";
import TarjetasTareas from "./TarjetasTareas";

export default function ListaTareas() {
    const [tareas, setTareas] = useState([]);
    const [proyectos, setProyectos] = useState({});
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchProyectos = async () => {
        try {
            const response = await 
            //fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/projects/`);
            
            fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/projects/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${ import.meta.env.VITE_API_TOKEN}`,
            },
        })

            if (!response.ok) {
                throw new Error("No se pudieron cargar los proyectos");
            }
            const data = await response.json();
            const proyectosMap = data.results.reduce((acc, proyecto) => {
                acc[proyecto.id] = proyecto.name;
                return acc;
            }, {});
            setProyectos(proyectosMap);
        } catch (error) {
            setIsError(true);
        }
    };

    const fetchTareas = async () => {
        setIsLoading(true);
        try {
            const response = await 
            
            
            fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/tasks/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${ import.meta.env.VITE_API_TOKEN}`,
            },
        })
            
            if (!response.ok) {
                throw new Error("No se puedieron cargar las tareas");
            }
            const data = await response.json();
            setTareas(data.results);
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProyectos();
        fetchTareas();
    }, []);

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de tareas</h2>
                <div className="tareas-lista">
                    {tareas.map((tarea) => (
                        <div key={tarea.id} className="tarea-item">
                            <TarjetasTareas tarea={tarea} proyectoNombre={proyectos[tarea.project]} />
                        </div>
                    ))}
                </div>
                {isError && <p>Error al cargar las tareas o proyectos.</p>}
                {isLoading && <p>Cargando...</p>}
            </div>
        </div>
    );
}



/* import { useState, useEffect } from "react";
import TarjetasTareas from "./TarjetasTareas";
import { useAuth } from "../contexts/AuthContext";

export default function ListaTareas() {
    const [tareas, setTareas] = useState([]);
    const [proyectos, setProyectos] = useState({});
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { token } = useAuth("state");
    const doFetch = async () => {
        setIsLoading(true);

       fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/tasks/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${ import.meta.env.VITE_API_TOKEN}`,
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("No se pudieron cargar las tareas");
            }
            return response.json();
        })
        .then((data) => {
            setTareas(data.results); 
        })
        .catch((error) => {
            console.error("Error al cargar las tareas:", error);
            setIsError(true);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    useEffect(() => {
        
            doFetch();
        
    }, []); // Asegúrate de que `doFetch` se llame solo si `token` está disponible

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar las tareas.</p>;
    if (tareas.length === 0) return <p>No hay tareas disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de tareas</h2>
                <div className="columns is-multiline">
                    {tareas.map((tarea) => (
                        <div key={tarea.id} className="column is-one-third">
                            <TarjetasTareas tarea={tarea} />
                        </div>
                    ))}
                </div>
                {isError && <p>Error al cargar las tareas.</p>}
            </div>
        </div>
    );
}
 */