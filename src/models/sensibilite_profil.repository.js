const Sensibilite_profil = require("./sensibilite_profil.model");
const uuid = require("uuid");
const Profil = require("./profil.model");
const {DataTypes} = require("sequelize");
const {generateHashedPassword} = require("../security/crypto");

exports.getSensiProfilById = async (id_profil) => {
    return await Sensibilite_profil.findOne({where : {id_profil}});
}

exports.createSensiProfil = async (body) =>{
    body.id_sensibilite = uuid.v4();
    return Sensibilite_profil.create(body);
}

exports.updateSensiProfil = async (id_profil, data) => {
    const foundSensiProfil = await Sensibilite_profil.findOne({ where: { id_profil } });

    if (!foundSensiProfil) {
        throw new Error('R');
    }

    await Sensibilite_profil.update(
        {
            ecriture_sensibilite: data.ecriture_sensibilite || foundSensiProfil.ecriture_sensibilite,
            lecture_sensibilite: data.lecture_sensibilite || foundSensiProfil.lecture_sensibilite,
            mots_sensibilite: data.mots_sensibilite || foundSensiProfil.mots_sensibilite,
            updatedAt: data.updatedAt
        },
        { where: { id_profil } },
    );
};