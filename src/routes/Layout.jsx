import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Nav from "../components/Nav";
import FooterBar from "../components/FooterBar";


export default function Layout() {
    return (
        <AuthProvider>
            <div>
                 <Nav />
                 <Outlet />
                 <FooterBar />
            </div>
        </AuthProvider>
    );
}
