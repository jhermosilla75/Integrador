
import FormularioTarea from "./componentes/FormularioTarea";
import FormularioProyecto from "./componentes/FormularioProyecto";

function App() {
  //const {primary, secondary } = useTheme("state");
  return (
    <div className="box m-4 p-4" >
        <h1 className="title has-text-centered">Esta va a ser la pagina principal</h1>
        
        {/* <FormularioProyecto /> */}
        <FormularioTarea/>
    </div>
    
  );
}
export default App
