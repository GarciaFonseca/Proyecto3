import React, {useState} from 'react';
import{Form, FormGroup, Label, Input, Button} from 'reactstrap'
import axios from "axios";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [user, setUser] = useState({
        name:"",
        surname:"",
        address:"",
        email: "",
        password:""
    })


  const [successM, setSuccessM] = useState(null);
  const [errorM, setErrorM] = useState(null);



  const onChangeInput = (e) => {
    const { name, value } = e.target; 
    setUser({ ...user, [name]: value }); 
    console.log(user);
  };

const registerSubmit = async (event) =>{
    event.preventDefault();
    try {
        const response = await axios.post("http://localhost:5001/api/register", {...user})
    console.log(response);
    setSuccessM(response.data.message);


    localStorage.setItem("token", response.data.accessToken)
      localStorage.setItem("role", response.data.userFind.role) 

      setTimeout(()=>{
        window.location.href ="/"
      },3000)
    } catch (error) { 
      setErrorM(error.message)
      setTimeout(()=>{
        window.location.href ="/login"
      }, 3000)
    }
        
    } 
    

return (
    <div>
    <Form onSubmit={registerSubmit}>
    <FormGroup floating>
          <Input
            id="exampleName"
            name="name"
            value={user.name}
            placeholder="Name"
            type="text"
            onChange={onChangeInput}
          />
          <Label for="exampleEmail">Name</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="exampleSurname"
            name="surname"
            value={user.surname}
            placeholder="Surname"
            type="text"
            onChange={onChangeInput}
          />
          <Label for="exampleSurname">Surname</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="exampleEmail"
            name="email"
            value={user.email}
            placeholder="Email"
            type="email"
            onChange={onChangeInput}
          />
          <Label for="exampleEmail">Email</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="examplePassword"
            name="password"
            value={user.password}
            placeholder="Password"
            type="password"
            onChange={onChangeInput}
          />
          <Label for="examplePassword">Password</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="exampleAddress"
            name="address"
            value={user.address}
            placeholder="Address"
            type="text"
            onChange={onChangeInput}
          />
          <Label for="exampleAddress">Address</Label>
        </FormGroup>{" "}
        <Button>Submit</Button>
      </Form>
      <div className="alert alert-primary" role="alert" style= {{display: successM ? "block" : "none"}}>
        {successM}
      </div>
      <div className="alert alert-danger" role="alert" style= {{display: errorM ? "block" : "none"}}>
        {errorM}
      </div>
    </div>
)

}

export default Register;