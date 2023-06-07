const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {getAllSensi} = require("../models/sensibilite.repository");


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