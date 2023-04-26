import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookie from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";


const cookieJar = new Cookie.CookieJar();

const Category = () => {
  const [categorias, setCategorias] = useState([]);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const axiosWithCookies = wrapper(
    axios.create({
      jar: cookieJar,
      withCredentials: true,
    })
  );

  const getCategorias = async () => {
    const response = await axiosWithCookies.get(
      "http://localhost:5001/api/categorias"
    );
    console.log(response);
    setCategorias(response.data.categorias);
  };

  useEffect(() => {
    getCategorias();
  }, []);

  console.log(categorias)

  return (
    <div>
      <h1>Categorías</h1>
      <div className="card-container">
        {categorias.map((categoria) => (
          <div key={categoria._id}>
            <Link className="link" to={`/categorias/${categoria.category}`}>
              <Card style={{ width: '18rem' }}>
              <img className="imagen" src={process.env.PUBLIC_URL + '/img/ETIQUETA.jpg'} alt="" />
                <CardBody>
                  <CardTitle tag="h5">{categoria.name}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">{categoria.description}</CardSubtitle>
                </CardBody>
              </Card>
            </Link>
          </div>
        ))}
      </div>
      <div className="boton">
      {role == 1 ? (
        <Link to={`/new-category`} className="white">
          Nueva Categoría
        </Link>
      ) : (
        <></>
      )}
      </div>
    </div>
  );
};

export default Category;
