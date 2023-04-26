import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Col, Row } from "reactstrap";
import axios from "axios";

const NewCategory = ({ updateCategories }) => {
  // Estados iniciales del formulario de categoría
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  // Estados iniciales de los mensajes de éxito y error
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Función que actualiza el estado de los inputs del formulario de categoría
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
    console.log(category);
  };

  // Obtener el token de autenticación del almacenamiento local
  const token = localStorage.getItem("token");

  // Función que se ejecuta cuando se envía el formulario de categoría
  const categorySubmit = async (event) => {
    event.preventDefault();
    try {
      // Petición POST para crear una nueva categoría en la API
      const response = await axios.post(
        "http://localhost:5001/api/categorias",
        { ...category },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      // Se actualiza el mensaje de éxito y se limpian los inputs del formulario
      setSuccessMsg(response.data.message);
      setCategory({ name: "", description: "" });
      // Se actualiza la lista de categorías
      updateCategories();
    } catch (error) {
      // En caso de error se actualiza el mensaje de error
      setErrorMsg(error.message);
    }
    // Se limpian los mensajes después de 3 segundos
    setTimeout(() => {
      setSuccessMsg(null);
      setErrorMsg(null);
    }, 3000);
  };

  return (
    <div>
      <div className="new-category">
      <Form onSubmit={categorySubmit}>
<Row>
    <Col md={6}>
      <FormGroup>
        <Label for="exampleName">
          Nombre
        </Label>
        <Input
          id="categoryName"
          name="name"
          value={category.name}
          placeholder="Nombre"
          type="text"
          onChange={onChangeInput}
        />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="categoryDescription">
          Descripción
        </Label>
        <Input
          id="exampleSurname"
          name="description"
          value={category.description}
          placeholder="Descripción"
          type="text"
          onChange={onChangeInput}
        />
      </FormGroup>
    </Col>
    </Row>
    <div className="registro boton">
        <Button color="success" outline size="sm">Crear Categoría</Button>
      </div>
      <div className="registro boton">
          <Button outline size="sm">
            Volver
          </Button>
        </div>
      </Form>
      </div>
      {/* Mensaje de éxito (se muestra solo si hay mensaje) */}
      <div
        className="alert alert-primary"
        role="alert"
        style={{ display: successMsg ? "block" : "none" }}
      >
        {successMsg}
      </div>
      {/* Mensaje de error (se muestra solo si hay mensaje) */}
      <div
        className="alert alert-danger"
        role="alert"
        style={{ display: errorMsg ? "block" : "none" }}
      >
        {errorMsg}
      </div>
    </div>
  );
};

export default NewCategory;
