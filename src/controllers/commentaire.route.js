const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {createCom, getAllComFromIdPost, getComById, deleteCom} = require("../models/commentaire-repository");



router.post('/', body('contenu_com').notEmpty(), body('sensibilite_post').notEmpty(), async (req, res) => {
    try{
        await createCom(req.body)
        res.status(200).json({message : "Le commentaire a bien ete créé"});
    }
    catch (e){
        res.status(412).send(e.message);
    }
});

//GET TOUT LES POSTS
router.get('/', async (req,res) =>{

});

//GET LES COMS DUN POST
router.get('/:id_post', async (req,res) =>{
    const foundCom = await getAllComFromIdPost(req.params.id_post);

    if (foundCom) {
        res.status(200).send([foundCom]);
        return;
    }
    if (!foundCom) {
        const foundUser = null;
        res.status(500).send('User not found');
        return ;
    }
    res.send(foundCom);
});

//GET UN COM PAR RAPPORT A SON ID
router.get('/id/:id_com', async (req,res) =>{
    try{
        const ComFromItID = await getComById(req.params.id_com);
        res.status(200).send([ComFromItID]);
    }
    catch (e){
        res.status(412).send(e.message);
    }
});
router.delete('/:id_com', async (req, res) => {
    await deleteCom(req.params.id_com);
    res.status(204).end();
});


exports.initializeRoutes = () => router;