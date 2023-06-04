const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {createLike, getAllLikeFromIdContenu, getIsLikedByUser, countLikeFromContenu, deleteLike} = require("../models/like-repository");


router.post('/', body('id_like').notEmpty(), body('id_contenu_like').notEmpty(), async (req, res) => {
    await createLike(req.body)
    res.status(200).json({message : "Le Like a fonctionné"});
});

// Le nombre total de like pour un Contenu
router.get('/count/:id_contenu_like/:id_etat_like', async (req , res) => {
    try{
        const nbLikes = await countLikeFromContenu(req.params.id_contenu_like, req.params.id_etat_like);
        res.status(200).send({nbLikes : nbLikes});
    }
    catch (e){
        console.log(e)
        res.status(411).send(e.message);
    }
});

//Tout les like d'un contenu
router.get('/:id_contenu_like/:id_etat_like', async (req , res) => {
    try{
        const allLikeFromContenu = await getAllLikeFromIdContenu(req.params.id_contenu_like, req.params.id_etat_like);
        res.status(200).send([allLikeFromContenu]);
    }
    catch (e){
        res.status(412).send(e.message);
    }
});

// Verifie pour un contenu si l'utilisateur a deja like celui ci
router.get('/:id_contenu_like/:id_etat_like/:id_profil_like', async (req,res)=> {
    try {
        console.log("BLALBLALBLABLLABLLBABA")
        const like = await getIsLikedByUser(req.params.id_contenu_like, req.params.id_etat_like, req.params.id_profil_like);
        console.log(like)
        if (like === null){
            console.log("ICIIIIIIIIII")
            res.status(200).send({isLiked :false});
        }
        else {
            console.log("LAAAAAAAAAAAAAAA")
            res.status(200).send({isLiked :true});
        }
    }
    catch (e){
        console.log(e)
        res.status(413).send(e.message);
    }
})

router.delete('/:id_contenu_like/id_etat_like', async (req, res) => {
    console.log("AZZZZZZZZZZZZZZZZZZZDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDSSSSSSSSSSSSSSSSSSSSSSSSQQQQQQQQQQQQQQQQQQQQQQQ")
    await deleteLike(req.params.id_contenu_like, req.params.id_etat_like);
});

exports.initializeRoutes = () => router;