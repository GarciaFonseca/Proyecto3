import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { wrapper } from 'axios-cookiejar-support';
import Cookie from 'tough-cookie';

const cookieJar = new Cookie.CookieJar();

const Cart = () => {
  const token = localStorage.getItem('token');
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState(null)
  const axiosWithCookies = wrapper(axios.create({
    jar: cookieJar,
    withCredentials: true
  }));

  const getCart = async () => {
    // console.log()
    const response = await axiosWithCookies.get('http://localhost:5001/api/cart', {
      headers: {
        Authorization: token

      }
    });
    console.log(response);
    setCart(response.data.cart)
  };

//   const getCart = async () => {
//     const response = await axiosWithCookies.get('http://localhost:5001/api/cart', {
//       headers: {
//         Authorization: token
//       }
//     });
//     console.log(response);
//     // setProducts(response.data.products);
//   };


  useEffect(() => {
    getCart();
    // getCart();
  }, []);

  const handlePayment = async() =>{
    try {
      console.log(token)
    const response = await axiosWithCookies.post("http://localhost:5001/api/checkout",{...cart}, {
        headers:{
            Authorization:token
        },
        
    })

    console.log(response)
    setMessage(response.data.message)
    // setTimeout(()=>{
    //     window.location.href="/"
    // },3000)
    } catch (error) {
      console.log(error.response)
    }
  }

const total = cart.reduce((acc,producto)=>acc+producto.total, 0)

  return (
    <div className="main-container">
      {cart.map((producto) => {
        return (
            <div>
            <Link key={producto._id}>
            <p>Nombre: {producto.name}</p>
            <p>Precio: € {producto.price}</p>
            <p>Description: {producto.description}</p>
            <p>Cantidad: {producto.quantity} </p>
            {/* <Link to={`/producto/${producto._id}`}>
            <Button>Ver producto</Button>
            </Link> */}
            <Link to={`/producto`}>
            <Button>Volver</Button>
            </Link>
            {/* <button onClick={() => addToCart(producto._id, producto.valor)}>
            Agregar al carrito
            </button> */}
          </Link>
          </div>
        );
      })}
          <p>Total: {total} €</p>

          <button onClick={handlePayment}>Comprar</button>
          <div style={{display:message?"block":"none"}}>
{message}
          </div>
    </div>
  );
};

export default Cart;