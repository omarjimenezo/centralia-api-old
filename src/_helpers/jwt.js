
var { expressjwt: jwt } = require("express-jwt");
const config = require('../config.json');

module.exports = jwt;

function jwt() {
    const { secret } = config;
    return jwt({ secret: secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/auth'
        ]
    });
}