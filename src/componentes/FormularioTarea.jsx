import { useState, useEffect } from "react";

export default function FormularioTarea() {
  const [tarea, setTarea] = useState({title: "", description: "", project: 2});
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    console.log("useEffect ejecutado");
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
      // Extraer la lista de proyectos del campo `results`
      const proyectos = data.results;
      console.log("Proyectos recibidos:", proyectos);
      setProyectos(proyectos);
    })
    .catch((error) => {
      console.error("Error de red:", error);
    });
  }, []);

  function handleInputChange(event) {
    setTarea({
      ...tarea,
      [event.target.name]: event.target.value
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
    fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
      },
      body: JSON.stringify(tarea)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo crear la tarea");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Tarea creada:", data);
    })
    .catch((error) => {
      console.error("Error de red:", error);
    });
  }

  return (
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
        <label className="label has-text-left">Descripcion de la tarea</label>
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
            name="enviarBtn"
            id="enviarBtn"
          >
            Enviar
          </button>
        </div>
        <div className="control">
          <button
            className="button is-link"
            name="cancelarBtn"
            id="cancelarBtn"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
}