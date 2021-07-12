// Importaciones necesarias
const express = require('express');
const conectarDB = require("./config/db");
var cors = require('cors');


// Crear servidor \
const app = express();

// Conectar a la DB
conectarDB();

// Puerto de la app
const port = process.env.PORT || 5000;

// Habilitar los valores de un body (para las consultas) cunado mandas datos desde Frontend hal backend
app.use(express.json())
app.use(cors());
app.use(express.static('uploads'));

// DECLARAR Rutas de la app
app.use('/api/auth', require('./routes/auth_route'));
app.use('/api/user', require('./routes/user_route'));
app.use('/api/resource', require('./routes/resources_route'));

// Iniciar Servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`===> Servidor en proceso: ${port}`);
});
