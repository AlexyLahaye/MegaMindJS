const {client} = require("./db");
const uuid = require('uuid');
const { generateHashedPassword } = require('../security/crypto');
const User = require('./user.model');

exports.getUsers = async () => {
    return await User.findAll();
}

exports.getUserByLabel = async (label_user) => {
    return await User.findOne({where : {label_user}});
}

exports.createUser = async (body) => {
    const hashedPassword = generateHashedPassword(body.mdp_user);
    const user = body;
    user.id_user = uuid.v4();
    user.mdp_user = hashedPassword;
    await User.create(user);
};

exports.updateUser = async (id_user, data) => {
    const foundUser = await User.findOne({ where: { id_user } });

    if (!foundUser) {
        throw new Error('Pas de user');
    }

    await User.update(
        {
            label_user: data.label_user || foundUser.label_user,
            mdp_user: data.mdp_user ? generateHashedPassword(data.mdp_user) : foundUser.mdp_user,
        },
        { where: { id_user } },
    );
};


exports.deleteUser = async (id_user) => {
    await User.destroy({ where: { id_user } });
};