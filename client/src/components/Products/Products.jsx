import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Filter from "../Filter/Filter";

//1. Creamos un use state que va a almacenar todos los productos

const Products = () => {
  const [products, setProducts] = useState([]);
  const role = localStorage.getItem("role")
  const token = localStorage.getItem("token")

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5001/api/producto");
    console.log(response)
    setProducts(response.data.productos);
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log(products);
  return (
    <div>
      <Filter/>
      <h1>Nuestros productos: </h1>
      {products.map((productos) => {
        return (
          <Link key={productos._id} to={`/producto/${productos._id}`}>
            <div>
              <h3>{productos.name}</h3>
              <h3>{productos.category.name}</h3>
              <h3>{productos.description}</h3>
            </div>
          </Link>
        );
      })}
      {
  role ==1?(
    <Link to={`/new-product`} className="btn btn-primary">Nuevo producto</Link>
  ):(<></>)
}
      
    </div>
  );
};

export default Products;
