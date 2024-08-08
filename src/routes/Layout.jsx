import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Nav from "../components/Nav";
import FooterBar from "../components/FooterBar";
import cuadernos from "../imagenes/cuadernos.jpg"; // Ajusta la ruta según donde hayas guardado la imagen

export default function Layout() {
    return (
        <AuthProvider>
            <div>
                 <Nav />
                 <Outlet />
                 {/* <FooterBar /> */}
            </div>
        </AuthProvider>
    );
}
