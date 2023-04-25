//Es el punto intermedio entre la app y el servidor. Donde se procesa la solicitud. 
//Se encuentran principalmente a la hora de autenticación y autorización. 

/**
 * 1. Importamos la dependecia de jsonwebtoken
 * 
 */

// req= request 
// res= response 
// next= //se interpreta como una función. Indica que el bloque de código ha pasado el control y sigue con sus tareas. 

const jwt = require("jsonwebtoken")
const auth= (req, res, next) =>{
    try {
        //recogemos del header el token que nos envía el usuario 
        const token = req.header("Authorization")
        if(!token){
            return res.status(400).json({
                success: false,
                message: "Autenticación inválida (falta token)"
            })
        }


        /**
         * Si tenemos token lo tenemos que verificar y lo tenemos que decodificar para que nos devuelva
         * toda la información del usuario loggeado
         */
        
        jwt.verify(token, process.env.ACCESS_TOKEN, (error, user)=>{
            if(error){
                return res.status(400).json({
                    success:false,
                    message:"Autenticación inválida (token no válido)"
                })
            }

            req.user = user 
        next()
        })

        /**
         * Si todo va bien pasamos el control al siguiente bloque de código
         */

        
        /**
         * donde yo necesite verificar o coger mi id, como usuario loggeado en vez de hacerlo con re.params (pasando el id)
         * lo haré con req.user 
         */
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
        
    }
}


module.exports = auth