const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');

module.exports = {
    createSchema,
    updateSchema
};


function createSchema(req, res, next) {
    const schema = Joi.object({
        nombre: Joi.string().required(),
        apellido: Joi.string().required(),
        rol: Joi.number().valid(Role.Proveedor, Role.Negocio, Role.Agente).required(),
        email: Joi.string().email().required(),
        telefono_negocio: Joi.number().optional(),
        telefono_personal: Joi.number().required(),
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
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}