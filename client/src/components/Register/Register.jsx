import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";
import axios from "axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    address: "",
    email: "",
    password: "",
  });

  const [successM, setSuccessM] = useState(null);
  const [errorM, setErrorM] = useState(null);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const registerSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/register", {
        ...user,
      });
      console.log(response);
      setSuccessM(response.data.message);

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("role", response.data.userFind.role);

      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      setErrorM(error.message);
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    }
  };

  return (
    <div className='formulario'>
<Form onSubmit={registerSubmit}>
  <Row>
    <Col md={6}>
      <FormGroup>
        <Label for="exampleName">
          Nombre
        </Label>
        <Input
          id="exampleName"
          name="name"
          value={user.name}
          placeholder="Nombre"
          type="text"
          onChange={onChangeInput}
        />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="exampleSurname">
          Apellido
        </Label>
        <Input
          id="exampleSurname"
          name="surname"
          value={user.surname}
          placeholder="Apellido"
          type="text"
          onChange={onChangeInput}
        />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="exampleEmail">
          Email
        </Label>
        <Input
          id="exampleEmail"
          name="email"
          value={user.email}
          placeholder="Email"
          type="email"
          onChange={onChangeInput}
        />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="examplePassword">
          Contraseña
        </Label>
        <Input
          id="examplePassword"
          name="password"
          value={user.password}
          placeholder="Contraseña"
          type="password"
          onChange={onChangeInput}
        />
      </FormGroup>
    </Col>
  </Row>
  <FormGroup>
    <Label for="exampleAddress">
      Dirección
    </Label>
    <Input
      id="exampleAddress"
      name="address"
      placeholder="1234 Main St"
      
    />
  </FormGroup>
  <div className="registro boton">
          <Button color="success" outline size="sm">
            Registrarme
          </Button>
          </div>
          <div className="registro boton">
          <Button outline size="sm">
            Volver
          </Button>
        </div>
        
</Form>
      <div
        className="alert alert-primary"
        role="alert"
        style={{ display: successM ? "block" : "none" }}
      >
        {successM}
      </div>
      <div
        className="alert alert-danger"
        role="alert"
        style={{ display: errorM ? "block" : "none" }}
      >
        {errorM}
      </div>
    </div>
  );
};

export default Register;
