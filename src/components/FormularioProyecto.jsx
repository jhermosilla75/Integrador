import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function FormularioProyecto() {
  const [proyecto, setProyecto] = useState({ name: "", description: ""});
  const [submitting, setSubmitting] = useState(false);
  const [modal, setModal] = useState({ isVisible: false, content: "" });

  const  { token } = useAuth("state")
  console.log("Token", token)

  function handleInputChange(event) {
    setProyecto({
      ...proyecto,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!proyecto.proyecto) {
        setModal({
          isVisible: true,
          content: "El nombre del proyecto es obligatorio.",
        });
        return;
      }
    setSubmitting(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/projects/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${ token }`,
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
        console.log("Proyecto creado:", data);
        setModal({
          isVisible: true,
          content: "Proyecto creado con éxito",
        });
        setProyecto({ name: "", description: "" });
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
      setProyecto({ name: "", description: "", members: 0 });
    }
    setModal({ isVisible: false, content: "" });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label has-text-left" htmlFor="proyecto">Ingrese Nombre del Proyecto </label>
          <div className="control">
            <input
              className="input"
              id="proyecto"
              name="proyecto"
              type="text"
              value={proyecto.proyecto}
              onChange={handleInputChange}
              placeholder="Nombre del proyecto"
            />
          </div>
        </div>

        <div className="field">
          <label className="label has-text-left" htmlFor="description">Descripción del proyecto</label>
          <div className="control">
            <textarea
              className="textarea"
              id="description"
              name="description"
              type="text"
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
              Enviar
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
              ) : (
                <button
                  className="button is-primary"
                  onClick={() => handleModalClose(false)}
                >
                  Cerrar
                </button>
              )}
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => handleModalClose(false)}
          ></button>
        </div>
      )}
    </>
  );
}
