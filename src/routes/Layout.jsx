import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";


export default function Layout() {
    

    return (
        <AuthProvider>
            <div
                className={`hero is-fullheight is-flex is-flex-direction-column`}
            >
                <Outlet />
           
            </div>
        </AuthProvider>
    );
}
