import { useAuth } from "../contexts/AuthContext";

export default function Home() {
    const {token, user__id} = useAuth("state")
    return (
        <div>
            <h1>Pagina de inicio</h1>
            <p>Token: {token}</p>
            <p>Id: {user__id}</p>
            
            
        </div>
    );
}
