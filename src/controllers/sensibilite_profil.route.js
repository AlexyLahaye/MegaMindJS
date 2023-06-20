const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {createSensiProfil, getSensiProfilById, updateSensiProfil} = require("../models/sensibilite_profil.repository");



router.post('/', async (req, res) => {
    const sensibilite_profil = await getSensiProfilById(req.body.id_profil);
    try {
        if (!sensibilite_profil){
            await createSensiProfil(req.body)
            res.status(200).json({message : "La sensibilite du profil a bien ete créé"});
        }
        else {
            await updateSensiProfil(req.body)
            res.status(200).json({message : "Le sensibilite du profil a bien ete mis a jour"});
        }
    }
    catch (e) {
        res.status(401).send("Echec création profil")
    }
});

router.post('/update', async (req, res) => {
    await updateSensiProfil(req.body.id_profil, req.body)
    res.status(200).json({message : "La notif a été mise a jour"});
});

router.get('/:id_profil', async (req , res) => {
    try{
        const uneSensiProfil = await getSensiProfilById(req.params.id_profil) ;
        res.status(200).send(uneSensiProfil);
    }
    catch (e){
        console.log(e)
        res.status(415).send(e.message);
    }
});

exports.initializeRoutes = () => router;