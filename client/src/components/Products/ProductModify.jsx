import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const ProductModify = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { productoId } = useParams();
  const [Producto, setProducto] = useState({
    name: "",
    description: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setProducto({ ...Producto, [name]: value });
    console.log(Producto);
  };

  //esta función va a traer al libro y me permite que la información que no modifico se quede igual que antes
  const getProducto = async()=>{
    const response = await axios.get(`http://localhost:5001/api/producto/${productoId}`)
    setProducto(response.data.product)
  }

  useEffect(()=>{
    getProducto()
  },[])

  const modifySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5001/api/product/${productoId}`,
        { ...Producto },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);

      setTimeout(() => {
        navigate(`/producto/${productoId}`);
      }, 2000);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <form onSubmit={modifySubmit}>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          name="name"
          id=""
          value={Producto.name}
          onChange={onChangeInput}
        />
        <label htmlFor="description"> Descripción</label>
        <input
          type="text"
          name="description"
          id=""
          value={Producto.description}
          onChange={onChangeInput}
        />
        <button type="submit" className="btn btn-primary">
          {" "}
          Modificar
        </button>
        <Link to={`/producto/${productoId}`} className="btn btn-primary">
        
          Volver
        
        </Link>
      </form>
    </div>
  );
};

export default ProductModify;
