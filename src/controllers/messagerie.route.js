const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {createMess, getAllMessFromIdProfil, deleteMess} = require("../models/messagerie-repository");

router.post('/', body('contenu_mess').notEmpty(), async (req, res) => {
    try{
        await createMess(req.body)
        res.status(200).json({message : "Le message a bien ete envoyé"});
    }
    catch (e){
        res.status(412).send(e.message);
    }
});

//GET TOUT LES POSTS
router.get('/', async (req,res) =>{

});

//GET TOUT LES MESSAGES ENTRE DEUX UTILISATEURS
router.get('/:id_profil_recoit_mess/:id_profil_envoie_mess', async (req,res) =>{
    const foundMessGet = await getAllMessFromIdProfil(req.params.id_profil_recoit_mess, req.params.id_profil_envoie_mess);
    const foundMessSend = await getAllMessFromIdProfil(req.params.id_profil_envoie_mess, req.params.id_profil_recoit_mess);

    let mergedMess = foundMessGet.concat(foundMessSend);
    mergedMess.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    if (mergedMess.length > 0) {
        res.status(200).send(mergedMess);
    } else {
        res.status(500).send('No messages found');
    }
});

router.delete('/:id_mess', async (req, res) => {
    await deleteMess(req.params.id_mess);
    res.status(204).end();
});


exports.initializeRoutes = () => router;