const express = require('express');
const OrderRouter = express.Router();
const Order = require('../models/Order');
const auth = require("../middleware/auth")
const Product = require("../models/Product")
const User = require("../models/User")

const session = require('express-session');
OrderRouter.use(session({
  secret: process.env.secret_key,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // en true si usas https
}));
// POST /api/checkout
OrderRouter.post('/checkout', auth,  async (req, res) => {
  try {
    // const {direccion} = req.body
  const cart = req.session.cart;
  const user= await User.findById(req.user.id)
//  const direccion = user.address
  console.log(cart)
    const items = [];
    
   if (cart.length === 0) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    let totalPrice = 0
    for (let i = 0; i < cart.length; i++) {
      let itemTotal = 0
      const product = await Product.findById(cart[i].id).populate();
      if (!product) {
        return res.status(400).json({ message: 'Product not found' });
      }
       itemTotal = cart[i].price * cart[i].quantity
       totalPrice +=itemTotal
      items.push({
        productId: product._id,
        quantity: cart[i].quantity,
        total: itemTotal,
        name:product.name
      });
    }

    const order = new Order({
      user: user,
      items: items,
      totalPrice,
    //   direccion
    });

    await User.findByIdAndUpdate(req.user.id, {
      $push:{
        orders: order._id
      }
    })
    await order.save();
    req.session.cart = [];
    res.status(201).send({
      success:true, 
      message:"Compra realizada con exito",
      order
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

OrderRouter.get("/history", auth, async(req,res)=>{
  try {
    const pedidos = await User.findById(req.user.id).populate({path:"orders", select:"items totalPrice"})
    res.status(200).send({
      success:true, 
      message:"Tus pedidos",
      pedidos
    });
  } catch (error) {
    res.status(500).send({
      success:false, 
      message:error.message
     
    });
  }
  
  })
  
  module.exports = OrderRouter