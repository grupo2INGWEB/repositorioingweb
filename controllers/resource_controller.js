const Resource = require('../models/Resource');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const multer = require('multer');

const configMulter = {
    limits: { fileSize: 2000000000 },
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '/../uploads')
        },
        filename: (req, file, cb) => {
            const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            cb(null, `${shortid.generate()}${extension}`);
        }

    })
}
const upload = multer(configMulter).single('archivo');

exports.createUrl = async (req, res) => {
    const { id } = req.params;
    let resource = Resource.findById(id);
    upload(req, res, async (error) => {
        console.log(req.file);
        if (!error) {
            // resource.urlResource = req.file.filename
            const newData = {}
            newData.urlResource = shortid.generate();
            newData.nameResource = req.file.filename
            newData.originalNameResource = req.file.originalname
            resource = await Resource.findByIdAndUpdate({ _id: id }, { $set: newData }, { new: true });
            return res.json({ msg: 'Enlace creado con éxito', resource }) // Response of backend. Good Process
        }
        return res.status(400).json({ error: 'Error al subir archivo' }) // Response of backend. Good Process
    })

}

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
            // Genear enlace de descarga
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
exports.obtenerEnlace = async (req, res) => {

    const { url } = req.params;
    const resource = await Resource.findOne({ urlResource: url })
    if (!resource) {
        return res.status(404).json({ error: "la url no existe" })
    }
    res.json({
        archivo: resource.nameResource
    })
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
                    platform,
                    country,
                    tags,
                    updateDate
                } = req.body;
                // CREA UN NUEVO OBJETO QUE SE VA A ENVIAR PARA ACTUALIZAR
                const newResource = {
                    title,
                    description,
                    language,
                    platform,
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
exports.likeResource = async (req, res) => {
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
            console.log("===> SI EXISTE ACCES TOKEN");
            const token = authHeader.split(' ')[1];
            console.log(token);
            const usuario = jwt.verify(token, process.env.SECRETA);
            console.log("===> Usuario");
            console.log(usuario);
            // Comprobar si el que edita es el autor del recurso o es admin(ya que puede realizar cualquier acción)
            const calificacion = resource.calificacion + 1;
            const tempArray = resource.usersLikes ?? [];
            console.log("===> Array de likes");
            tempArray.push(usuario.id);
            console.log(tempArray)
            const newResource = {
                calificacion,
                usersLikes: tempArray
            }
            // actualizar datos
            resource = await Resource.findByIdAndUpdate({ _id: resource._id }, { $set: newResource }, { new: true });
            return res.json({ msg: 'Recurso actualizado con éxito', resource }) // Response of backend. Good Process

        }
        return res.status(401).json({ error: 'No tienes permisos para dar like el recurso' }) // Error 
    } catch (error) {
        console.log("Hubo un error en: Function likeResource")
        console.log(error);
        return res.status(400).json({
            typeError: `Error: ${error}`,
            error: "Hubo un error en el servidor. Intentalo de nuevo"
        });
    }

}
exports.disLikeResource = async (req, res) => {
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
            console.log("===> SI EXISTE ACCES TOKEN");
            const token = authHeader.split(' ')[1];
            console.log(token);
            const usuario = jwt.verify(token, process.env.SECRETA);
            console.log("===> Usuario");
            console.log(usuario);
            // Comprobar si el que edita es el autor del recurso o es admin(ya que puede realizar cualquier acción)
            const calificacion = resource.calificacion - 1;
            const tempArray = resource.usersLikes ?? [];
            console.log("===> Array de likes");
            const temp = tempArray.filter((tempId) => usuario.id != tempId);
            console.log(tempArray)
            const newResource = {
                calificacion,
                usersLikes: temp
            }
            // actualizar datos
            resource = await Resource.findByIdAndUpdate({ _id: resource._id }, { $set: newResource }, { new: true });
            return res.json({ msg: 'Recurso actualizado con éxito', resource }) // Response of backend. Good Process

        }
        return res.status(401).json({ error: 'No tienes permisos para dar like el recurso' }) // Error 
    } catch (error) {
        console.log("Hubo un error en: Function likeResource")
        console.log(error);
        return res.status(400).json({
            typeError: `Error: ${error}`,
            error: "Hubo un error en el servidor. Intentalo de nuevo"
        });
    }

}
exports.commentResource = async (req, res) => {
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
            const { comment, created } = req.body;
            console.log("===> SI EXISTE ACCESS TOKEN");
            const token = authHeader.split(' ')[1];
            console.log(token);
            const usuario = jwt.verify(token, process.env.SECRETA);
            console.log("===> Usuario");
            console.log(usuario);
            // Comprobar si el que edita es el autor del recurso o es admin(ya que puede realizar cualquier acción)
            const tempArray = resource.comments ?? [];
            console.log("===> Array de likes");
            tempArray.push({
                idUser: usuario.id,
                autor: usuario.nombre,
                comment,
                created

            });
            console.log(tempArray)
            const newResource = {
                comments: tempArray
            }
            // actualizar datos
            resource = await Resource.findByIdAndUpdate({ _id: resource._id }, { $set: newResource }, { new: true });
            return res.json({ msg: 'Recurso comentado con éxito', resource }) // Response of backend. Good Process

        }
        return res.status(401).json({ error: 'No tienes permisos para comentar el recurso' }) // Error 
    } catch (error) {
        console.log("Hubo un error en: Function commentResource")
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
exports.specialtyFilter = async (req, res) => {
    // Retorar errores de express validators
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            errores: errores.array()
        });
    }
    try {
        const { specialty } = req.body
        // PARA TRAER TODOS LOS RECURSOS .find()
        const resources = await Resource.find({
            specialty: specialty
        })
        return res.json({ resources }) // Response of backend. Good Process
    } catch (error) {
        console.log("Error en el JWT. Function specialtyFilter");
        console.log(error);
        console.log("Hubo un error en: Function specialtyFilter")
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
exports.recommendedResources = async (req, res) => {
    try {
        // PARA TRAER TODOS LOS RECURSOS .find()
        const resources = await Resource.find({
            condition: "Publicado"
        })
        const order = resources.sort((a, b) => a.comments.length > (b.comments.length) ? -1 : (a.comments.length) < (b.comments.length) ? 1 : 0);
        console.log("==> Order 1");
        console.log(order)
        const order2 = order.sort((a, b) => (a.calificacion) > (b.calificacion) ? -1 : (a.calificacion) < (b.calificacion) ? 1 : 0);
        console.log("==> Order 2");
        console.log(order2)
        const order3 = order2.slice(0, 8)
        return res.json({ resources: order2 }) // Response of backend. Good Process
    } catch (error) {
        console.log("Error en el JWT. Function recommendedResources");
        console.log(error);
        console.log("Hubo un error en: Function recommendedResources")
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
exports.buscarTagsIguales = async (req, res) => {
    try {
        // PARA TRAER TODOS LOS RECURSOS .find()
        const { tag } = req.params;
        const resources = await Resource.find({
            condition: "Publicado"
        })
        const lista = [];
        resources.forEach((resource) => {
            if (resource.tags.includes(tag)) {
                lista.push(resource)
            }
        })
        return res.json({ resources: lista }) // Response of backend. Good Process
    } catch (error) {
        console.log("Error en el JWT. Function buscarTagsIguales");
        console.log(error);
        console.log("Hubo un error en: Function buscarTagsIguales")
        console.log(error);
        return res.status(400).json({
            typeError: `Error: ${error}`,
            error: "Hubo un error en el servidor. Intentalo de nuevo"
        });
    }
}

exports.descargarRecurso = (req, res) => {
    const { archivo } = req.params;
    const ruta = __dirname + '/../uploads/' + archivo;
    res.download(ruta)
}