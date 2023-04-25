import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//Para conectar back con front
/**
 * 1. Necesito una dependencia para hacer la llamada al backend: axios
 *    installo axios: npm i axios: Cumple una función similar al fetch
 * 2. Necesito useState
 * 3. Vamos a trabajar con dos terminales; una para back (ejecutar las llamadas) y otra para front
 */

//Se crea la función y se exporta al mismo tiempo
// export default function Login() {
//   return (
//     <div>Login</div>
//   )
// }

//Se crea la función y luego se exporta

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //Para manejar errores
  const [successM, setSuccessM] = useState(null);
  const [errorM, setErrorM] = useState(null);

  //Voy a crear un "On change" que va a permitir que al ingresar información en el campo de, por ejemplo, email, la información
  //se vaya actualizando en la variable "user" que he declarado en el useState

  const onChangeInput = (e) => {
    const { name, value } = e.target; //evita que los componentes se actualicen hasta que yo haga click en el botón para actualizar
    setUser({ ...user, [name]: value }); //En esta línea, name es la propiedad del back end, sea email o contraseña... etc-
    // y el value es el valor que yo ingreso
    console.log(user);
  };

  //Lo siguiente es crear la función encargada de coger los datos del estado y enviarlos al backend.
  //Lo que sería el SEND en postman. Una vez tengo la info en le body, le doy send para que compare con el backend y me dé respuesta
  const loginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        ...user,
      }); // ...user que hace referencia al email y constraseña ingresados
      console.log(response);
      setSuccessM(response.data.message);

      //guardar información del usuario en la memoria del navegador 
      localStorage.setItem("token", response.data.accessToken)
      localStorage.setItem("role", response.data.userFind.role) 

      setTimeout(()=>{
        window.location.href ="/"
      },3000)
    } catch (error) { 
      setErrorM(error.message)
      setTimeout(()=>{
        window.location.href ="/login"
      }, 3000)
    }
  };

  

  //Lo siguiente es agregar al formulario la función: onSubmit, que es para cuando se envía el formulario, cuando se da click en login

  return (
    <div>
      <Form onSubmit={loginSubmit}>
        <FormGroup floating>
          <Input
            id="exampleEmail"
            name="email"
            value={user.email}
            placeholder="Email"
            type="email"
            onChange={onChangeInput}
          />
          <Label for="exampleEmail">Email</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="examplePassword"
            name="password"
            value={user.password}
            placeholder="Password"
            type="password"
            onChange={onChangeInput}
          />
          <Label for="examplePassword">Password</Label>
        </FormGroup>{" "}
        <Button>Submit</Button>
      </Form>
      <div className="alert alert-primary" role="alert" style= {{display: successM ? "block" : "none"}}>
        {successM}
      </div>
      <div className="alert alert-danger" role="alert" style= {{display: errorM ? "block" : "none"}}>
        {errorM}
      </div>
    </div>
  );
};

export default Login;
