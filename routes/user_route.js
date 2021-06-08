const express = require('express');
const { check } = require('express-validator')
const router = express.Router();
const usuarioController = require('../controllers/usuario_controller');

// AGREGAR UN NUEVO USUARIO
router.post('/',
    [
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('rol', 'El rol es obligatorio').notEmpty(),
        check('email', 'Agrega un E-mail válido').isEmail(),
        check('password', 'El password debe ser de almenos 6 caracteres').isLength({min:6}),
    ],
    usuarioController.newUser
);

module.exports = router;