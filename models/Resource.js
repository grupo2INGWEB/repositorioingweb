// M0DELO DE LOS RECURSOS
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    urlResource: {
        type: String,
        trim: true
    },
    nameResource: {
        type: String,
        trim: true
    },
    originalNameResource: {
        type: String,
        trim: true
    },
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
    country: {
        type: String,
        required: true,
        trim: true
    },
    nameAuthor: {
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
    nameAdmin: {
        type: String,
        trim: true,
    },
    condition: {
        type: String,
        trim: true,
        default: 'Por publicar'
    },
    tags: {
        type: Array,
        trim: true,
        required: true
    },
    create: {
        type: String,
        trim: true,
        required: true
    },
    updateDate: {
        type: String,
        trim: true
    },
    specialty: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    university: {
        type: String,
        trim: true
    },
    platform: {
        type: String,
        trim: true
    },
    usersLikes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    },
    licence: {
        type: String,
        default: ""
    }

})

module.exports = mongoose.model('Resource', resourceSchema);