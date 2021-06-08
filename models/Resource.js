// M0DELO DE LOS RECURSOS

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    language: {
        type: String,
        trim: true,
        required: true,
    },
    plataform: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    calificacion: {
        type: Number,
        default: 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    idAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    condition:{
        type: String,
        trim:true,
        default:'Por publicar'
    },
    tags:{
        type: Array,
        trim:true,
        required: true
    },
    create:{
        type: String,
        trim:true,
        required:true
    },
    updateDate:{
        type: String,
        trim: true
    }
})

module.exports = mongoose.model('Resource', resourceSchema);