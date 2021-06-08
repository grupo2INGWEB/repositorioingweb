const Resource = require('../models/Resource');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.newResource = async (req, res) => {
    // Retorar errores de express validators
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            errores: errores.array()
        });
    }
    try {
        let resource = new Resource(req.body); // Crear una instancia de Recurso con los datos envaidos desde frontend
        const authHeader = req.get('Authorization');
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const usuario = jwt.verify(token, process.env.SECRETA);
            resource.author = usuario.id;
            await resource.save(); // guardar en la base de datos  
            return res.json({ msg: 'Recurso creado con éxito', resource }) // Response of backend. Good Process
        }
        return res.status(401).json({ error: 'Es necesario el autor' }) // Response of backend. Good Process
    } catch (error) {
        console.log("Hubo un error en: Function newResource")
        console.log(error);
        return res.status(400).json({
            typeError: `Error: ${error}`,
            error: "Hubo un error en el servidor. Intentalo de nuevo"
        });
    }

}
exports.updateResource = async (req, res) => {
    // Retorar errores de express validators
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            errores: errores.array()
        });
    }
    try {
        let resource = await Resource.findById({ _id: req.params.id })
        if (!resource) {
            return res.status(401).json({ error: 'El Recurso no Existe' })
        }
        const authHeader = req.get('Authorization');
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const usuario = jwt.verify(token, process.env.SECRETA);
            // Comprobar si el que edita es el autor del recurso o es admin(ya que puede realizar cualquier acción)
            if (resource.author === usuario.id || usuario.rol === "admin") {
                const {
                    title,
                    description,
                    language,
                    plataform,
                    country,
                    tags,
                    updateDate
                } = req.body;
                const newResource = {
                    title,
                    description,
                    language,
                    plataform,
                    country,
                    tags,
                    updateDate
                }
                resource = await Resource.findByIdAndUpdate({ _id: resource._id }, { $set: newResource }, { new: true });
                return res.json({ msg: 'Recurso actualizado con éxito', resource }) // Response of backend. Good Process
            }

            return res.status(401).json({ error: 'No tienes permisos para editar el recurso' }) // Error 
        }
        return res.status(401).json({ error: 'Es necesario el usuario' }) // Falta el Token
    } catch (error) {
        console.log("Hubo un error en: Function updateResource")
        console.log(error);
        return res.status(400).json({
            typeError: `Error: ${error}`,
            error: "Hubo un error en el servidor. Intentalo de nuevo"
        });
    }

}
exports.deleteResource = async (req, res) => {
    // Retorar errores de express validators
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            errores: errores.array()
        });
    }
    try {
        let resource = await Resource.findById({ _id: req.params.id })
        if (!resource) {
            return res.status(401).json({ error: 'El Recurso no Existe' })
        }
        const authHeader = req.get('Authorization');
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const usuario = jwt.verify(token, process.env.SECRETA);
            // Comprobar si el que edita es el autor del recurso o es admin(ya que puede realizar cualquier acción)
            if (resource.author === usuario.id || usuario.rol === "admin") {
                // Eliminar Recurso
                await Resource.findByIdAndDelete(req.params.id);
                return res.json({ msg: 'Recurso eliminado con éxito' }) // Response of backend. Good Process
            }

            return res.status(401).json({ error: 'No tienes permisos para eliminar el recurso' }) // Error 
        }
        return res.status(401).json({ error: 'Es necesario el usuario' }) // Falta el Token
    } catch (error) {
        console.log("Hubo un error en: Function updateResource")
        console.log(error);
        return res.status(400).json({
            typeError: `Error: ${error}`,
            error: "Hubo un error en el servidor. Intentalo de nuevo"
        });
    }
}
exports.changeCondition = async (req, res) => {
    // Retorar errores de express validators
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            errores: errores.array()
        });
    }
    try {
        let resource = await Resource.findById({ _id: req.params.id })
        if (!resource) {
            return res.status(401).json({ error: 'El Recurso no Existe' })
        }
        const authHeader = req.get('Authorization');
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const usuario = jwt.verify(token, process.env.SECRETA);
            // Comprobar si el que edita es el autor del recurso o es admin(ya que puede realizar cualquier acción)
            if (usuario.rol === "admin") {
                const { condition } = req.body;
                let newRecurso = {};
                if (condition) {
                    // Publicar Recurso
                    newRecurso.condition = 'Publicado';
                } else {
                    newRecurso.condition = 'Por publicar';
                }
                resource = await Resource.findByIdAndUpdate({ _id: resource._id }, { $set: newRecurso }, { new: true });
                return res.json({ msg: 'Estado de recurso actualizado con éxito' }) // Response of backend. Good Process
            }

            return res.status(401).json({ error: 'No tienes permisos para eliminar el recurso' }) // Error 
        }
        return res.status(401).json({ error: 'Es necesario el usuario' }) // Falta el Token
    } catch (error) {
        console.log("Hubo un error en: Function updateResource")
        console.log(error);
        return res.status(400).json({
            typeError: `Error: ${error}`,
            error: "Hubo un error en el servidor. Intentalo de nuevo"
        });
    }

}
exports.myResources = async (req, res) => {
    // Retorar errores de express validators
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            errores: errores.array()
        });
    }
    const authHeader = req.get('Authorization');

    if (authHeader) {
        try {
            const token = authHeader.split(' ')[1];
            const usuario = jwt.verify(token, process.env.SECRETA);
            const resources = await Resource.find({ author: usuario.id })
            return res.json({ resources }) // Response of backend. Good Process
        } catch (error) {
            console.log("Error en el JWT. Function myResources");
            console.log(error);
            console.log("Hubo un error en: Function myResources")
            console.log(error);
            return res.status(400).json({
                typeError: `Error: ${error}`,
                error: "Hubo un error en el servidor. Intentalo de nuevo"
            });
        }

    } else {
        return res.status(400).json({
            error: "No estas autorizado"
        });
    }
}
exports.allResources = async (req, res) => {
    // Retorar errores de express validators
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            errores: errores.array()
        });
    }
    try {
        const resources = await Resource.find()
        return res.json({ resources }) // Response of backend. Good Process
    } catch (error) {
        console.log("Error en el JWT. Function allResources");
        console.log(error);
        console.log("Hubo un error en: Function allResources")
        console.log(error);
        return res.status(400).json({
            typeError: `Error: ${error}`,
            error: "Hubo un error en el servidor. Intentalo de nuevo"
        });
    }
}