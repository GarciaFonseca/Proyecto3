const express = require("express")
const UserRouter = express.Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")

//Declarar las vueltas que quiero que dé mi contraseña 
const salt =bcrypt.genSaltSync(10)



/**
 * El token me da el pase, acceso a la app y me almacena toda la información del usuario. Incluídas compras, reservas... etc. 
 */

//Autenticación con Json web token (JWT)
/**
 * Generar un token (código) que nos va a permitir identificar al usuario y darnos acceso a la app
 * 1. Instalamos la dependencia jsonwebtoken 
 * 2. vamos al archivo .env y se declara una calve secreta 
 * 3. Importamos la dependencia Jwt en UserRouter 
 * 4. Creo la función que va a generar el token
 * 5. Con la función que hemos creado, vamos a generar el token del usurio 
 * 6. Creo el middleware que va a verificar el token y devolverá al usuario que está loggeado 
 * 
 */

const createToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn:"7d"})
}



// POST
//Register

UserRouter.post("/register", async (req, res) => {
    const {
        name,
        surname,
        address,
        email,
        password
    } = req.body
    try {

        // Compruebo si hay algún usuario con el mismo email
        let userFind = await User.findOne({
            email
        })
        if (userFind) {
            return res.status(400).send({
                success: false,
                message: "Este correo ya se encuentra en uso"
            })
        }

        // Condiciones de validación

        if (!name || !email || !password || !surname || !address) {
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


        // Se encripta la contraseña antes de guardar el usuario 
        let passwordHash = bcrypt.hashSync(password, salt)
        console.log(passwordHash)


        let myUser = new User({
            name,
            email,
            surname,
            address,
            //Aquí ya tengo que pasarle la contrasela Hasheada (encriptada)
            password: passwordHash
        })

        await myUser.save()

        const accessToken = createToken({id: myUser._id})

        return res.status(200).send({
            success: true,
            message: "Tu cuenta se ha creado correctamente",
            myUser,
            accessToken

        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})



//log in 

UserRouter.post("/login", async (req, res) => {
    try {
    const {
        email,
        password
    } = req.body;
    
        // Buscar el usuario por email
        const userFind = await User.findOne({
            email
        })
        if (!userFind) {
            return res.status(401).send({
                success:false,
                message: '¡Ups! Verifica tus credenciales (email)'
            })
        }

        // Verificar la contraseña
        const passwordOk = bcrypt.compareSync(password, userFind.password)
        if (!passwordOk) {
            return res.status(401).send({
                success:false,
                message: '¡Ups! Verifica tus credenciales (contraseña)'
            });
        }

        //Genero el token de usuario 
        //Se genera antes de enviar la respuesta de la ruta
        //Se declara una nueva variable al la que se le asigna la llamada de la función que crea el token y a esta se 
        //le da como argumento el id del usuario


        const accessToken = createToken({id: userFind._id})





        return res.status(200).send({
            success: true,
            message: "Inicio de sesión exitoso",
            userFind,
            accessToken //Imprescindible para que me devuelva el token. Sin esto, no hace el inicio de sesión
    
        })

    }catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

//GET

// Buscar todos los usuarios y los devuelve en un array 

UserRouter.get("/users", auth, authAdmin, async (req, res) => {
    try {
        let usuarios = await User.find({}).select("name surname email address")
        if (!usuarios) {
            return res.status(400).send({
                success: false,
                message: "No hay usuarios en la base de datos"
            })
        }

        return res.status(200).send({
            success: true,
            usuarios
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })

    }
})


// Ruta para ver mi perfil de usuario: Ya que tengo el token no es necesario hacer el api/user/:id

/**
 * Nueva implementación de ruta privada con token 
 * 1. Añadir el middleware de autenticación arriba 
 * 2. En el endpoint se quita :userId y se deja solo user y después de la "," se agrega la función ,auth,
 * 3. En lugar de const.params 
 * Agregar auth significa que es una ruta privada. Esa ruta requiere que estés autenticado para poder acceder.
 * Funciones que solo funcionan si estás loggeado
 */

// ID: Ruta para coger un solo usuario (producto, vendedor, etc)

//Esta ruta es cuando yo como USUARIO quiero ver mi perfil. Si quiero verlo como admin, sería la ruta de abajo. 

UserRouter.get("/user", auth, async (req, res) => {
    try {
        // const {userId} = req.params //estoy haciendo el request por parametros
        let user = await User.findById(req.user.id) // .select("name surname email") -- para que le devuelva solo los campos que quiero
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "usuario no definido"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Usuario econtrado",
            user
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

//Ver el perfil del usuario como admin. Esta la veremos con otro middleware 
//Un admin para hacer algo en un perfil debe usar params pero un usuario para hacer algo en su perfil usa token

UserRouter.get("/user/:userId", auth, authAdmin, async (req, res) => {
    try {
        //estoy haciendo el request por parametros
        const {userId} = req.params 
        let user = await User.findById(userId)
        
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "usuario no definido"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Usuario econtrado",
            user
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
//auth de user loggeado!!!!!!!!!!--------------------------------------------------------

UserRouter.put("/user", auth, async(req,res)=>{
    try {
       
        const {address, password} = req.body //información que quiero actualizar
        await User.findByIdAndUpdate(req.user.id, {address, password})
       
        const user = await User.findById(req.user.id)


        return res.status(200).send({
            success:true,
            message:"Información actualizada con éxito",
            user
        })
        

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


//Delete 
//Eliminar mi perfil como usuario: auth de usuario loggeado 
UserRouter.delete("/user", auth, async (req,res)=>{
    try {
       
        await User.findByIdAndDelete(req.user.id) //Buscamos el usuario por su id en la colección
        await User.findById(req.user.id)
       
        return res.status(200).send({
            success:true,
            message:"Usuario eliminado con éxito"
        })


    } catch (error) {
        return res.status(500).send({
            success:false,
            message: error.message
        })
    }
})


//Eliminar el perfil de un usario como admin
//permiso de admin. authAdmin


UserRouter.delete("/user/:id", auth, authAdmin, async (req,res)=>{
    try {
        const {id}=req.params //id de objeto a borrar
        await User.findByIdAndDelete(id) //Buscamos el objeto en la conlección
        if(!id){
            return res.status(400).send({
                success:false,
                message:"No se encontaron conincidencias con tu búsqueda"
            })
        }

        return res.status(200).send({
            success:true,
            message:"Usuario eliminado con éxito"
        })


    } catch (error) {
        return res.status(500).send({
            success:false,
            message: error.message
        })
    }
})

//PULL: Si tengo un elemento que está relacionado con otros, como el envío relacionado con el producto y el usuario. Cómo hago 
//para elimiarlos en cascada? 



// Se exporta para que se pueda utilizar en el servidor
module.exports = UserRouter