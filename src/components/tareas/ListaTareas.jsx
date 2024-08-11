import { useState, useEffect } from "react";
import TarjetasTareas from "./TarjetasTareas";
import { useAuth } from "../../contexts/AuthContext";

export default function ListaTareas() {
    const [tareas, setTareas] = useState([]);
    const [proyectos, setProyectos] = useState({});
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { user__id }  = useAuth("state")
    const { token } = useAuth("state");
    
    
    const fetchProyectos = async () => {
        try {
            const response = await 
            //fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/projects/`);   ESTO ERA PARA USARLO CON VARIABLE DE ENTORNO
            
            fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/projects/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                /* Authorization: `Token ${ import.meta.env.VITE_API_TOKEN}`, ESTO ERA PARA USARLO CON VARIABLE DE ENTORNO*/ 
                Authorization: `Token ${ token }`,
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
                        
            fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/tasks/?page_size=100`, {
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

    const handleDelete = (idTarea) => {
        setTareas((prevTareas) => prevTareas.filter((tarea) => tarea.id !== idTarea));
    };
    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de tareas</h2>
                <div className="tareas-lista">
                    {tareas.map((tarea) => (
                        tarea.owner == user__id ?( 
                        <div key={tarea.id} className="tarea-item">
                            <TarjetasTareas
                            tarea={tarea}
                            proyectoNombre={proyectos[tarea.project]}
                            onDelete={handleDelete}
                            />
                        </div>
                        ):null
                    ))}
                </div>
                {isError && <p>Error al cargar las tareas o proyectos.</p>}
                {isLoading && <p>Cargando...</p>}
            </div>
        </div>
    );
}
