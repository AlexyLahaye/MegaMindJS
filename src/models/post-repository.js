const Post = require("./post.model");
const {getProfilByPseudo} = require("../models/profil-reprository");
const {getAllfollowFromIdProfil} = require("../models/follow-repository");
const uuid = require("uuid");
const {countLikeForIdProfil, countLikeFromContenu, getIsLikedByUser} = require("./like-repository");
const {countComForIdProfil} = require("./commentaire-repository");
const {getProfilByIdProfil} = require("./profil-reprository");


exports.getAllPostFromIdProfil = async (id_profil) => {
    return await Post.findAll({where : {id_profil}});
}


exports.getAllPostOfFollowedProfils = async (id_profil) => {
        const follows = await getAllfollowFromIdProfil(id_profil)
        let listPostByUser = await Post.findAll({where:{id_profil}})
        if (Array.isArray(follows) && follows.length > 0) {
            for (const unFollowed of follows) {
                const id_profil = unFollowed.id_profil_suivi;
                const listPostByFollowedProfil = await Post.findAll({ where: { id_profil } });
                listPostByUser = listPostByUser.concat(listPostByFollowedProfil);
            }
        }

    if (listPostByUser.length > 0) {
        listPostByUser = listPostByUser.sort((b, a) => {
            return a.createdAt - b.createdAt;
        })
        for (const unPost of listPostByUser){
            leProfil = await getProfilByIdProfil(unPost.id_profil)
            nbLike =  await countLikeFromContenu(unPost.id_post, 2)
            isLiked = await getIsLikedByUser(unPost.id_post,2,id_profil)
            const pseudo_profil = leProfil.pseudo_profil
            unPost.dataValues.pseudo_profil = pseudo_profil
            unPost.dataValues.nbLike = nbLike
            unPost.dataValues.isLiked = isLiked
        }
    }

    return listPostByUser;
}

exports.getAllPostFromPseudoProfil = async (pseudo_profil) => {
    const profil = await getProfilByPseudo(pseudo_profil)
    if (profil !== null){
        const id_profil = profil.id_profil
        return await Post.findAll({where : {id_profil}});
    }
}

exports.getMostLikedPosts = async () => {
    const posts = await Post.findAll();
    const result = [];

    for (let i = 0; i < posts.length; i++) {
        const count = await countLikeForIdProfil(posts[i].id_profil);
        result.push({ post: posts[i], count: count });
    }

    result.sort((a, b) => b.count - a.count);
    return result.slice(0, 3).map((item) => item.post);
};

exports.getMostComPosts = async () => {
    const posts = await Post.findAll();
    const result = [];

    for (let i = 0; i < posts.length; i++) {
        const count = await countComForIdProfil(posts[i].id_profil);
        result.push({ post: posts[i], count: count });
    }
    result.sort((a, b) => b.count - a.count);
    return result.slice(0, 3).map((item) => item.post);
};

exports.getPostById = async (id_post) => {
    return await Post.findOne({where : {id_post}});
}

exports.createPost = async (body) => {
    const post = body
    post.id_post = uuid.v4();
    await Post.create(post);
};

exports.deletePost = async (id_post) => {
    await Post.destroy({ where: { id_post } });
};