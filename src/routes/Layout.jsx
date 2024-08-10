import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Nav from "../components/Nav";
import FooterBar from "../components/FooterBar";
import "../estilos/layout.css";


export default function Layout() {
    return (
        <AuthProvider>
            <div className= "form-lay">
                 <Nav />
                 <Outlet />
                 {/* <FooterBar /> */}
            </div>
        </AuthProvider>
    );
}
