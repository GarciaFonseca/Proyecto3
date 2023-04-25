import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(""); //aquí se guarda el texto del input

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5001/api/producto");
    // console.log(response.data.product)
    setProducts(response.data.productos);
  };

  useEffect(() => {
    getProducts();
  }, []);

  //aquí "producto" es una constante que declaro. No hace referencia a otra
  const filteredProducts = products.filter((producto) => {
    return producto.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div>
        {
          /* Aquí es para mostrar lo que se guarda en el array de filteredProducts */
          filteredProducts.map((miProducto) => (
            <div key={miProducto._id}>
              <p>{miProducto.name}</p>
              <p>{miProducto.description}</p>
              <p>{miProducto.price}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Filter;
