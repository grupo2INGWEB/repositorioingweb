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
        check('plataform', 'La plataforma es obligatoria').not().isEmpty(),
        check('country', 'El país es obligatorio').not().isEmpty(),
        check('tags', 'Los tags son obligatorios').not().isEmpty(),
        check('tags', 'Los tags deben de ser un arreglo').isArray(),
        check('create', 'La fecha de creación es obligatoria').notEmpty()
    ],
    resourceController.newResource
);
// ACTUALIZAR EL RECURSO
router.put('/:id',
    [
        check('title', 'El título es obligatorio').notEmpty(),
        check('description', 'La descripción es necesaria').not().isEmpty(),
        check('language', 'El lenguaje es obligatorio').not().isEmpty(),
        check('plataform', 'La plataforma es obligatoria').not().isEmpty(),
        check('country', 'El país es obligatorio').not().isEmpty(),
        check('tags', 'Los tags son obligatorios').not().isEmpty(),
        check('tags', 'Los tags deben de ser un arreglo').isArray(),
        check('updateDate', 'La fecha de actualizacion es obligatoria').notEmpty()
    ],
    resourceController.updateResource
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

module.exports = router;