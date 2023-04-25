import React from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import {MdLogout} from 'react-icons/md';

const NavBar = () => {

const role = localStorage.getItem("role")
const name = localStorage.getItem("name")
console.log(name)

  const NavHome = () => {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse" id="navbarToggleExternalContent">
            <div className="bg-dark p-4">
            <Link to="/" className="text-white h4">Inicio</Link>
            <Link to="/login" className="text-white h4">Log in</Link>
            <Link to="/register_user" className="text-white h4">Registro</Link>
              <Link to="/categorias" className="text-white h4">Categorías</Link>
              <Link to="/producto" className="text-white h4">Productos</Link>
              <span className="text-body-secondary">
                Toggleable via the navbar brand.
              </span>
            </div>
          </div>
        </div>
      </nav>
    );
  };


  const NavAdmin = () => {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse" id="navbarToggleExternalContent">
            <div className="bg-dark p-4">
              <ul>
                <li className="nav-items">
            <Link to="/" className="text-white h4">Inicio</Link>
            </li>
            <li className="nav-items">
              <Link to="/categorias" className="text-white h4">Categorías</Link>
              </li>
              <li className="nav-items">
              <Link to="/producto" className="text-white h4">Productos</Link>
              </li>
              <h5 className="text-white h4">Herramientas</h5>
              <li className="nav-items">

              <Link className="nav-link-white" to={"/logout"}> <MdLogout> </MdLogout> </Link>
              </li>
              </ul>
              
              <span className="text-body-secondary">
                Toggleable via the navbar brand.
              </span>
            </div>
          </div>
        </div>
      </nav>
    );
  };


  const NavUser = () => {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse" id="navbarToggleExternalContent">
            <div className="bg-dark p-4">
              <h5 className="text-white h4">Bienvenido {name}</h5>
              <Link to="/" className="text-white h4">Inicio</Link>
              <Link to="/categorias" className="text-white h4">Categorías</Link>
              <Link to="/producto" className="text-white h4">Productos</Link>
              <Link to="/profile" className="text-white h4">Mi perfil</Link>
              <Link to="/cart" className="text-white h4">Carrito</Link>
              <span className="text-body-secondary">
                Toggleable via the navbar brand.
              </span>
            </div>
          </div>
        </div>
      </nav>
    );
  };


//Estaba teniendo un problema con los números, podía ser que los estaba recibiendo como string y no como número. Al ponerlos entre comillas,
//funcionaba, pero sin comillas no. ParseInt hace una conversión explícita de ese valor que recibe a número entero. Así, aunque se entregue 
//como string, me lo convierte a entero antes de que se compare

  let NavBar = parseInt(role) === 0 ? NavUser() : parseInt(role) === 1 ? NavAdmin() : NavHome();




  return (
    <div>
        {NavBar}
    </div>
  )


};

export default NavBar;
