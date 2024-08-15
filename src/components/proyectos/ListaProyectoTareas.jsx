﻿
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";  
import { useLocation } from 'react-router-dom';
import '../../estilos/ListaProyectoTareas.css';
import TarjetasTareas from '../tareas/TarjetasTareas';
import ListaTareas from '../tareas/ListaTareas';




export default function ListaProyectoTareas() {
    const [tareas, setTareas] = useState([]);
    const location = useLocation();
    const { id, name } = location.state || {}; 

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { user__id }  = useAuth("state")
    const { token } = useAuth("state");

    const projectId = Number(id); // Convertir el id a número
    console.log(projectId);
    
    const fetchTareas = async () => {
        setIsLoading(true);
        try {
            const response = await 
                        
            fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/tasks/?project=123`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${ token }`,
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
          fetchTareas();
    }, []);

    return (
        <div>
        <h1 className="project-title">Proyecto: { name }</h1>
        <div className="tareas-lista">
                    {tareas.map((tarea) => (
                        tarea.owner == user__id ?( 
                        <div key={tarea.id} className="tarea-item">
                            <TarjetasTareas
                            tarea={tarea}
                            //proyectoNombre={proyectos[tarea.project]}
                            //onDelete={handleDelete}
                            />
                        </div>
                        ):null
                    ))}
                </div>
                {isError && <p>Error al cargar las tareas o proyectos.</p>}
                {isLoading && <p>Cargando...</p>}
    </div>
    )
}