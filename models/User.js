
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true, 
        maxlength: 15,
        minlength: 3
    },
    surname:{
        type: String,
        required: true,
        minlength: 2
    },
    address:{
        type: String,
        required: true,
        minlength: 15
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    shipping:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Shipping"
    }],
    cart:[],
    role:{
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
  }

// array del carrito. 







// exportamos el modelo para que pueda ser utilizado por otros archivos 

module.exports = mongoose.model("User", UserSchema)