const {client} = require("./db");
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const uuid = require('uuid');
const { generateHashedPassword } = require('../security/crypto');
const Profil = require('./profil.model');
const {countFollowForIdProfil} = require("../models/follow-repository");
const Notification = require("./notification.model");
const User = require("./user.model");
const {DataTypes} = require("sequelize");


exports.getAllProfilsFromIdUser = async (id_user) => {
    return await Profil.findAll({where : {id_user}});
}

exports.getProfilByPseudo = async (pseudo_profil) => {
    return await Profil.findOne({where : {pseudo_profil}});
}

exports.getProfilByIdProfil = async (id_profil) => {
    return await Profil.findOne({where : {id_profil}});
}

exports.getProfilsByPseudoDYN = async (pseudo_profil) => {
    return await Profil.findAll({
        where: {
            pseudo_profil: {
                [Sequelize.Op.startsWith]: pseudo_profil // Utilise Op.startsWith pour la correspondance partielle
            }
        },
        limit: 10 // Limite le nombre de résultats à 10
    });
};

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

exports.updateProfil = async (id_profil, data) => {
    const foundProfil = await Profil.findOne({ where: { id_profil } });

    if (!foundProfil) {
        throw new Error('Pas de user');
    }

    console.log(DataTypes.NOW)
    await Profil.update(
        {
            pseudo_profil: data.pseudo_profil || foundProfil.pseudo_profil,
            mdp_profil: data.mdp_profil ? generateHashedPassword(data.mdp_profil) : foundProfil.mdp_profil,
            updatedAt: data.updatedAt
        },
        { where: { id_profil } },
    );
};

exports.deleteProfil = async (id_profil) => {
    await Profil.destroy({ where: { id_profil } });
};