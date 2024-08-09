import React from 'react';
import imagen from '../imagenes/cuadernos.jpg'; 
import { useAuth } from '../contexts/AuthContext';  
import ListaTareas from './tareas/ListaTareas';
import ListaProyectos from './proyectos/ListaProyectos';
import '../estilos/home.css';

export default function Home() {
    const { user__id }  = useAuth("state")
    const { login } = useAuth("actions");

    return (
          
        <div className="home-container" style={{ backgroundImage: `url(${imagen})` }}>
            <div className="home-content">
                {login && user__id ? (
                    <ListaProyectos />
                    //
                    
                    ) 
                    :(
                        <h1 className="home-title">
                            Bienvenido al Task Manager<br />
                            Crea proyectos, asócialos a tareas y monitorea su progreso.<br />
                            Inicia sesión para empezar.
                        </h1>
                    )}
            </div>
        </div>
       );
}
