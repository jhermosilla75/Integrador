import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <header>
            <nav
                className={"navbar"}
                role="navigation"
                aria-label="main navigation"
            >
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
                </div>
            </nav>
        </header>
    );
}
