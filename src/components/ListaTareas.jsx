
import { useState, useEffect } from "react";
import TarjetasTareas from "./TarjetasTareas";
import { useAuth } from "../contexts/AuthContext";

export default function ListaTareas() {
    const [tareas, setTareas] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Asegúrate de que `useAuth` devuelva un token válido
    const { token } = useAuth(); // Ajusta esto según lo que devuelva `useAuth`

    const doFetch = async () => {
        setIsLoading(true);

        console.log("Token:", token); // Verifica que el token no sea undefined

        fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/tasks/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("No se pudieron cargar las tareas");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Datos recibidos:", data); // Verificar la respuesta de la API
            setTareas(data.results); // Guardar las tareas en el estado
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
        if (token) {
            doFetch();
        }
    }, [token]); // Asegúrate de que `doFetch` se llame solo si `token` está disponible

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
