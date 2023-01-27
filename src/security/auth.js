const { sign } = require('jsonwebtoken');

exports.generateAuthToken = (id_user, label_user, isAdmin) => {
    const permissions = isAdmin ? ['admin'] : [];

    return sign({ id_user, label_user, permissions }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};
