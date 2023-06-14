const Sensibilite = require("./sensibilite.model");
const uuid = require("uuid");

exports.getSensiById = async (id_sensibilite) => {
    return await Sensibilite.findOne({where : {id_sensibilite}});
}

exports.createSensi = async (body) =>{
    body.id_sensibilite = uuid.v4();
    return Sensibilite.create(body);
}

exports.getAllSensi = async () => {
    return await Sensibilite.findAll();
}