import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//La principal diferencia entre product Modify y profile modify es que la ruta no utiliza parámetros. En el back no le tengo que indicar el ID
//el código toma el token como identificador porque es un usuario loggeado. 

const ProfileModify = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [Profile, setProfile] = useState({
    address: "",
    password: "",
  });

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/user", {
        headers: {
          Authorization: token,
        },
      });

      console.log(response);
      setProfile(response.data.user);
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setProfile({ ...Profile, [name]: value });
    console.log(Profile);
  };

  const modifyProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5001/api/user`,
        { ...Profile },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);

      setTimeout(() => {
        navigate(`/profile`);
      }, 2000);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
        <form onSubmit={modifyProfileSubmit}>
      <label htmlFor="address">Dirección</label>
      <input type="text" name="address" id="address" value={Profile.address} onChange={onChangeInput} />
      <label htmlFor="password">Contraseña</label>
      <input type="text" name="password" id="password" value={Profile.password} onChange={onChangeInput} />
      <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
};

export default ProfileModify;
