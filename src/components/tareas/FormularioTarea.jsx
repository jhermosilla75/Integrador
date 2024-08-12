import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../../estilos/FormularioTarea.css";

export default function FormularioTarea() {
  const { token, user__id } = useAuth("state");
  const navigate = useNavigate();
  const location = useLocation();

  const [tarea, setTarea] = useState({
    title: "",
    description: "",
    project: 0,
  });
  const [proyectos, setProyectos] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [modal, setModal] = useState({ isVisible: false, content: "" });

  

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/projects/?page_size=100`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudieron cargar los proyectos");
        }
        return response.json();
      })
      .then((data) => {
        const proyectos = data.results
          .filter((proyecto) => proyecto.owner == user__id)
          .sort((a, b) => a.name.localeCompare(b.name));

        setProyectos(proyectos);
        // Seleccionar el primer proyecto por defecto
        if (proyectos.length > 0) {
          setTarea((prevTarea) => ({
            ...prevTarea,
            project: proyectos[0].id,
          }));
        }
      })
      .catch((error) => {
        console.error("Error al cargar los proyectos", error);
      });

      // Cargar datos de la tarea si existen
    if (location.state && location.state.tarea) {
      setTarea({
        id: location.state.tarea.id,
        title: location.state.tarea.title,
        description: location.state.tarea.description,
        project: location.state.tarea.project,
      });
    }
  }, [location.state, user__id, token]);

  
  function handleInputChange(event) {
    setTarea({
      ...tarea,
      [event.target.name]: event.target.value,
    });
  }

  function handleProyectoChange(event) {
    setTarea({
      ...tarea,
      project: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!tarea.title || tarea.project === 0) {
      setModal({
        isVisible: true,
        content:
          "El nombre de la tarea y la selección de un proyecto son obligatorios.",
      });
      return;
    }
    setSubmitting(true);
    
    const url = tarea.id 
    ? `${import.meta.env.VITE_API_BASE_URL}/taskmanager/tasks/${tarea.id}/`
    : `${import.meta.env.VITE_API_BASE_URL}/taskmanager/tasks/`;
    const operacion = tarea.id ? "PATCH" : "POST";
 
    fetch(url, {
      method: operacion,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(tarea),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo crear la tarea");
        }
        return response.json();
      })
      .then((data) => {
        setModal({
          isVisible: true,
          content: "Operación creada con éxito",
        });
        // Limpiar el formulario
        setTarea({ title: "", description: "", project: proyectos[0].id });
        setTimeout(() => {
          setModal({ isVisible: false, content: "" });
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error al crear la tarea", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  function handleCancel() {
    setModal({
      isVisible: true,
      content: "¿Estás seguro de que deseas cancelar?",
    });
  }

  function handleModalClose(confirm) {
    if (confirm && modal.content === "¿Estás seguro de que deseas cancelar?") {
      setTarea({ title: "", description: "", project: proyectos[0]?.id || 0 });
      navigate("/");
    } else {
      setModal({ isVisible: false, content: "" });
    }
  }

  return (
    <>
      <form className="form-tarea" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label has-text-left">Ingrese Nombre la tarea</label>
          <div className="control">
            <input
              className="input"
              name="title"
              type="text"
              value={tarea.title}
              onChange={handleInputChange}
              placeholder="Nombre tarea"
            />
          </div>
        </div>

        <div className="field">
          <label className="label has-text-left">Seleccione un Proyecto</label>
          <div className="control">
            <div className="select">
              <select
                name="project"
                value={tarea.project}
                onChange={handleProyectoChange}
              >
                {proyectos.map((proyecto) => (
                  <option key={proyecto.id} value={proyecto.id}>
                    {proyecto.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label has-text-left">Descripción</label>
          <div className="control">
            <textarea
              className="textarea"
              name="description"
              value={tarea.description}
              onChange={handleInputChange}
              placeholder="Descripción de la tarea"
            ></textarea>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-primary"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Guardando..." : "Guardar"}
            </button>
          </div>
          <div className="control">
            <button
              className="button is-light"
              type="button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>

      {modal.isVisible && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box">
              <p>{modal.content}</p>
              {modal.content === "¿Estás seguro de que deseas cancelar?" && (
                <div className="buttons">
                  <button
                    className="button is-danger"
                    onClick={() => handleModalClose(true)}
                  >
                    Confirmar
                  </button>
                  <button
                    className="button"
                    onClick={() => handleModalClose(false)}
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setModal({ isVisible: false, content: "" })}
          ></button>
        </div>
      )}
    </>
  );
}