const express = require('express');
const { check } = require('express-validator')
const router = express.Router();
const resourceController = require('../controllers/resource_controller');

// Crear un nuevo recurso
router.post('/',
    [
        check('title', 'El título es obligatorio').notEmpty(),
        check('description', 'La descripción es necesaria').not().isEmpty(),
        check('language', 'El lenguaje es obligatorio').not().isEmpty(),
        check('platform', 'La platforma es obligatoria').not().isEmpty(),
        check('country', 'El país es obligatorio').not().isEmpty(),
        check('specialty', 'Especialidad es obligatoria').not().isEmpty(),
        check('category', 'Categoria es obligatoria').not().isEmpty(),
        check('university', 'La Universidad es obligatoria').not().isEmpty(),
        check('tags', 'Los tags son obligatorios').not().isEmpty(),
        check('tags', 'Los tags deben de ser un arreglo').isArray(),
        check('create', 'La fecha de creación es obligatoria').notEmpty()
    ],
    resourceController.newResource
);
// Subir archivo
router.post('/subirArchivo/:id',
    resourceController.createUrl
)
router.get('/descargar/:archivo',
    resourceController.descargarRecurso
);
// ACTUALIZAR EL RECURSO
router.put('/:id',
    [
        check('title', 'El título es obligatorio').notEmpty(),
        check('description', 'La descripción es necesaria').not().isEmpty(),
        check('language', 'El lenguaje es obligatorio').not().isEmpty(),
        check('platform', 'La platforma es obligatoria').not().isEmpty(),
        check('specialty', 'Especialidad es obligatoria').not().isEmpty(),
        check('category', 'Categoria es obligatoria').not().isEmpty(),
        check('university', 'La Universidad es obligatoria').not().isEmpty(),
        check('country', 'El país es obligatorio').not().isEmpty(),
        check('tags', 'Los tags son obligatorios').not().isEmpty(),
        check('tags', 'Los tags deben de ser un arreglo').isArray(),
        check('updateDate', 'La fecha de actualizacion es obligatoria').notEmpty()
    ],
    resourceController.updateResource
);
router.get('/enlace/:url',
    resourceController.obtenerEnlace
)
// LIKE AL RECURSO
router.put('/like/:id',
    resourceController.likeResource
);
// COMENTAR EL RECURSO
router.put('/comment/:id',
    [
        check('comment', 'El comentario es obligatorio').not().isEmpty(),
        check('created', 'La fecha es obligatorio').not().isEmpty(),
    ],
    resourceController.commentResource
);
// FILTRAR EL RECURSO POR ESPECIALIDAD
router.post('/specialty',
    [
        check('specialty', 'La especialidad es obligatoria').not().isEmpty(),
    ],
    resourceController.specialtyFilter
);
// DISLIKE AL RECURSO
router.put('/dislike/:id',
    resourceController.disLikeResource
);
// CAMBIAR A PUBLICADO O DESPUBLICAR
router.put('/cambiarestado/:id',
    [
        check('condition', 'La condicion debe de ser un booleano').isBoolean(),
    ],
    resourceController.changeCondition
);
// ELIMINAR RECURSO
router.delete('/:id',
    resourceController.deleteResource
)
// OBRTENER TODOS LOS RECURSOS
router.get('/',
    resourceController.allResources
);
// OBTENER MIS RECURSOS
router.get('/myresources',
    resourceController.myResources
);
// OBTENER RECURSOS RECIENTES
router.get('/recentresources',
    resourceController.recentResources
);
// OBTENER RECURSOS RECOMENDADOS
router.get('/recommended',
    resourceController.recommendedResources
);
// OBTENER RECURSOS Más valorados
router.get('/mostCalifications',
    resourceController.mostCalificationResources
);
// OBTENER RECURSOS PENDIENTES
router.get('/pendingResources',
    resourceController.pendingResources
);

module.exports = router;