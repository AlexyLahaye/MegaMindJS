const Sensibilite = require("./sensibilite.model");



exports.getSensiById = async (id_sensibilite) => {
    return await Sensibilite.findOne({where : {id_sensibilite}});
}

exports.getAllSensi = async () => {
    return await Sensibilite.findAll();
}