function TarjetasTareas({ tarea, proyectoNombre }) {
  return (
    <div className="tarea box">
      <div className="tarea-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-5 has-text-link">{tarea.title}</p> {/* Nombre de tarea más pequeño y en azul */}
            <p className="subtitle is-6 has-text-grey-light">Proyecto: {proyectoNombre} </p>
          </div>
        </div>
        <div className="content">
          <p>{tarea.description ? tarea.description : "Sin descripción"}</p>
        </div>
      </div>
    </div>
  );
}

export default TarjetasTareas;
  