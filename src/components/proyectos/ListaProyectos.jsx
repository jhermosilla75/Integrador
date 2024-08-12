import { useState, useEffect } from "react";
import TarjetasProyectos from "./TarjetasProyectos";
import { useAuth } from "../../contexts/AuthContext";
import "../../estilos/ListaProyectos.css";

 function ListaProyectos() {
    const [proyectos, setProyectos] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { user__id, token }  = useAuth("state");
    

    const fetchProyectos = async () => {
        setIsLoading(true);
        try {
            const response = await 
                        
            fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/projects/?page_size=100`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${ token }`,
            },
        })
            
            if (!response.ok) {
                throw new Error("No se puedieron cargar los proyectos");
            }
            const data = await response.json();
            setProyectos(data.results);
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProyectos();
    }, []);

    const handleDelete = (idProyecto) => {
        setProyectos((prevProyectos) => prevProyectos.filter((proyecto) => proyecto.id !== idProyecto));
    };

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de Proyectos</h2>
                <div className="proyecto-lista">
                    {proyectos.map((proyecto) => (
                        proyecto.owner == user__id ?( 
                        <div key={proyecto.id} className="proyecto-item">
                            <TarjetasProyectos
                            proyecto={proyecto}
                            onDelete={handleDelete}
                            />
                        </div>
                        ):null
                    ))}
                </div>
                {isError && <p>Error al cargar los proyectos.</p>}
                {isLoading && <p>Cargando...</p>}
            </div>
        </div>
    );
}

export default ListaProyectos;