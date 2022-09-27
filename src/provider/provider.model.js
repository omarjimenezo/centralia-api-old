const { DataTypes } = require('sequelize');


module.exports = model;

function model(sequelize) {
    const attributes = {
        usuarioId: { type: DataTypes.INTEGER, allowNull: false },
        nombre: { type: DataTypes.STRING, allowNull: false },
        calle: { type: DataTypes.STRING, allowNull: false },
        numero: { type: DataTypes.INTEGER, allowNull: false },
        interior: { type: DataTypes.STRING, allowNull: true },
        local: { type: DataTypes.STRING, allowNull: true },
        colonia: { type: DataTypes.STRING, allowNull: false },
        codigoPostal: { type: DataTypes.INTEGER, allowNull: false },
        calificacion: { type: DataTypes.INTEGER, allowNull: true },
        logo: { type: DataTypes.STRING, allowNull: true }
    };

    return sequelize.define('proveedores', attributes, {});
}
