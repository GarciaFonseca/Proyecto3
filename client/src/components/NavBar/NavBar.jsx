import React from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
// import {BsArrowBarRight} from 'react-icons/bs'
// import Container from "react-bootstrap/Container";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";

const NavBar = () => {
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  console.log(name);

  const NavHome = () => {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div class="container-fluid">
          <img
            class="navbar-brand logo"
            src={process.env.PUBLIC_URL + "/img/LOGO_BLANCO.png"}
            alt=""
          ></img>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link
                  to="/"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Inicio
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/register" class="nav-link" href="#">
                  Registro
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/login" class="nav-link" href="#">
                  Log in
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/categorias" class="nav-link" href="#">
                  Categorías
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/producto" class="nav-link" href="#">
                  Productos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };

  const NavAdmin = () => {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div class="container-fluid">
          <img
            class="navbar-brand logo"
            src={process.env.PUBLIC_URL + "/img/LOGO_BLANCO.png"}
            alt=""
          ></img>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <h3 className="bienvenido">Bienvenido Admin</h3>
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link
                  to="/"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Inicio
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/categorias" class="nav-link" href="#">
                  Categorías
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/producto" class="nav-link" href="#">
                  Productos
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/profile" class="nav-link" href="#">
                  Perfil
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/cart" class="nav-link" href="#">
                  Carrito
                </Link>
              </li>
              <li className="nav-items">
                <Link className="nav-link-black" to={"/logout"}>
                  {" "}
                  <MdLogout style={{ color: 'white' }}> </MdLogout>{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };

  const NavUser = () => {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div class="container-fluid">
          <img
            class="navbar-brand logo"
            src={process.env.PUBLIC_URL + "/img/LOGO_BLANCO.png"}
            alt=""
          ></img>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <h3 className="bienvenido">Bienvenido {name}</h3>
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link
                  to="/"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Inicio
                </Link>
              </li>
              <li class="nav-item active">
                <Link to="/categorias" className="nav-link" href="#">
                  Categorías
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/producto" class="nav-link" href="#">
                  Productos
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/profile" class="nav-link" href="#">
                  Perfil
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/cart" class="nav-link" href="#">
                  Carrito
                </Link>
              </li>
              <li className="nav-items">
                <Link className="nav-link-black" to={"/logout"}>
                  {" "}
                  <MdLogout style={{ color: 'white' }}> </MdLogout>{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };

  //Estaba teniendo un problema con los números, podía ser que los estaba recibiendo como string y no como número. Al ponerlos entre comillas,
  //funcionaba, pero sin comillas no. ParseInt hace una conversión explícita de ese valor que recibe a número entero. Así, aunque se entregue
  //como string, me lo convierte a entero antes de que se compare

  let NavBar =
    parseInt(role) === 0
      ? NavUser()
      : parseInt(role) === 1
      ? NavAdmin()
      : NavHome();

  return <div>{NavBar}</div>;
};

export default NavBar;
