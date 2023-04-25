import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Home from "../Home/Home";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Products from "../Products/Products";
import Producto from "../Products/Product";
import ProductModify from "../Products/ProductModify";
import ProfileModify from "../Profile/ProfileModify";
import ProductCreate from "../Products/ProductCreate";
import Category from "../Category/Category";
import Logout from "../Logout/Logout"


const Pages = () => {
  return (
    <Routes>
      <Route path='/register_user' element={<Register/>}/>
      <Route path="/login" element={<Login />} />
      <Route path='/' element={<Home />}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/producto' element={<Products/>}/>
      <Route path='/producto/:productoId' element={<Producto/>}/>
      <Route path='/modify/:productoId' element={<ProductModify/>}/>
      <Route path='/modifyU' element={<ProfileModify/>}/>
      <Route path='/new-product' element={<ProductCreate/>}/>
      <Route path='/categorias' element={<Category/>}/>
      <Route path='/logout' element={<Logout/>}/>
    </Routes>
  );
};

export default Pages;
