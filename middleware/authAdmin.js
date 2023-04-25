const User = require("../models/User");

/**
 * Esta función se ejecuta después de auth.js. Después de comprobar que el usuario está loggeado
 */

const authAdmin = async (req, res, next) => {
    try {
        //busco al usuario loggeado por su id que viene del req.user dado por el token
        const user = await User.findOne({
            _id: req.user.id,
        });

        console.log(user);

        // si no encuentra al usuario, devolvemos error

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Usuario no encontrado",
            });
        }

        //Si encuentra al usuario, accedemos a su propieda role y comprobamos su valor
        //si es 0, no es admin

        if (user.role !== 1) {
            return res.status(400).json({
                success: false,
                message: "No tienes permisos de administrador",
            });
        }

        next();
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
};

module.exports = authAdmin;