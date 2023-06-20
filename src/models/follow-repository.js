const Follow = require("./follow.model");

exports.getAllfollowFromIdProfil = async (id_profil) => {
    return await Follow.findAll({where : {id_profil}});
}

exports.isFollowed = async (id_profil, id_profil_suivi) => {
    const count = await Follow.count({where: {id_profil, id_profil_suivi}})
    //Simplification faite par webStorm tres interressante, c'est concretement un if count > 0 return true else return false
    return count > 0;
}
exports.getAllFollowingWithIdProfil = async (id_profil_suivi) => {
    return await Follow.findAll({where : {id_profil_suivi}});
}

exports.createFollow = async (body) => {
    await Follow.create(body);
};

exports.countFollowForIdProfil = async (id_profil) => {
    const count = await Follow.count({ where: { id_profil } });
    return count
};

exports.countFollowingForIdProfil = async (id_profil_suivi) => {
    return await Follow.count({ where: { id_profil_suivi } });
};



exports.deleteFollow = async (id_profil, id_profil_suivi) => {
    await Follow.destroy({ where: { id_profil, id_profil_suivi } });
};