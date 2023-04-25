const express = require('express');
const CartRouter = express.Router();
const Product = require('../model/Product');
const Cart = require('../model/Cart');
const auth= require("../middleware/auth")
const session = require('express-session');
const User = require("../model/User")

CartRouter.use(session({
  secret: process.env.secret_key,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // en true si usas https
}));

// POST /api/cart
CartRouter.post('/cart', auth, async (req, res) => {
//   try {
    const { productId} = req.body;
    const quantity = 1
    const product = await Product.findById(productId)
    const user = await User.findById(req.user.id)
    if(!user){
        return res.status(400).send({
            success:false,
            message:"Por favor logúeate para poder comprar"
        })
    }
    console.log(product)
  // Si el carrito no existe, lo creamos
  if (!req.session.cart) {
    req.session.cart = [];
  }

  // Buscamos si el producto ya está en el carrito
  const itemIndex = req.session.cart.findIndex(item => item.id === product._id);

  // Si el producto no está en el carrito, lo añadimos
  if (itemIndex === -1) {
    req.session.cart.push({ productId, quantity,price: product.price });
  }
  // Si el producto ya está en el carrito, actualizamos la cantidad
  else {
    req.session.cart[itemIndex].quantity += quantity;
  }

  // Resta la cantidad comprada del stock del producto
 product.stock -= quantity;

// Actualiza el stock en la base de datos
await Product.findOneAndUpdate({ _id: productId }, { stock: product.stock });

//   console.log(req.session.cart);
  // Enviamos la respuesta
  res.json({ message: 'Producto añadido al carrito', cart: req.session.cart });
//   res.status(200).send({
//     success:true, 
//     message: " Producto añadido al carrito",
//     cart: req.session.cart
//   })

});

// CartRouter.delete('/cart', auth, async (req, res) => {
//     try {
//       const {productId} = req.body;
  
//       // Si el carrito no existe, no podemos quitar productos
//       if (!req.session.cart) {
//         return res.status(404).json({ message: 'El carrito no existe' });
//       }
  
//       // Buscamos si el producto está en el carrito
//       const itemIndex = req.session.cart.findIndex(item => item.productId === productId);
  
//       // Si el producto no está en el carrito, devolvemos un error
//       if (itemIndex === -1) {
//         return res.status(404).json({ message: 'El producto no está en el carrito' });
//       }
  
//       // Obtenemos la cantidad del producto que se va a eliminar
//       const quantity = req.session.cart[itemIndex].quantity;
  
//       // Quitamos el producto del carrito
//       req.session.cart.splice(itemIndex, 1);
  
//       // Añadimos la cantidad comprada del stock del producto
//       const product = await Product.findById(productId);
//       product.stock += quantity;
  
//       // Actualizamos el stock en la base de datos
//       await Product.findOneAndUpdate({ _id: productId }, { stock: product.stock });
  
//       // Enviamos la respuesta
//       res.json({ message: 'Producto eliminado del carrito', cart: req.session.cart });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Ha ocurrido un error al eliminar el producto del carrito' });
//     }
//   });



CartRouter.get('/cart', auth, async (req, res) => {
    const cart = req.session.cart || [];

    const products = await Product.find({ _id: { $in: cart.map(item => item.productId) } });
    const productsOfCart = cart.map(item => {
        let total = 0
        let totalCarrito = 0
      const product = products.find(p => p._id.toString() === item.productId.toString());
      total= item.quantity * item.price
      totalCarrito += total
      return {
        totalCompra: totalCarrito,
        compra: {productId: item.productId,
        quantity: item.quantity,
        productName: product ? product.name : 'Unknown product',
        price: item.price}
      }
      
    });
    // res.json(productsOfCart);
    res.status(200).send({
        success:true, 
        message:"Aquí tienes tu carrito de compra",
        productsOfCart
    })
  });

module.exports = CartRouter;