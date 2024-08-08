import React from 'react';
import imagen from '../imagenes/cuadernos.jpg'; // Asegúrate de ajustar la ruta según dónde guardaste la imagen

export default function Home() {
    return (
        <div>
            <h1>Pagina de inicio</h1>
            <img src={imagen} alt="Descripción de la imagen" style={{ width: '100%', height: 'auto' }} />
        </div>
    );
}
