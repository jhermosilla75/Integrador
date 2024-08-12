import { NavLink } from "react-router-dom";
import "../estilos/nav.css";
import { useAuth } from '../contexts/AuthContext';

export default function Nav() {
  const { logout } = useAuth("actions");
  const { isAuthenticated } = useAuth("state");

  return (
    <header>
      <nav className={"navbar"} role="navigation" aria-label="main navigation">
        <div className="navbar-start">
          <NavLink
            to="/"
            className={({ isActive, isPending, isTransitioning }) =>
              [
                isPending ? "pending" : "",
                isActive ? "has-text-primary" : "",
                isTransitioning ? "transitioning" : "",
              ].join(" navbar-item")
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/lproyecto"
            className={({ isActive, isPending, isTransitioning }) =>
              [
                isPending ? "pending" : "",
                isActive ? "has-text-primary" : "",
                isTransitioning ? "transitioning" : "",
              ].join(" navbar-item")
            }
          >
            Lista Proyectos
          </NavLink>

          <NavLink
            to="/proyecto"
            className={({ isActive, isPending, isTransitioning }) =>
              [
                isPending ? "pending" : "",
                isActive ? "has-text-primary" : "",
                isTransitioning ? "transitioning" : "",
              ].join(" navbar-item")
            }
          >
            Crear Proyecto
          </NavLink>
          <NavLink
            to="/tarea"
            className={({ isActive, isPending, isTransitioning }) =>
              [
                isPending ? "pending" : "",
                isActive ? "has-text-primary" : "",
                isTransitioning ? "transitioning" : "",
              ].join(" navbar-item")
            }
          >
            Crea Tarea
          </NavLink>
        </div>
        <div className="navbar-end">
          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className={({ isActive, isPending, isTransitioning }) =>
                [
                  isPending ? "pending" : "",
                  isActive ? "has-text-primary" : "",
                  isTransitioning ? "transitioning" : "",
                ].join(" navbar-item")
              }
            >
              Iniciar sesión
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/profile"
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isPending ? "pending" : "",
                    isActive ? "has-text-primary" : "",
                    isTransitioning ? "transitioning" : "",
                  ].join(" navbar-item")
                }
              >
                Perfil
              </NavLink>
              <NavLink
                onClick={logout}
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isPending ? "pending" : "",
                    isActive ? "has-text-primary" : "",
                    isTransitioning ? "transitioning" : "",
                  ].join(" navbar-item")
                }
              >
                Cerrar sesión
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
