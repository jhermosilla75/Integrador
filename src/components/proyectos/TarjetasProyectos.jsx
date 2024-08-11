import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../../estilos/TarjetasProyectos.css";

function TarjetasProyectos({ proyecto, onDelete }) {
  const { user__id, token } = useAuth("state");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/taskmanager/projects/${proyecto.id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo eliminar el proyecto");
      }

      onDelete(proyecto.id); // la prop onDelete es una funcion y por eso puede devolver un id unico cuando se renderizo con map
    } catch (error) {
      console.error("Error al eliminar el proyecto", error);
    } finally {
      setIsModalOpen(false); 
    }
  };
  const handleEdit = () => {
    navigate("/proyecto", { state: { proyecto } });
  };

  return (
    <>
      <div className="proyecto box">
        <div className="proyecto-content">
          {/* <p className="title">Nombre del proyecto</p> */}
          <p className="subtitle">
            Proyecto: {proyecto.name}
          </p>
          <div className="content">
            <p>Descripcion: {proyecto.description ? proyecto.description : "Sin descripción"}</p>
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
        <div className={`modal ${isModalOpen ? "is-active" : ""}`}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box">
              <p>¿Estás seguro de que deseas eliminar este proyecto?</p>
              <div className="button-group">
                <button
                  className="button submit-button"
                  onClick={handleDelete}
                >
                  Eliminar
                </button>
                <button
                  className="button cancel-button"
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

export default TarjetasProyectos;
