import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';  

import '../estilos/home.css';


export default function Home() {
    const navigate = useNavigate();
    const { user__id }  = useAuth("state")
    const { token } = useAuth("actions");
    
    useEffect(() => {
        if (user__id) {
            navigate("/tareas");
        }
    }, [user__id, navigate]); // Dependencia de user__id y navigate
    
    return (
        <div className="home-container">
            <div className="home-content">
                {user__id ? null : (
                
                    <h1 className="home-title">
                        Bienvenido a tu Task Manager<br />
                        Crea proyectos, asócialos a tareas y monitorea su progreso.<br />
                        Inicia sesión para empezar.
                    </h1>
                )}
            </div>
        </div>
    );
    
}
