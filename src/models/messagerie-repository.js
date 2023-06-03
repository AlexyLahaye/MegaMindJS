const Messagerie = require("./messagerie.model");

exports.getAllMessFromIdProfil = async (id_profil_recoit_mess, id_profil_envoie_mess) => {
    return await Messagerie.findAll({where : {id_profil_recoit_mess, id_profil_envoie_mess}});
}


exports.createMess = async (body) => {
    await Messagerie.create(body);
};

exports.deleteMess = async (id_mess) => {
    await Messagerie.destroy({ where: { id_mess } });
};