const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {createProfil, getAllProfilsFromIdUser, getProfilByPseudo, deleteProfil, getMostFollowedProfils, getProfilByIdProfil,
    getProfilsByPseudoDYN,
    updateProfil
} = require("../models/profil-reprository");
const {updateNotif} = require("../models/notification-repository");


router.post('/', body('pseudo_profil').notEmpty(), async (req, res) => {
    const profil = await getProfilByPseudo(req.body.pseudo_profil);
    console.log(profil)
    if (!profil){
        await createProfil(req.body)
        res.status(200).json({message : "Le profil a bien ete créé"});
    }
    else {
        res.status(401).send("Echec création profil")
    }
});

router.post('/update', body('pseudo_profil').notEmpty(), async (req, res) => {
    await updateProfil(req.body.id_profil, req.body)
    res.status(200).json({message : "La notif a été mise a jour"});
});

router.get('/:id_user', async (req , res) => {
    try{
        const allProfilFromUser = await getAllProfilsFromIdUser(req.params.id_user);
        res.status(200).send([allProfilFromUser]);
    }
    catch (e){
        res.status(412).send(e.message);
    }
});

//ON RECUPERE UN PROFIL VIA SON PSEUDO
router.get('/pseudoProfil/:pseudo_profil', async (req , res) => {
    try{
        const profil = await getProfilByPseudo(req.params.pseudo_profil);
        res.status(200).send([profil]);
    }
    catch (e){
        res.status(409).send(e.message);
    }
});

//ON RECUPERE UN PROFIL DE MANIERE DYNAMIQUE
router.get('/pseudoProfilDYN/:pseudo_profil', async (req , res) => {
    try{
        const searchedProfils = await getProfilsByPseudoDYN(req.params.pseudo_profil);
        res.status(200).send(searchedProfils);
    }
    catch (e){
        res.status(410).send(e.message);
    }
});

//ON RECUPERE UN PROFIL VIA SON ID
router.get('/idprofil/:id_profil', async (req , res) => {
    try{
        const ProfilFromID = await getProfilByIdProfil(req.params.id_profil);
        res.status(200).send([ProfilFromID]);
    }
    catch (e){
        res.status(409).send(e.message);
    }
});

// ON RECUPERE LES TROIS PROFILS LES PLUS SUIVIS
router.get('/', async (req , res) => {
    try{
        const threeBestProfil = await getMostFollowedProfils();
        res.status(200).send([threeBestProfil]);
    }
    catch (e){
        res.status(413).send(e.message);
    }
});

router.delete('/:id_profil', async (req, res) => {
    await deleteProfil(req.params.id_profil);
    res.status(204).end();
});

exports.initializeRoutes = () => router;