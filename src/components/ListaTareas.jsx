
import { useState, useEffect } from "react";
import TarjetasTareas from "./TarjetasTareas";

export default function ListaTareas() {
    const [tareas, setTareas] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    

    const doFetch = async () => {
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/tasks/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se puedieron cargar las tareas");
                }
                return response.json();
            })
            .then((data) => {
                setTareas(data.results); // Guardar las tareas en el estado
                
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        doFetch();
    }, []);

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar las canciones.</p>;
    if (!data) return <p>No hay canciones disponibles</p>;

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
