const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-reprository');
const { validateBody } = require('./validation/route.validator');
const { body } = require('express-validator');

router.get('/', async (req, res) => {
    res.send(await userRepository.getUsers());
});

router.get('/:label_user', async (req, res) => {
    const foundUser = await userRepository.getUserByLabel(req.params.label_user);

    if (foundUser) {
        res.status(200).send([foundUser]);
        return;
    }
    if (!foundUser) {
        const foundUser = null;
        res.status(500).send('User not found');
        return ;
    }
    res.send(foundUser);
});
router.post(
    '/',
    body('label_user').notEmpty(),
    body('mdp_user').notEmpty().isLength({ min: 5 }),
    async (req, res) => {
        const { label_user, mdp_user } = req.body;

        const user = await userRepository.getUserByLabel(label_user);

        if (!user){
            await userRepository.createUser(req.body);
            res.status(201).end();
        }
        else {
            res.status(412).send("Utilisateur deja use")
        }
    },
);


router.put('/:id_user', async (req, res) => {
    await userRepository.updateUser(req.params.id, req.body).catch((err) => res.status(500).send(err.message));
    res.status(204).end();
});

router.delete('/:id_user', async (req, res) => {
    await userRepository.deleteUser(req.params.id);
    res.status(204).end();
});

exports.initializeRoutes = () => router;