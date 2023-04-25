const express = require("express")
const ProductRouter= express.Router()
const Product = require("../models/Product")
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")
const Categorias = require("../models/Categorias")  


//POST
//Creación de producto 
ProductRouter.post("/new-product", auth, authAdmin,  async (req, res) => {
    const {
        name,
        description,
        image,
        price,
        categoryId,
        size,
        color,
        stock
    } = req.body
    try {

        // Condiciones de validación

        if (!name || !description || !image || !price || !categoryId || !size || !color || !stock) {
            return res.status(400).send({
                success: false,
                message: "No has completado todos los campos"
            })
        }

        let myProduct = new Product({
            name,
            description,
            image,
            price,
            category: categoryId,
            size,
            color,
            stock
        })


        await Categorias.findByIdAndUpdate(categoryId, {
            $push:{
                products:myProduct._id
            }
        })

        await myProduct.save()

        return res.status(200).send({
            success: true,
            message: "Tu producto se ha creado correctamente",
            myProduct

        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})




//GET
// Buscar todos los productos y los devuelve en un array 
ProductRouter.get("/producto", async (req, res) => {
    try {
        let productos = await Product.find({}).populate({path:"category"})
        if (!productos) {
            return res.status(400).send({
                success: false,
                message: "No hay productos en la base de datos"
            })
        }

        return res.status(200).send({
            success: true,
            productos
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })

    }
})

// ID: Ruta para coger un solo producto
//No estoy muy segura de que sea necesaria.

ProductRouter.get("/producto/:productoId", async (req, res) => {
    try {
        const {
            productoId
        } = req.params //estoy haciendo el request por parametros
        let product = await Product.findById(productoId).populate({path:"category"})
        if (!product) {
            return res.status(400).send({
                success: false,
                message: "Producto no definido"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Producto econtrado",
            product
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


//PUT
//Verbo que me permite hacer modificaciones sobre información existente 


ProductRouter.put("/product/:id", auth, authAdmin, async(req,res)=>{
    try {
        const {id} = req.params  //id del objeto que quiero modificar
        const {name, description, price, size, color, stock} = req.body //información que quiero actualizar
        await Product.findByIdAndUpdate(id, {name, description, price, size, color, stock})

        const producto = await Product.findById(id)
       
        return res.status(200).send({
            success:true,
            message:"Información actualizada con éxito",
            producto
        })
        

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


//Delete 
ProductRouter.delete("/product/:id", auth, authAdmin, async (req,res)=>{
    try {
        const {id}=req.params //id de objeto a borrar
        await Product.findByIdAndDelete(id) //Buscamos el objeto en la conlección
        if(!id){
            return res.status(400).send({
                success:false,
                message:"No se encontaron conincidencias con tu búsqueda"
            })
        }

        return res.status(200).send({
            success:true,
            message:"Producto eliminado con éxito"
        })


    } catch (error) {
        return res.status(500).send({
            success:false,
            message: error.message
        })
    }
})

module.exports = ProductRouter






