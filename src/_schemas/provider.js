const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');

module.exports = {
    createSchema,
    updateSchema
};


function createSchema(req, res, next) {
    const schema = Joi.object({
        usuarioId: Joi.number().required(),
        nombre: Joi.string().required(),
        calle: Joi.string().required(),
        numero: Joi.number().required(),
        interior: Joi.string().optional(),
        colonia: Joi.string().required(),
        local: Joi.string().required(),
        codigoPostal: Joi.number().min(5).required(),
        calificacion: Joi.number().optional(),
        logo: Joi.string().optional(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        usuarioId: Joi.number().empty(0),
        nombre: Joi.string().empty(''),
        calle: Joi.string().empty(''),
        numero: Joi.number().empty(0),
        interior: Joi.string().empty(''),
        colonia: Joi.string().empty(''),
        local: Joi.string().empty(''),
        codigoPostal: Joi.number().empty(0),
        calificacion: Joi.number(),
        logo: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}