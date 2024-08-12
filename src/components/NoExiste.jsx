import React from 'react';
import { Link } from 'react-router-dom';
import '../estilos/NoExiste.css';

const NoExiste = () => {
  return (
    <div className="no-existe-container">
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link to="/" className="back-home-link">
        Volver al inicio
      </Link>
    </div>
  );
};

export default NoExiste;
