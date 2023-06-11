const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {createPost, deletePost, getAllPostFromPseudoProfil, getPostById, getAllPostOfFollowedProfils, getMostLikedPosts, getMostComPosts,
    getAllPostFromIdProfil
} = require("../models/post-repository");



router.post('/', body('contenu_post').notEmpty(), body('sensibilite_post').notEmpty(), async (req, res) => {
    try{
        console.log(req.body)
        await createPost(req.body)
        res.status(200).json({message : "Le post a bien ete créé"});
    }
    catch (e){
        res.status(412).send(e.message);
    }
});

//GET TOUT LES POSTS DES PROFILS SUIVI PAR L'UTILISATEUR
router.get('/:id_profil', async (req,res) =>{
    console.log(req.params.id_profil)
    const foundAllPost = await getAllPostOfFollowedProfils(req.params.id_profil);

    if (foundAllPost){
        res.status(200).send([foundAllPost]);
        return;
    }
    if(!foundAllPost){
        const foundAllPost = null;
        res.status(500).send('Aucun post trouvé, suivez des utilisateurs pour en voir dans l\'accueil');
        return ;
    }
    res.send(foundAllPost)

});

//GET LES POSTS DUN PROFIL
router.get('/own/:id_profil', async (req,res) =>{
    const foundPost = await getAllPostFromIdProfil(req.params.id_profil);

    if (foundPost) {
        res.status(200).send([foundPost]);
        return;
    }
    if (!foundPost) {
        const foundPost = null;
        res.status(500).send('Ce profil n\'a aucun post');
        return ;
    }
    res.send(foundPost);
});

//GET LES TROIS POSTS LES PLUS LIKE
router.get('/most/like/:id_profil', async (req,res) =>{
    const foundPost = await getMostLikedPosts(req.params.id_profil);

    if (foundPost) {
        res.status(200).send([foundPost]);
        return;
    }
    if (!foundPost) {
        const foundPost = null;
        res.status(500).send('Aucun post');
        return ;
    }
    res.send(foundPost);
});

//GET LES TROIS POST LES PLUS COM
router.get('/most/com/:id_profil', async (req,res) =>{
    const foundPost = await getMostComPosts(req.params.id_profil);

    if (foundPost) {
        res.status(200).send([foundPost]);
        return;
    }
    if (!foundPost) {
        const foundPost = null;
        res.status(500).send('Aucun post');
        return ;
    }
    res.send(foundPost);
});

//GET UN POST PAR RAPPORT A SON ID
router.get('/id/:id_post', async (req,res) =>{
    try{
        const PostFromItID = await getPostById(req.params.id_post);
        res.status(200).send([PostFromItID]);
    }
    catch (e){
        res.status(412).send(e.message);
    }
});
router.delete('/:id_post', async (req, res) => {
    await deletePost(req.params.id_post);
    res.status(204).end();
});


exports.initializeRoutes = () => router;