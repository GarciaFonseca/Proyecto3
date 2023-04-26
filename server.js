// IMPORT DEPENDENCIAS
// const express = require('express')
const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose")
//Utilizamos cors para poder acceder al servidor desde cualquier lugar 
const cors = require("cors")
require("dotenv").config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(cookieParser());


// Importamos enrutamiento
const UserRouter = require("./routes/UserRouter")
const ProductRouter = require("./routes/ProductRouter")
const CategoriasRouter = require("./routes/CategoriasRouter")
const ShippingRouter = require("./routes/ShippingRouter")
const OrderRouter = require('./routes/OrderRouter')
const CartRouter = require('./routes/CartRouter')


// app = http://localhost5001 + /api + los endpoints que he definido en cada router

// Utilizamos el enrutamiento en el servidor
app.use("/api", UserRouter)
app.use("/api", ProductRouter)
app.use("/api", CategoriasRouter)
app.use("/api", ShippingRouter)
app.use("/api", OrderRouter)
app.use("/api", CartRouter)




// CONNECT TO DB
// 1. Declaramos una variable que nos guarda el archivo que viene del .env
const URL = process.env.MONGO_URL

// 2. Con la ayuda de mongoose y su función .connect. Conectamos con la base de datos. 
mongoose.connect(URL, {}).then(() => {
    console.log("DB is now connected")
}).catch((error) => {
    console.log(error)
})



app.get("/hola2", (req, res) => {
    return res.send({
        success: true,
        message: "Primera clase de Node.js"
    })
})

app.listen(5001, () => {
    console.log("servidor corriendo en el puerto 5001")
})