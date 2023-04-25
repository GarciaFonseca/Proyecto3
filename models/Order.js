const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      total: Number
    },
  ],
//   shippingAddress: {
//     type: String,
//     required: true,
//   },
//   paymentMethod: {
//     type: String,
//     required: true,
//   },
  totalPrice: {
    type: Number,
    required: true,
  },
  user:{
    type: mongoose.Types.ObjectId,
        ref: "User",

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);