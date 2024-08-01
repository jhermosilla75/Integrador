import { useState, useEffect } from "react";

export default function FormularioTarea() {
  const [tarea, setTarea] = useState({title: "", description: "", project: 2});
  const [proyectos, setProyectos] = useState(null);
  
  function handLeInputChange(event) {
    setTarea(
        {
            ...tarea,
            [event.target.name]: event.target.value
        }
    );
  }

  function handleProyectoChange(event) {
    const selectedOptions = Array.from(
        event.target.selectedOptions,
        // Referenciamos el id del proyecto que resolvió la petición a la API
        (option) => option.value
    );
  }

  function handLeSubmit(event) {
    event.preventDefault();
    fetch(`${import.meta.env.VITE_API_BASE_URL}/taskmanager/tasks/`,{
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
            selectedCategories.forEach((project) => {
                fetch(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/taskmanager/projects/`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Token ${token}`,
                        },
                        body: JSON.stringify({
                            article: data.id,
                            category: category.id,
                        }),
                    }
                );
            });
        })
        .catch((error) => {
            console.error("Error de red:", error);
        });
  }
  return (
    <form onSubmit={handLeSubmit}>
      <div className="field">
        <label className="label has-text-left">Ingrese Nombre la tarea</label>
        <div className="control">
          <input
            className="input"
            name="title"
            type="text"
            value={tarea.title}
            onChange={handLeInputChange}
            placeholder="Nombre tarea"
          />
        </div>
      </div>

      <div className="control">
        
        <div className="select">
          <select
          onChange={handleProyectoChange}
          >
            {proyectos.map((proyecto) =>(
                <option key={proyecto.id} value={proyecto.id}>{proyecto.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label className="label has-text-left">Descripcion de la tarea</label>
        <div className="control">
          <textarea
            className="textarea"
            name="description"
            value={tarea.description}
            onChange={handLeInputChange}
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
