import { useState, useEffect } from "react";

export default function FormularioTarea() {
  const [tarea, setTarea] = useState({ title: "", description: "", project: 0 });
  const [proyectos, setProyectos] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [modal, setModal] = useState({ isVisible: false, content: "" });
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/projects/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudieron cargar los proyectos");
        }
        return response.json();
      })
      .then((data) => {
        const proyectos = data.results.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
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
      })
      /* .finally(() => {
        setCargandoProyectos(false);
      }); */
  }, []);

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
        content: "El nombre de la tarea y la selección de un proyecto son obligatorios.",
      });
      return;
    }
    setSubmitting(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
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
        console.log("Tarea creada:", data);
        setModal({
          isVisible: true,
          content: "Tarea creada con éxito",
        });
        // Limpiar el formulario
        setTarea({ title: "", description: "", project: proyectos[0].id });
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
    }
    setModal({ isVisible: false, content: "" });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          <label className="label has-text-left">Descripción de la tarea</label>
          <div className="control">
            <textarea
              className="textarea"
              name="description"
              value={tarea.description}
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
              Crear Tarea
            </button>
          </div>
          <div className="control">
            <button
              className="button is-primary"
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
              {modal.content === "¿Estás seguro de que deseas cancelar?" && (
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
              )}
              {modal.content !== "¿Estás seguro de que deseas cancelar?" && (
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
