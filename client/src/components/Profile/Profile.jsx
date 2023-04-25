import React, {useEffect, useState} from 'react'; 
import axios from "axios";
import { useParams, useNavigate, Link } from 'react-router-dom';

//Cómo acceder a mi perfil 
//Como requiere autorización "auth". Necesita token, entonces lo llamamos
//Declaramos una variable token y le asignamos el valor del token

const Perfil = () =>{
    const [user, setUser] = useState({})
    const token = localStorage.getItem("token")

const getUser = async() =>{

    const response =await axios.get("http://localhost:5001/api/user",{
        headers:{
            Authorization:token
        }
    })

    // console.log(response)

    setUser(response.data.user)
}

useEffect(()=>{
    getUser()
}, [])

const deleteUser = async() =>{
   
    let option = window.confirm("¿Seguro que deseas eliminar tu perfil?")
    if(option == true){

        try {
        const response =await axios.delete("http://localhost:5001/api/user",{
        headers:{
            Authorization:token
        }

    
    })

    localStorage.removeItem("loglevel")
    localStorage.removeItem("token")
    localStorage.removeItem("role")


    console.log(response)
    setTimeout(()=>{
      window.location.href="/"
    //   navigate("/")
    },2000) 
    
    
        } catch (error) {
            
        } 
      }
    }
  


    return (
        <div>
        <div>

            <p>Perfil de, {user.name}</p>
            <p>Aquí está tu infor: </p>
            <p>Nombre: {user.name}</p>
            <p>Apellido: {user.surname}</p>
            <p>Dirección: {user.address}</p>
            <p>Email: {user.email}</p>
        </div>
        <Link to="/modifyU"><button className='btn btn-primary'>Editar perfil</button></Link>
        <button onClick={deleteUser} className='btn btn-danger'>Eliminar perfil</button>
        </div>
    );
}



export default Perfil; 

//En el video de my profile explica cómo poner en negrita o dar formato solo a una parte del texto 

