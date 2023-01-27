const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {createProfil, getAllProfilsFromIdUser, getProfilByPseudo, deleteProfil} = require("../models/profil-reprository");


router.post('/',body('label_user').notEmpty(), body('pseudo_profil').notEmpty(), body('isadmin_profil').notEmpty() , async (req, res) => {
    const profil = await getProfilByPseudo(req.body.pseudo_profil);

    if (!profil){
        await createProfil(req.body)
        res.status(200).send();
    }
    else {
        res.status(412).send("Echec création profil")
    }
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

router.delete('/:id_profil', async (req, res) => {
    await deleteProfil(req.params.id_profil);
    res.status(204).end();
});

exports.initializeRoutes = () => router;