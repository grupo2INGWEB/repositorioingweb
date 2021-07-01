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
            resource.nameAuthor = usuario.nombre;
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
        // BUSCAR EL RECURSO POR EL ID
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
                // CREA UN NUEVO OBJETO QUE SE VA A ENVIAR PARA ACTUALIZAR
                const newResource = {
                    title,
                    description,
                    language,
                    plataform,
                    country,
                    tags,
                    updateDate
                }
                // actualizar datos
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
                    newRecurso.idAdmin = usuario.id;
                    newRecurso.nameAdmin = usuario.nombre;
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
            console.log(usuario);
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
        // PARA TRAER TODOS LOS RECURSOS .find()
        const resources = await Resource.find({
            condition: "Publicado"
        })
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
exports.recentResources = async (req, res) => {
    try {
        // PARA TRAER TODOS LOS RECURSOS .find()
        const resources = await Resource.find({
            condition: "Publicado"
        })
        const order = resources.sort((a, b) => parseInt(a.create) > parseInt(b.create) ? -1 : parseInt(a.create) < parseInt(b.create) ? 1 : 0);
        const order2 = order.slice(0, 8)
        return res.json({ resources: order2 }) // Response of backend. Good Process
    } catch (error) {
        console.log("Error en el JWT. Function recentResources");
        console.log(error);
        console.log("Hubo un error en: Function recentResources")
        console.log(error);
        return res.status(400).json({
            typeError: `Error: ${error}`,
            error: "Hubo un error en el servidor. Intentalo de nuevo"
        });
    }
}
exports.mostCalificationResources = async (req, res) => {
    try {
        // PARA TRAER TODOS LOS RECURSOS .find()
        const resources = await Resource.find({
            condition: "Publicado"
        })
        const order = resources.sort((a, b) => parseInt(a.calificacion) > parseInt(b.calificacion) ? -1 : parseInt(a.calificacion) < parseInt(b.calificacion) ? 1 : 0);
        const order2 = order.slice(0, 8)
        return res.json({ resources: order2 }) // Response of backend. Good Process
    } catch (error) {
        console.log("Error en el JWT. Function recentResources");
        console.log(error);
        console.log("Hubo un error en: Function recentResources")
        console.log(error);
        return res.status(400).json({
            typeError: `Error: ${error}`,
            error: "Hubo un error en el servidor. Intentalo de nuevo"
        });
    }
}
exports.pendingResources = async (req, res) => {
    try {
        // PARA TRAER TODOS LOS RECURSOS .find()
        const resources = await Resource.find({
            condition: "Por publicar"
        })
        return res.json({ resources }) // Response of backend. Good Process
    } catch (error) {
        console.log("Error en el JWT. Function pendingRespurces");
        console.log(error);
        console.log("Hubo un error en: Function pendingRespurces")
        console.log(error);
        return res.status(400).json({
            typeError: `Error: ${error}`,
            error: "Hubo un error en el servidor. Intentalo de nuevo"
        });
    }
}