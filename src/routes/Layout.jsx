import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Nav from "../components/Nav";
import FooterBar from "../components/FooterBar";


export default function Layout() {
    

    return (
        <AuthProvider>
            <div className={`hero is-fullheight is-flex is-flex-direction-column`}>
                 <Nav />
                 <Outlet />
                 <FooterBar />
           
            </div>
        </AuthProvider>
    );
}
