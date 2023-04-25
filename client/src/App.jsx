
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import Pages from "./components/Pages/Pages";



function App() {

//HOOKS: 
/**
 * UseState: Se entiende como una función que almacena una variable, te da el valor default y luego se actualiza y almacena los cambios en esa variable
 * UseEffect: Una función que está en el medio, entre la solicitud de la información y la visualización del componente.
             Hasta que el useEffect no tenga toda la información necesaria (por ejemplo: todos los productos) no se mostrará nada en el componente
 *  */ 


  return (
    <div>
      <NavBar/>
      <Pages/>
      
    </div>
  );
}

export default App;
