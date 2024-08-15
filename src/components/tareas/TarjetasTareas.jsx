import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../../estilos/TarjetasTareas.css";
//
function TarjetasTareas({ tarea, proyectoNombre, onDelete }) {
  // const { user__id } = useAuth("state");
  const { token } = useAuth("state");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState({ isVisible: false, content: "" });
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}taskmanager/tasks/${tarea.id}/`,
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
      
      onDelete(tarea.id);
      
      setModal({
        isVisible: true,

        content: "Operación realizada con éxito",
      });
      
    } catch (error) {
      console.error("Error al eliminar la tarea", error);
    } finally {
      setIsModalOpen(false);
    }
  };
  const handleEdit = () => {
    navigate("/tarea", { state: { tarea } });
  };

  return (
    <>
      <div className="tarea">
        <div className="tarea-content">
          <div className="media">
            <div className="media-content">
              <p className="titulo-tarea">TAREA: {tarea.title}</p>
              <p className="subtitulo-proyecto">Proyecto: {proyectoNombre}</p>
            </div>
          </div>
          <div className="content">
            <p>
              Descripcion:{" "}
              {tarea.description ? tarea.description : "Sin descripción"}
            </p>
          </div>
        </div>
        <div className="c-botones">
          <button className="b-eliminar" onClick={() => setIsModalOpen(true)}>
            Eliminar
          </button>
          <button className="b-editar" onClick={handleEdit}>
            Editar
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className={`modal ${modal.isVisible ? "is-active" : ""}`}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="modal-box">
              <p>Se va a eliminar la tarea: {tarea.title}</p>
              <div className="buttons">
                <button className="button-danger" onClick={handleDelete}
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
          <button className="modal-close" onClick={() => setIsModalOpen(false)}>
            ×
          </button>
        </div>
      )}

      {modal.isVisible && (
       <div className="modal is-active">
       <div className="modal-background"></div>
       <div className="modal-content">
         <div className="box">
           <p>{modal.content}</p>
           
         </div>
       </div>
       
     </div>
      )}
    </>
  );
}

export default TarjetasTareas;
