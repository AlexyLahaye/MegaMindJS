const {client} = require("./db");
const uuid = require('uuid');
const { generateHashedPassword } = require('../security/crypto');
const Profil = require('./profil.model');
const User = require("./user.model");

exports.getAllProfilsFromIdUser = async (id_user) => {
    return await Profil.findAll({where : {id_user}});
}

exports.getProfilByPseudo = async (pseudo_profil) => {
    return await Profil.findOne({where : {pseudo_profil}});
}

exports.createProfil = async (body) => {
    if (body.mdp_profil){
        body.mdp_profil = await generateHashedPassword(body.mdp_profil);
    }
    const profil = body
    profil.id_profil = uuid.v4();

    await Profil.create(profil);
};

exports.deleteProfil = async (id_profil) => {
    await User.destroy({ where: { id_profil } });
};