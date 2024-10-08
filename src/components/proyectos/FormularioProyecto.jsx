import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../../estilos/FormularioProyecto.css";

export default function FormularioProyecto() {
  const { token, user__id } = useAuth("state");
  const location = useLocation();
  const navigate = useNavigate();

  const proyectoExistente = location.state?.proyecto || null;
  
  const [proyecto, setProyecto] = useState(
    { name: "",
      description: ""
    });
  const [submitting, setSubmitting] = useState(false);
  const [modal, setModal] = useState({ isVisible: false, content: "" });

  useEffect(() => {
    
    if (proyectoExistente) {
      setProyecto(proyectoExistente);
    }
  }, [proyectoExistente]);
  
  
  function handleInputChange(event) {
    setProyecto({
      ...proyecto,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!proyecto.name) {
      setModal({
        isVisible: true,
        content: "El nombre del proyecto es obligatorio.",
      });
      return;
    }
    setSubmitting(true);

    const operacion = proyectoExistente ? "PATCH" : "POST";
    const url = proyectoExistente 
      ? `${import.meta.env.VITE_API_BASE_URL}/taskmanager/projects/${proyectoExistente.id}/`
      : `${import.meta.env.VITE_API_BASE_URL}/taskmanager/projects/`;

    fetch(url, {
      method: operacion,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(proyecto),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo crear el Proyecto");
        }
        return response.json();
      })
      .then((data) => {
        setModal({
          isVisible: true,
          content: "Operación realizada con éxito",
        });
        setProyecto({ name: "", description: "" });
        setTimeout(() => {
          setModal({ isVisible: false, content: "" });
          navigate("/lproyecto"); 
        }, 2000);
      })
      .catch((error) => {
        console.error("Error al crear el proyecto", error);
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
      setProyecto({ name: "", description: "" });
      navigate("/lproyecto"); 
    } else {
      setModal({ isVisible: false, content: "" });
    }
  }

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit} className="formulario-proyecto">
        <div className="field">
          <label className="label has-text-left" htmlFor="proyecto">
            Ingrese Nombre del Proyecto
          </label>
          <div className="control">
            <input
              className="input"
              id="proyecto"
              name="name"
              type="text"
              value={proyecto.name}
              onChange={handleInputChange}
              placeholder="Nombre del proyecto"
            />
          </div>
        </div>

        <div className="field">
          <label className="label has-text-left" htmlFor="description">
            Descripción del proyecto
          </label>
          <div className="control">
            <textarea
              className="textarea"
              id="description"
              name="description"
              value={proyecto.description}
              onChange={handleInputChange}
              placeholder="Escribe tu mensaje"
            ></textarea>
          </div>
        </div>

        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button
              className="button is-primary mr-2"
              type="submit"
              disabled={submitting}
              name="enviarBtn"
              id="enviarBtn"
            >
              Guardar
            </button>
          </div>
          <div className="control">
            <button
              className="button is-link"
              type="button"
              onClick={handleCancel}
              name="cancelarBtn"
              id="cancelarBtn"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>

      {modal.isVisible && (
        <div className={`modal ${modal.isVisible ? "is-active" : ""}`}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box">
              <p>{modal.content}</p>
              {modal.content === "¿Estás seguro de que deseas cancelar?" ? (
                <div className="buttons">
                  <button
                    className="button is-danger"
                    onClick={() => handleModalClose(true)}
                  >
                    Sí
                  </button>
                  <button
                    className="button"
                    onClick={() => handleModalClose(false)}
                  >
                    No
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          {modal.content !== "Operación realizada con éxito" && (
            <button
              className="modal-close is-large"
              aria-label="close"
              onClick={() => handleModalClose(false)}
            ></button>
          )}
        </div>
      )}
    </div>
  );
}
