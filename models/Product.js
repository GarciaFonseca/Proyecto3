const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Categorias',
        required: true
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL'],
        required: true
    },
    color: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Product", ProductSchema)


