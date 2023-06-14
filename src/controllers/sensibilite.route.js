const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {getAllSensi, createSensi} = require("../models/sensibilite.repository");
router.post('/', async (req, res) => {
    try {
        await createSensi(req.body)
        res.status(200).json({message: "Le profil a bien ete créé"});
    }
    catch(e) {
        console.log(e)
        res.status(401).send("Echec création profil")
    }
});

// GET toute le sensibilité de la table.
router.get('/', async (req , res) => {
    try{
        const listSensi = await getAllSensi();
        res.status(200).send({listSensi : listSensi});
    }
    catch (e){
        console.log(e)
        res.status(415).send(e.message);
    }
});

exports.initializeRoutes = () => router;