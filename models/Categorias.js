const mongoose = require("mongoose")



const CategoriasSchema = new mongoose.Schema({
    nameC: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }]
  }, {
    timestamps:true
  })

module.exports = mongoose.model("Categorias", CategoriasSchema)


