const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {createNotif, getAllNotifFromIdProfil, deleteNotif, getNotifById, updateNotif} = require("../models/notification-repository");


router.post('/', body('id_notification').notEmpty(), body('contenu_notification').notEmpty(), async (req, res) => {
    await createNotif(req.body)
    res.status(200).json({message : "La notif a été céée"});
});

router.post('/update', body('id_notification').notEmpty(), body('contenu_notification').notEmpty(), async (req, res) => {
    await updateNotif(req.body.id_notification, req.body)
    res.status(200).json({message : "La notif a été mise a jour"});
});

//Tout les Notifs d'un profil
router.get('/:id_profil_notifier', async (req , res) => {
    try{
        const allNotifFromProfil = await getAllNotifFromIdProfil(req.params.id_profil_notifier);
        res.status(200).send(allNotifFromProfil);
    }
    catch (e){
        res.status(412).send(e.message);
    }
});

router.get('/idNotif/:id_notification', async (req , res) => {
    try{
        const uneNotif = await getNotifById(req.params.id_notification);
        res.status(200).send(uneNotif);
    }
    catch (e){
        res.status(412).send(e.message);
    }
});

router.delete('/:id_notification', async (req, res) => {
    await deleteNotif(req.params.id_notification);
    res.status(204).end();
});

exports.initializeRoutes = () => router;