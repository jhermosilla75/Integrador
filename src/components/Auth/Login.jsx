import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../estilos/Login.css";

function Login() {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth("actions");
  const { isAuthenticated } = useAuth("state");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleCancel = () => {
    navigate('/'); 
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (!isLoading) {
      setIsLoading(true);
      fetch(`${import.meta.env.VITE_API_BASE_URL}api-auth/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("No se pudo iniciar sesión");
          }
          return response.json();
        })
        .then((responseData) => {
          login(responseData.token);
          if (responseData.token) {
            fetch(
              `${
                import.meta.env.VITE_API_BASE_URL
              }/users/profiles/profile_data/`,
              {
                method: "GET",
                headers: {
                  Authorization: `Token ${responseData.token}`,
                },
              }
            )
              .then((response) => {
                if (!response.ok) {
                  throw new Error("No se pudo obtener ID de usuario");
                }
                return response.json();
              })
              .then((response) => {
                login(responseData.token, response.user__id);
              })
              .catch((error) => {
                console.error("Error al obtener ID de usuario", error);
                setIsError(true);
              });
          }
        })
        .catch((error) => {
          console.error("Error error al iniciar sesión", error);
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return (
    <section className="login-section">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Nombre de usuario:</label>
            <div className="input-group">
              <input
                className="input-field"
                type="text"
                id="username"
                name="username"
                ref={usernameRef}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña:</label>
            <div className="input-group">
              <input
                className="input-field"
                type="password"
                id="password"
                name="password"
                ref={passwordRef}
              />
            </div>
          </div>
          <div className="button-group">
            <button
              type="submit"
              className="button submit-button"
            >
              Enviar
            </button>
            <button
              type="button"
              className="button cancel-button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
          {isLoading && <p className="status-message">Cargando...</p>}
          {isError && <p className="status-message">Nombre de usuario o Contraseña incorrecta</p>}
        </form>
      </div>
    </section>
  );
}

export default Login;
