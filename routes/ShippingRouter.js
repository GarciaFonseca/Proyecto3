const express = require("express")
const ShippingRouter = express.Router()
const Shipping = require("../models/Shipping")
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")




//POST-- Crear orden de envío 
ShippingRouter.post("/envios", auth, async (req, res) => {
    const { user, address, city, state, country, zip, payment,status } = req.body;
  
    try {
      // Verificamos que se hayan proporcionado todos los campos requeridos para la orden de envío
      if (!user || !address || !city || !state || !country || !zip || !payment) {
        return res.status(400).send({
          success: false,
          message: "No has completado todos los campos"
        })
      }
  
      // Verificamos que si el método de pago es "paypal", se haya proporcionado el correo electrónico de PayPal
    //   if (payment.method === "paypal" && !payment.paypalEmail) {
    //     return res.status(400).send({
    //       success: false,
    //       message: "Debes proporcionar el correo electrónico de PayPal"
    //     })
    //   }
  
      // Creamos una nueva instancia del modelo Shipping con los datos proporcionados en el cuerpo de la solicitud
      let newShipping = new Shipping({
        user,
        address,
        city,
        state,
        country,
        zip,
        payment,
        status
      })
  
      // Guardamos la nueva orden de envío en la base de datos
       await newShipping.save()
  
      // Devolvemos una respuesta con el objeto de la orden de envío guardada
      return res.status(201).send({
        success: true,
        message: "Orden de envío creada correctamente",
        newShipping
      })

    } catch (error) {
      // Si se produce algún error durante el proceso, devolvemos una respuesta de error
      console.error(error);
      return res.status(500).send({
        success: false,
        message: "Ha ocurrido un error al crear la orden de envío"
      })
    }
  })

 
//GET
// Buscar todos los envíos y los devuelve en un array 
ShippingRouter.get("/shipping", auth, authAdmin, async (req, res) => {
  try {
      let envios = await Shipping.find({}).select("user address city state country zip payment status")
      if (!envios) {
          return res.status(400).send({
              success: false,
              message: "No hay envíos en la base de datos"
          })
      }

      return res.status(200).send({
          success: true,
          envios
      })

  } catch (error) {
      return res.status(500).send({
          success: false,
          message: error.message
      })

  }
})

// ID: Ruta para coger un solo usuario (producto, vendedor, etc)
//Acceder a todos mis pedidos como usuario --- el usuario accede por token, no por params
//Puede que esta no sea necesaria si puedo hacer la selección desde front una vez obtengo la lista general

ShippingRouter.get("/shipping/:userId", auth,  async (req, res) => {
  try {
      const {userId} = req.params //estoy haciendo el request por parametros
      const shippings = await Shipping.find({user: userId})
      
      if (!shippings) {
          return res.status(400).send({
              success: false,
              message: "No se encontraron envíos para el usuario especificado"
          })
      }
      return res.status(200).send({
          success: true,
          message: "Envíos encontrados",
          shippings
      })

  } catch (error) {
      return res.status(500).send({
          success: false,
          message: error.message
      })
  }
})

//Si como admin quiero acceder a los envíos de un usuario específico por ID

ShippingRouter.get("/shipping/admin/:userId", auth, authAdmin,  async (req, res) => {
  try {
      const {userId} = req.params //estoy haciendo el request por parametros
      const shippings = await Shipping.find({user: userId})
      
      if (!shippings) {
          return res.status(400).send({
              success: false,
              message: "No se encontraron envíos para el usuario especificado"
          })
      }
      return res.status(200).send({
          success: true,
          message: "Envíos encontrados",
          shippings
      })

  } catch (error) {
      return res.status(500).send({
          success: false,
          message: error.message
      })
  }
})


//PUT
//Actualizar estado de un envío 
ShippingRouter.put("/shipping/:id", auth, authAdmin, async (req, res) => {
  const { id } = req.params; // Obtenemos el id del envío de la URL

  try {
    // Buscamos el envío en la base de datos por su id
    let shipping = await Shipping.findById(id);

    if (!shipping) {
      return res.status(404).send({
        success: false,
        message: "Envío no encontrado"
      })
    }
    
if (shipping.status === "pending"){
  shipping.status = "shipped"
}

if (shipping.status === "shipped"){
  shipping.status = "delivered"
}

    // Guardamos los cambios en la base de datos
    await shipping.save()

    // Devolvemos una respuesta con el objeto del envío actualizado
    return res.status(200).send({
      success: true,
      message: "Estado del envío actualizado correctamente",
      shipping
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Ha ocurrido un error al actualizar el estado del envío"
    })
  }
})


  module.exports = ShippingRouter