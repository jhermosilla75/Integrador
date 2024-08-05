
import { useState, useEffect } from "react";

function TarjetasTareas({ tarea }) {
    return (
      <div className="tarea box">
        <div className="tarea-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{tarea.title}</p>
              <p className="subtitle is-6">Proyecto: {tarea.project}</p>
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
  