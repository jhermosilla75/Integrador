import { ThemePicker, useTheme } from "@teishi/bulma_theme";
import FormularioTarea from "./componentes/FormularioTarea";

function App() {
  const {primary, secondary } = useTheme("state");
  return (
    <div className={`box m-4 p-4 has-background-${secondary}`}>
        
        <h1 className={`title has-text-${primary}`}>Hello world!</h1>
        <FormularioTarea />
    </div>
    
  );
}
// <ThemePicker />  esto es para usar el cambio de temas, paquete creado por el profe en clase
export default App
