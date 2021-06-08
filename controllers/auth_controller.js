// === todas las funciones que tiene sque ver con la autenticaicon del usuario ===
// IMPORTAS EL MODELO
const Usuario = require('../models/User');
// IMPORTAS LA LIBRERIA PARA HASHEAR(ENCRIPTAR) LA CONTRASEÑA
const bcrypt = require('bcrypt');
// JSONWEBTOKEN para validar si un usuario esta loegeado o no (desde el frontend)
const jwt = require('jsonwebtoken');
// validar los check de las rutas
const { validationResult } = require('express-validator');
require('dotenv').config({ path: 'variables.env' })



exports.userAuth = async (req, res) => {
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
        if (!usuario) {
            // If there isn't a user, return that the user already has an account
            // status 401 means error credentials
            return res.status(401).json({ error: "El usuario no existe. Primero Registrate!" });
        }
        // hash the user password
        const comparePass = bcrypt.compareSync(password, usuario.password);
        if (comparePass) {
            // Crear Token
            const token = jwt.sign({
                id: usuario._id,
                nombre: usuario.name,
                rol: usuario.rol,
                email: usuario.email
            }, process.env.SECRETA);

            return res.json({ msg: 'Usuario corecto!', token }) // Response of backend. Good Process
        }
        res.status(401).json({ msg: 'La contraseña es incorrecta' }) // Response of backend. Incorrect Pass
    } catch (error) {
        console.log("Hubo un error en: Function userAuth")
        console.log(error);
        return res.status(400).json({
            typeError: `Error: ${error}`,
            error: "Hubo un error en el servidor. Intentalo de nuevo"
        });
    }

}

exports.authenticatedUser = async (req, res) => {
    // sI REQ.ERROR EXISTE significa que hubo un error
    if (req.error) {
        // Retornar error al frontend
        return res.status(401).json({ error: req.error })
    }
    
    if (req.usuario) {
        return res.json({
            usuario: req.usuario
        });
    }

}