const Like = require("./like.model");
const uuid = require("uuid");

exports.getAllLikeFromIdContenu = async (id_contenu_like, id_etat_like) => {
    return await Like.findAll({where : {id_contenu_like, id_etat_like}});
}

exports.getLikeById = async (id_like) => {
    return await Like.findOne({where : {id_like}});
}

exports.getIsLikedByUser = async (id_contenu_like, id_etat_like, id_profil_like) => {
    console.log(id_contenu_like, id_etat_like, id_profil_like)
    const isLiked  = await Like.findOne({where : {id_contenu_like, id_etat_like, id_profil_like}})

    console.log(isLiked)
    if (isLiked != null){
        return true
    }
    else {
        return false
    }
}

exports.createLike = async (body) => {

    const like = body
    console.log(like.id_like)
    like.id_like = uuid.v4();
    console.log(like.id_like)
    await Like.create(like);
};

exports.countLikeFromContenu = async (id_contenu_like, id_etat_like) => {
    return count = await Like.count({ where: { id_contenu_like, id_etat_like } });
};

exports.deleteLike = async (id_contenu_like,id_profil_like, id_etat_like) => {
    await Like.destroy({ where: { id_contenu_like,id_profil_like, id_etat_like } });
};