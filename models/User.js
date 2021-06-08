const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    telefono:{
        type: String,
        trim: true
    },
    rol:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim:true
    }
})

module.exports = mongoose.model('Usuario', usuariosSchema);