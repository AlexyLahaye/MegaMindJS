const Like = require("./like.model");
const uuid = require("uuid");

exports.getAllLikeFromIdContenu = async (id_contenu_like, id_etat_like) => {
    return await Like.findAll({where : {id_contenu_like, id_etat_like}});
}

exports.getLikeById = async (id_like) => {
    return await Like.findOne({where : {id_like}});
}

exports.getIsLikedByUser = async (id_contenu_like, id_etat_like, id_profil_like) => {
    return await Like.findOne({where : {id_contenu_like, id_etat_like, id_profil_like}})
}

exports.createLike = async (body) => {
    const like = body
    like.id_post = uuid.v4();
    await Like.create(like);
};

exports.countLikeFromContenu = async (id_contenu_like, id_etat_like) => {
    return count = await Like.count({ where: { id_contenu_like, id_etat_like } });
};

exports.deleteLike = async (id_like) => {
    await Like.destroy({ where: { id_like } });
};