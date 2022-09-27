const { Op } = require('sequelize');
const db = require('../_helpers/db');
const path = require('path');
const upload = require('../_middleware/upload-image');
const Resize = require('../_middleware/resize-image');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Provider.findAll();
}

async function getById(id) {
    const account = await getAccount(id);
    return basicDetails(account);
}

async function create(params) {
    // validate
    if (await db.Provider.findOne({ where: { nombre: params.nombre } })) {
        throw 'Provider "' + params.nombre + '" is already registered';
    }

    const provider = new db.Provider(params);

    // save account
    await provider.save();

    // save image
    if (params.logo) {
        const imagePath = path.join(__dirname, '/public/images');
        const fileUpload = new Resize(imagePath);
        await fileUpload.save(params.logo.buffer);
    }
}

async function update(id, params) {
    const account = await getAccount(id);

    // validate (if email was changed)
    if (params.email && account.email !== params.email && await db.Provider.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = await hash(params.password);
    }

    // copy params to account and save
    Object.assign(account, params);
    account.updated = Date.now();
    await account.save();

    return basicDetails(account);
}

async function _delete(id) {
    const account = await getAccount(id);
    await account.destroy();
}