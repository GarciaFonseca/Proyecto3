const express = require("express")
const CategoriasRouter = express.Router()
const Categorias = require("../models/Categorias")
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")
const Product = require("../models/Product")




//POST
//darle permiso de vendedor también
CategoriasRouter.post("/categorias", auth, authAdmin, async (req, res) => {
    const {
        name,
        description
    } = req.body
    try {

        // Compruebo si hay alguna categoría con el mismo nombre
        let categoriaFind = await Categorias.findOne({
            name
        })
        if (categoriaFind) {
            return res.status(400).send({
                success: false,
                message: "Esta categoría ya se encuentra en uso"
            })
        }

        if (!name || !description) {
            return res.status(400).send({
                success: false,
                message: "No has completado todos los campos"
            })
        }


        if (name.length < 3) {
            return res.status(400).send({
                success: false,
                message: "El nombre es demasiado corto"
            })
        }

        if (name.length > 15) {
            return res.status(400).send({
                success: false,
                message: "El nombre es demasiado largo"
            })
        }

        let myCategoria = new Categorias({
            name,
            description
        })

        await myCategoria.save()

        return res.status(200).send({
            success: true,
            message: "Categoría creada correctamente",
            myCategoria

        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})




//GET
// Buscar todas las categorías y los devuelve en un array 
CategoriasRouter.get("/categorias", async (req, res) => {
    try {
        let categorias = await Categorias.find({}).select("name description image price category size stock color")
        if (!categorias) {
            return res.status(400).send({
                success: false,
                message: "No hay categorías en la base de datos"
            })
        }

        return res.status(200).send({
            success: true,
            categorias
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })

    }
})

//Buscar todos los productos de una misma categoría  

CategoriasRouter.get("/categorias/:category", async (req, res) => {
    try {
        const category = req.params.category;
        let productos = await Product.find({ category: category }).select("nameC description image price category size stock color");
        if (!productos || productos.length === 0) {
            return res.status(400).send({
                success: false,
                message: `No hay productos en la categoría ${category}`
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


//PUT
//Verbo que me permite hacer modificaciones sobre información existente 

CategoriasRouter.put("/categoria/:id", auth, authAdmin, async(req,res)=>{
    try {
        const {id} = req.params  //id del objeto que quiero modificar
        const {nameC, description, product} = req.body //información que quiero actualizar
        await Categorias.findByIdAndUpdate(id, {nameC, description, product})
       
        return res.status(200).send({
            success:true,
            message:"Información actualizada con éxito"
        })
        

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})



//Delete 
CategoriasRouter.delete("/categoria/:id", auth, authAdmin, async (req,res)=>{
    try {
        const {id}=req.params //id de objeto a borrar
        await Categorias.findByIdAndDelete(id) //Buscamos el objeto en la conlección
        if(!id){
            return res.status(400).send({
                success:false,
                message:"No se encontaron conincidencias con tu búsqueda"
            })
        }

        return res.status(200).send({
            success:true,
            message:"Categoría eliminada con éxito"
        })


    } catch (error) {
        return res.status(500).send({
            success:false,
            message: error.message
        })
    }
})

module.exports = CategoriasRouter