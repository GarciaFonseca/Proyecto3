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

//1. Creamos un use state que va a almacenar todos los productos
const cookieJar = new Cookie.CookieJar();

const Products = () => {
  const [products, setProducts] = useState([]);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [cart, setCart] = useState([]);
  

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

  const addToCart = async (productId, valor) => {
    const response = await axiosWithCookies.post(
      "http://localhost:5001/api/cart",
      { productId, valor },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response);
    setCart(response.data.cart);
    // localStorage.setItem("cartId", response.data.newCart._id)
  };






  useEffect(() => {
    getProducts();
  }, []);

  console.log(products);
  return (
    <div>
      <Filter />
      {/* <h1>Nuestros productos: </h1> */}
      {products.map((productos) => {
        return (
          <div key={productos._id}>
           
           <Link key={productos._id}>
              <Card style={{ width: "15rem" }}>
              <img src={process.env.PUBLIC_URL + '/img/Camiseta1.jpg'} alt="" />
                <CardBody>
                  <CardTitle tag="h5">{productos.title}</CardTitle>
                  <CardText>{productos.description}</CardText>
                  <CardText>{productos.category.name}</CardText>
                  <h3 className="link">€: {productos.price}</h3>
                  <Button
                    onClick={() => addToCart(productos._id, productos.valor)}
                  >
                    Agregar al carrito
                  </Button>
                </CardBody>
              </Card>
            </Link>
            <Link key={productos._id}>
              <Card style={{ width: "15rem" }}>
              <img src={process.env.PUBLIC_URL + '/img/Camiseta2.jpg'} alt="" />
                <CardBody>
                  <CardTitle tag="h5">{productos.title}</CardTitle>
                  <CardText>{productos.description}</CardText>
                  <CardText>{productos.category.name}</CardText>
                  <h3 className="link">€: {productos.price}</h3>
                  <Button
                    onClick={() => addToCart(productos._id, productos.valor)}
                  >
                    Agregar al carrito
                  </Button>
                </CardBody>
              </Card>
            </Link>
          </div>
        );
      })}

      {role == 1 ? (
        <Link to={`/new-product`} className="btn btn-primary">
          Nuevo producto
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Products;
