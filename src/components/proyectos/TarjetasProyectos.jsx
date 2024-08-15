import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../../estilos/TarjetasProyectos.css";

function TarjetasProyectos({ proyecto, onDelete }) {
  const {  token, user__id } = useAuth("state");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}taskmanager/tasks?project_id=${proyecto.id}?owner=user__id`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("No se pudieron obtener las tareas");
      }

      const data = await response.json();
      setTasks(data); // Guardar las tareas en el estado
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };




  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/taskmanager/projects/${
          proyecto.id
        }/`,
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

      onDelete(proyecto.id);
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
      <div
        className="proyecto box"
        onClick={fetchTasks}
        style={{ cursor: "pointer" }} // Cambia el cursor al pasar por encima
      >
        <div className="proyecto-content">
          <p className="subtitle">Proyecto: {proyecto.name}</p>
          <div className="content">
            <p>
              Descripcion:{" "}
              {proyecto.description ? proyecto.description : "Sin descripción"}
            </p>
          </div>
        </div>
        <div className="c-botones">
          <button
            className="b-eliminar"
            onClick={(e) => {
              e.stopPropagation(); // Evita que el click en el botón se propague al div
              setIsModalOpen(true);
            }}
          >
            Eliminar
          </button>
          <button
            className="b-editar"
            onClick={(e) => {
              e.stopPropagation(); // Evita que el click en el botón se propague al div
              handleEdit();
            }}
          >
            Editar
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className={`modal ${isModalOpen ? "is-active" : ""}`}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box">
              <p>
                ¿Si elimina el proyecto: {proyecto.name} todas las tareas
                relacionadas también seran eliminadas
              </p>
              <div className="button-group">
                <button className="button submit-button" onClick={handleDelete}>
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
