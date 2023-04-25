import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

//Navigate me permite redireccionar. Como la etiqueta link pero dentro de una función. 

const Producto = () => {
  const { productoId } = useParams();
  const [ producto, setProducto]  = useState({});
  const [categoria, setCategoria] = useState({})
  const role = localStorage.getItem("role")
  const token = localStorage.getItem("token")
  const navigate = useNavigate() 

  const getProducto = async()=> {
    const response = await axios.get(`http://localhost:5001/api/producto/${productoId}`)
    console.log(response)
    setProducto(response.data.product)
    setCategoria(response.data.product.category)
  }

  useEffect(() => {
    getProducto();
  }, []);

const deleteProduct = async(e) =>{
  e.preventDefault()
  let option = window.confirm("¿Seguro que deseas eliminar este producto?")
  if(option == true){
    try {
      const response = await axios.delete(`http://localhost:5001/api/product/${productoId}`, {
        headers:{
          Authorization: token
        }
      })

      console.log(response)
      setTimeout(()=>{
        // window.location.href="/"
        navigate("/producto")
      },2000)
      
    } catch (error) {
      console.log(error.response)
      
    }
  }
}


// console.log(producto)

  return (
    <div>
       <h1>{producto.name}</h1>
      <h2>{categoria.name}</h2>
      <p>Descripción: {producto.description}</p>
      <p>€{producto.price}</p>
      <Link to={"/producto"} className="btn btn.primary">Volver</Link>
{ 
role == 1? (
  <button className='btn btn-danger' onClick={deleteProduct}>Borrar producto</button>):(<></>)
}
{
  role ==1?(
    <Link to={`/modify/${productoId}`} className="btn btn-grey">Modificar producto</Link>
  ):(<></>)
}

    </div>
  );
};

export default Producto;
