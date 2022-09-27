const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');

module.exports = authenticateSchema;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}