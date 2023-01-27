const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-reprository');
const { passwordsAreEqual } = require('../security/crypto');
const { generateAuthToken } = require('../security/auth');
const { body } = require('express-validator');

const { validateBody } = require('./validation/route.validator');

router.post('/login', body('label_user').notEmpty(), body('mdp_user').notEmpty(), async (req, res) => {

    const { label_user, mdp_user } = req.body;

    const user = await userRepository.getUserByLabel(label_user);
    if (!user || !(user && passwordsAreEqual(mdp_user, user.mdp_user))) {
        res.status(401).send('Unauthorized');

        return;
    }

    const token = generateAuthToken(user.id_user, user.label_user);

    res.status(200).json({ token });
});

exports.initializeRoutes = () => router;