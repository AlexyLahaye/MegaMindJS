const {client} = require("./db");
const uuid = require('uuid');
const { generateHashedPassword } = require('../security/crypto');
const Profil = require('./profil.model');
const {countFollowForIdProfil} = require("../models/follow-repository");


exports.getAllProfilsFromIdUser = async (id_user) => {
    return await Profil.findAll({where : {id_user}});
}

exports.getProfilByPseudo = async (pseudo_profil) => {
    return await Profil.findOne({where : {pseudo_profil}});
}

exports.getProfilByIdProfil = async (id_profil) => {
    return await Profil.findOne({where : {id_profil}});
}

exports.getMostFollowedProfils = async () => {
    const profils = await Profil.findAll();
    const result = [];

    for (let i = 0; i < profils.length; i++) {
        const count = await countFollowForIdProfil(profils[i].id_profil);
        result.push({ profil: profils[i], count: count });
    }

    result.sort((a, b) => b.count - a.count);
    return result.slice(0, 3).map((item) => item.profil);
};

exports.createProfil = async (body) => {
    if (body.mdp_profil){
        body.mdp_profil = await generateHashedPassword(body.mdp_profil);
    }
    const profil = body
    profil.id_profil = uuid.v4();

    await Profil.create(profil);
};

exports.deleteProfil = async (id_profil) => {
    await Profil.destroy({ where: { id_profil } });
};