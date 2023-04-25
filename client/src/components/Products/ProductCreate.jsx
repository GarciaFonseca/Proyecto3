import React, {useState} from 'react';
import{Form, FormGroup, Label, Input, Button} from 'reactstrap'
import axios from "axios";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewProduct = () => {
    const [product, setProduct] = useState({
        name:"",
        description:"",
        image:"",
        price:"",
        categoryId:"",
        size:"",
        color:"",
        stock:""
    })


  const [successM, setSuccessM] = useState(null);
  const [errorM, setErrorM] = useState(null);



  const onChangeInput = (e) => {
    const { name, value } = e.target; 
    setProduct({ ...product, [name]: value }); 
    console.log(product);
  };

const productSubmit = async (event) =>{
    event.preventDefault();
    try {
        const response = await axios.post("http://localhost:5001/api/new-product", {...product})
    console.log(response);
    setSuccessM(response.data.message);


    localStorage.setItem("token", response.data.accessToken)
      localStorage.setItem("role", response.data.userFind.role) 

      setTimeout(()=>{
        window.location.href ="/producto"
      },3000)
    } catch (error) { 
      setErrorM(error.message)
      setTimeout(()=>{
        window.location.href ="/"
      }, 3000)
    }
        
    } 
    

return (
    <div>
    <Form onSubmit={productSubmit}>
    <FormGroup floating>
          <Input
            id="exampleName"
            name="name"
            value={product.name}
            placeholder="Name"
            type="text"
            onChange={onChangeInput}
          />
          <Label for="exampleEmail">Name</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="exampleDescription"
            name="description"
            value={product.description}
            placeholder="Description"
            type="text"
            onChange={onChangeInput}
          />
          <Label for="exampleSurname">Descripción</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="exampleImage"
            name="image"
            value={product.image}
            placeholder="Imagen"
            type="text"
            onChange={onChangeInput}
          />
          <Label for="exampleEmail">Imagen</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="exampleCategory"
            name="category"
            value={product.categoryId}
            placeholder="Category"
            type="Text"
            onChange={onChangeInput}
          />
          <Label for="examplePassword">Category</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="exampleSize"
            name="size"
            value={product.size}
            placeholder="Size"
            type="text"
            onChange={onChangeInput}
          />
          <Label for="exampleAddress">Talla</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="exampleColor"
            name="color"
            value={product.color}
            placeholder="Color"
            type="text"
            onChange={onChangeInput}
          />
          <Label for="exampleAddress">Color</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="exampleStock"
            name="stock"
            value={product.stock}
            placeholder="Stock"
            type="number"
            onChange={onChangeInput}
          />
          <Label for="exampleAddress">Unidades</Label>
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

export default NewProduct;