import { useState } from "react";

export default function FormularioProyecto() {
  const [proyecto, setProyecto] = useState({ name: "", description: "", members: 0 });
  const [submitting, setSubmitting] = useState(false);
  const [modal, setModal] = useState({ isVisible: false, content: "" });

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
    fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/projects/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
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
        setProyecto({ name: "", description: "", members: 0 });
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
          <label className="label has-text-left">Ingrese Nombre del Proyecto</label>
          <div className="control">
            <input
              className="input"
              name="name"
              type="text"
              value={proyecto.name}
              onChange={handleInputChange}
              placeholder="Nombre del proyecto"
            />
          </div>
        </div>

        <div className="field">
          <label className="label has-text-left">Descripción del proyecto</label>
          <div className="control">
            <textarea
              className="textarea"
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
