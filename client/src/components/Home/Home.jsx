import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Filter from "../Filter/Filter";
import { wrapper } from "axios-cookiejar-support";
import Cookie from "tough-cookie";
import {
  Card,
  CardBody,
  CardText,
  Button,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

const cookieJar = new Cookie.CookieJar();

const Home = () => {
  const [products, setProducts] = useState([]);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const axiosWithCookies = wrapper(
    axios.create({
      jar: cookieJar,
      withCredentials: true,
    })
  );

  const getProducts = async () => {
    const response = await axiosWithCookies.get(
      "http://localhost:5001/api/producto"
    );
    console.log(response);
    setProducts(response.data.productos);
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log(products);
  return (
    <div >
      <img className="imagen" src={process.env.PUBLIC_URL + '/img/nombre daniela fonseca negro.png'} alt="" />
      <div className="card-container">
        {products.map((producto) => (
          <div key={producto._id} >
            <Link className="link" to={`/producto/${producto._id}`}>
              <Card style={{ width: '18rem' }}>
              <img className="imagen" src={process.env.PUBLIC_URL + '/img/Camiseta2.jpg'} alt="" />
                <CardBody>
                  <CardTitle tag="h5" className="no-underline">{producto.title}</CardTitle>
                  <CardText>{producto.name}</CardText>
                  <h3 className="link no-underline">€: {producto.price}</h3>
                </CardBody>
              </Card>
            </Link>
          </div>
        ))}
        </div>
      <div className="boton">
      {role == 1 ? (
        <Link to={`/new-product`} className="white">
          Nuevo producto
        </Link>
      ) : (
        <></>
      )}
      </div>
    </div>
  );
};

export default Home;
