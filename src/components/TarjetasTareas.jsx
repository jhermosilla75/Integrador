import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";



function TarjetasTareas({ tarea, proyectoNombre }) {
  const { user__id }  = useAuth("state")
  const { token } = useAuth("state");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      onDelete(tarea.id); // Actualiza la lista de tareas en el componente padre
    } catch (error) {
      console.error("Error al eliminar la tarea", error);
    } finally {
      setIsModalOpen(false); // Cierra el modal
    }
  };
  return (
    <>
    <div className="tarea box">
      <div className="tarea-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-5 has-text-link">{tarea.title}</p> 
            <p className="subtitle is-6 has-text-grey-light">
              Proyecto: {proyectoNombre} </p>
          </div>
        </div>
        <div className="content">
          <p>{tarea.description ? tarea.description : "Sin descripción"}</p>
        </div>
      </div>
      {tarea.owner === user__id ? ( 
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
              <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
              <div className="buttons">
                <button
                  className="button is-danger"
                  onClick={handleDelete}
                >
                  Sí, eliminar
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
  