const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Role = require('../_helpers/role');
const userService = require('./user.service');
const validateRequest = require('../_middleware/validate-request');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    userService.getAll()
        .then((users) => res.json({ code: 0, message: 'success', data: users }))
        .catch(next);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then((user) => res.json({ code: 0, message: 'success', data: user }))
        .catch(next);
}

function create(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ code: 0, message: 'success' }))
        .catch(next);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({ code: 0, message: 'success' }))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ code: 0, message: 'success' }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        nombre: Joi.string().required(),
        apellido: Joi.string().required(),
        rol: Joi.number().valid(Role.Proveedor, Role.Negocio, Role.Agente).required(),
        email: Joi.string().email().required(),
        telefono_negocio: Joi.number().optional(),
        telefono_personal: Joi.number().required(),
        avatar: Joi.string().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        nombre: Joi.string().empty(''),
        apellido: Joi.string().empty(''),
        rol: Joi.number().valid(Role.Proveedor, Role.Negocio, Role.Agente).empty(''),
        email: Joi.string().email().empty(''),
        telefono_negocio: Joi.number().empty(0),
        telefono_personal: Joi.number().empty(0),
        avatar: Joi.string().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}
