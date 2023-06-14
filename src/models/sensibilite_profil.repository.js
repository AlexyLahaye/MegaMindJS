const Sensibilite_profil = require("./sensibilite_profil.model");
const uuid = require("uuid");

exports.getSensiProfilById = async (id_profil) => {
    return await Sensibilite_profil.findOne({where : {id_profil}});
}

exports.createSensiProfil = async (body) =>{
    body.id_sensibilite = uuid.v4();
    return Sensibilite_profil.create(body);
}
exports.updateSensiProfil = async (body) =>{
    body.id_sensibilite = uuid.v4();
    return Sensibilite_profil.update(body);
}