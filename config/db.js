// Libreria para conectar con MongoDB
const mongoose = require('mongoose');
// Importacion para utulizar variables de entorno
require('dotenv').config({path: 'variables.env'})


const conectarDB = async()=>{
    try {
        // Conectar con DB
        await mongoose.connect(
            process.env.DB_URL, // URL DE LA BD
            // Son PROPIEDADES QUE SE NECESITAN PARA CONECTAR
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            }
        );
        console.log("DB CONETCADA");
    } catch (error) {
        console.log("===> Hubo un error EN DB");
        console.log(error);
        process.exit(1);
    }
}

module.exports = conectarDB;