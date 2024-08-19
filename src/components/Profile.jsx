import { useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../estilos/Profile.css"; 

function Profile() {
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        dob: "",
        bio: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { token, user__id } = useAuth("state");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(
            `${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data/`,
            {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se encontraror datos del usuario");
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData.first_name);
        const updatedData = {
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            dob: userData.dob,
            bio: userData.bio,
            
        };
        fetch(
            `${import.meta.env.VITE_API_BASE_URL}users/profiles/${ user__id }`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(updatedData),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se encontraror datos del usuario");
                }
                return response.json(userData);
            })
            .then((data) => {
                setUserData(data);
                console.log("Perfil actualizado con exito");
                navigate("/")
            });
        
        // Aquí iría la lógica para enviar el formulario al backend.
    };

    if (loading) return <p>Cargando perfil...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="form-container">
            <form className="form-profile" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label className="form-label">Nombre</label>
                    <input
                        className="form-input"
                        type="text"
                        name="first_name"
                        value={userData.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">Apellido</label>
                    <input
                        className="form-input"
                        type="text"
                        name="last_name"
                        value={userData.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">Email</label>
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">Fecha de Nacimiento</label>
                    <input
                        className="form-input"
                        type="date"
                        name="dob"
                        value={userData.dob}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">Biografía</label>
                    <textarea
                        className="form-textarea"
                        name="bio"
                        value={userData.bio}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-control">
                    <button className="form-button" type="submit">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Profile;
