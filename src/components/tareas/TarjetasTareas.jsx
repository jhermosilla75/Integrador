import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../../estilos/TarjetasTareas.css";



function TarjetasTareas({ tarea, proyectoNombre, onDelete  }) {
  const { user__id }  = useAuth("state")
  const { token } = useAuth("state");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); // Nuevo estado para controlar el mensaje de éxito
  

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/taskmanager/tasks/${tarea.id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo eliminar la tarea");
      }

      onDelete(tarea.id); // la prop onDelete es una funcion y por eso puede devolver un id unico cuando se renderizo con map
    } catch (error) {
      console.error("Error al eliminar la tarea", error);
    } finally {

      setIsModalOpen(false); 
    }
  };
  return (
    <>
    
    <div className="tarea box">
      <div className="tarea-content">
        <div className="media">
          <div className="media-content">
            <p className="titulo-tarea">TAREA: {tarea.title}</p> 
            <p className="subtitulo-proyecto">
              Proyecto: {proyectoNombre} </p>
          </div>
        </div>
        <div className="content">
          <p>{tarea.description ? tarea.description : "Sin descripción"}</p>
        </div>
      </div>
      {tarea.owner == user__id ? ( 
      <div className="column" onClick={() => setIsModalOpen(true)}>
          <button className="button is-danger">Eliminar</button>
      </div>
      ): null}
    </div>

    {isModalOpen && (
        <div className={`modal ${isModalOpen ? "is-active" : ""}`}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box">
              <p>Se va a eliminar la tarea: {tarea.title}</p>
              <div className="buttons">
                <button
                  className="button is-danger"
                  onClick={handleDelete}
                >
                  Eliminar
                </button>
                <button
                  className="button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setIsModalOpen(false)}
          ></button>
        </div>
      )}
    </>
   );
}

export default TarjetasTareas;
  