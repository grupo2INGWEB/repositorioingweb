// importaciones
const express = require('express');
// CHECK ES UN METODO PARA VALDIAR QUE NO LLEGUEN DATOS VACIOS DESDE EL FRONTEND
const { check } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth_controller');
// Utlizamos Middlewares
const auth = require('../middleware/auth_middleware');

// logearse
router.post('/',
    // VALIDAS QUE LOS CAMPOS SEAN OBLIGATORIOS
    [
        check('email', 'Agrega un E-mail válido').isEmail(),
        check('password', 'El password es necesario').not().isEmpty()
    ],
    // LLAMAS AL METODO A EJECUTARSE
    authController.userAuth
);
// Obtener el usuario autenticado
router.get('/',
    auth,
    authController.authenticatedUser
);

module.exports = router;