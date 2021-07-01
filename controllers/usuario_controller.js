const Usuario = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Nuevo usuario
exports.newUser = async (req, res) => {
    // Show express validator errors messages
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            errores: errores.array()
        });
    }
    try {
        // Checked if the user is already registered
        const { email, password } = req.body; // extract email

        let usuario = await Usuario.findOne({ email }); // find if a user already exist with this email

        if (usuario) {
            // If there is a user return that the user already has an account
            // status 400 means there was an error
            return res.status(400).json({ error: "El usuario ya está registrado. Porfavor Inicia Sesión." });
        }
        // hash the user password
        const salt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(password, salt);
        usuario = new Usuario(req.body); // Create a user instance with data sent from the fronted through http
        usuario.password = newPass; // update the password attribute of user instance with the new hashed password
        await usuario.save(); // save data in the BD     
        // Comprobar que tipo de usuario es
        if (usuario.rol === "internauta") {
            const token = jwt.sign({
                id: usuario._id,
                nombre: usuario.name
            }, process.env.SECRETA);
            return res.json({ user: usuario, token }) // Response of backend. Good Process
        }
        res.json({ user: usuario }) // Response of backend. Good Process
    } catch (error) {
        console.log("Hubo un error en: Function nuevoUsuario")
        console.log(error);
        return res.status(400).json({
            typeError: `Error: ${error}`,
            error: "Hubo un error en el servidor. Intentalo de nuevo"
        });
    }

}