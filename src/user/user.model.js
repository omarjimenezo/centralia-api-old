const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false },
        passwordHash: { type: DataTypes.STRING, allowNull: false },
        nombre: { type: DataTypes.STRING, allowNull: false },
        apellido: { type: DataTypes.STRING, allowNull: false },
        rol: { type: DataTypes.INTEGER, allowNull: false },
        avatar: { type: DataTypes.STRING, allowNull: true }
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('usuarios', attributes, options);
}