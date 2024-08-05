import { Link } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";
import ListaTareas from "./ListaTareas";

export default function Home() {
    return (
        <div>
            <Nav />
            <ListaTareas />
             
            <Footer />
            
            
        </div>
    );
}
