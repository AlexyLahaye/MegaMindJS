const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {createFollow, getAllfollowFromIdProfil, getAllFollowingWithIdProfil, deleteFollow, countFollowForIdProfil,
    countFollowingForIdProfil, isFollowed} = require("../models/follow-repository");


router.post('/', body('id_profil').notEmpty(), body('id_profil_suivi').notEmpty(), async (req, res) => {
    await createFollow(req.body)
    res.status(200).json({message : "Le Follow a fonctionné"});
});

//Tout les follows d'un profil
router.get('/you/:id_profil', async (req , res) => {
    try{
        const allFollowFromProfil = await getAllfollowFromIdProfil(req.params.id_profil);
        res.status(200).send(allFollowFromProfil);
    }
    catch (e){
        res.status(412).send(e.message);
    }
});

//Toute les personnes qui suivent le profil
router.get('/them/:id_profil_suivi', async (req , res) => {
    try{
        const allFollowingFromProfil = await getAllFollowingWithIdProfil(req.params.id_profil_suivi);
        res.status(200).send(allFollowingFromProfil);
    }
    catch (e){
        res.status(412).send(e.message);
    }
});

router.get('/count/you/:id_profil', async (req , res) => {
    try{
        const nbAllFollowFromProfil = await countFollowForIdProfil(req.params.id_profil);
        res.status(200).send({nbAllFollowFromProfil : nbAllFollowFromProfil});
    }
    catch (e){
        res.status(412).send(e.message);
    }
});

router.get('/count/them/:id_profil_suivi', async (req , res) => {
    try{
        const nbAllFollowingFromProfil = await countFollowingForIdProfil(req.params.id_profil_suivi);
        res.status(200).send({nbAllFollowingFromProfil : nbAllFollowingFromProfil});
    }
    catch (e){
        res.status(412).send(e.message);
    }
});

router.get('/isFollow/:id_profil/:id_profil_suivi', async (req , res) => {
    try{
        const verifFollow = await isFollowed(req.params.id_profil, req.params.id_profil_suivi);
        res.status(200).send({verifFollow : verifFollow});
    }
    catch (e){
        res.status(412).send(e.message);
    }
});



router.delete('/:id_profil/:id_profil_suivi', async (req, res) => {
    await deleteFollow(req.params.id_profil, req.params.id_profil_suivi);
    res.status(204).end();
});

exports.initializeRoutes = () => router;