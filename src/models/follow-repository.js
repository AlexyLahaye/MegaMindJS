const Follow = require("./follow.model");

exports.getAllfollowFromIdProfil = async (id_profil) => {
    return await Follow.findAll({where : {id_profil}});
}

exports.getAllFollowingWithIdProfil = async (id_profil_suivi) => {
    return await Follow.findAll({where : {id_profil_suivi}});
}

exports.createFollow = async (body) => {
    await Follow.create(body);
};

exports.countFollowForIdProfil = async (id_profil) => {
    return count = await Follow.count({ where: { id_profil } });
};

exports.deleteFollow = async (id_profil, id_profil_suivi) => {
    await Follow.destroy({ where: { id_profil, id_profil_suivi } });
};