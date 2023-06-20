const Commentaire = require("./commentaire.model");
const uuid = require("uuid");

exports.getAllComFromIdPost = async (id_post_com) => {
    let listCom = await Commentaire.findAll({where : {id_post_com}});
    listCom = listCom.sort((b, a) => {return a.createdAt - b.createdAt;})
    return listCom
}

exports.getComById = async (id_com) => {
    return await Commentaire.findOne({where : {id_com}});
}

exports.createCom = async (body) => {
    const com = body
    com.id_com = uuid.v4();
    await Commentaire.create(body);
};

exports.countComForIdProfil = async (id_post_com) => {
    return count = await Commentaire.count({ where: { id_post_com } });
};

exports.deleteCom = async (id_com) => {
    await Commentaire.destroy({ where: { id_com } });
};