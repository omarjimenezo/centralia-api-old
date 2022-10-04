const express = require('express');
const router = express.Router();
const Joi = require('joi');
const providerService = require('./provider.service');
const validateRequest = require('../_middleware/validate-request');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    providerService.getAll()
        .then((providers) => res.json({ code: 0, message: 'success', data: providers }))
        .catch(next);
}

function getById(req, res, next) {
    providerService.getById(req.params.id)
        .then((provider) => res.json({ code: 0, message: 'success', data: provider }))
        .catch(next);
}

function create(req, res, next) {
    providerService.create(req.body)
        .then(() => res.json({ code: 0, message: 'success' }))
        .catch(next);
}

function update(req, res, next) {
    providerService.update(req.params.id, req.body)
        .then(() => res.json({ code: 0, message: 'success' }))
        .catch(next);
}

function _delete(req, res, next) {
    providerService.delete(req.params.id)
        .then(() => res.json({ code: 0, message: 'success' }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        tipo: Joi.number().required(),
        usuarioId: Joi.number().required(),
        nombre: Joi.string().required(),
        calle: Joi.string().required(),
        numero: Joi.number().required(),
        interior: Joi.string().optional(),
        colonia: Joi.string().required(),
        local: Joi.string().required(),
        telefono: Joi.number().optional(),
        codigoPostal: Joi.number().min(5).required(),
        logo: Joi.string().optional(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
     const schema = Joi.object({
        tipo: Joi.number().empty(0),
        usuarioId: Joi.number().empty(0),
        nombre: Joi.string().empty(''),
        calle: Joi.string().empty(''),
        numero: Joi.number().empty(0),
        interior: Joi.string().empty(''),
        colonia: Joi.string().empty(''),
        local: Joi.string().empty(''),
        telefono: Joi.number().empty(0),
        codigoPostal: Joi.number().empty(0),
        logo: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}