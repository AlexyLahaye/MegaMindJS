const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const userRoutes = require('../controllers/user.route');
const authRoutes = require('../controllers/auth.route');
const profilRoutes = require('../controllers/profil.route');
const {sequelize} = require("../models/db");
const User = require("../models/user.model");
const Profil = require("../models/profil.model");



class WebServer {
    app = undefined;
    port = 3000;
    server = undefined;

    constructor() {
        this.app = express();
        User.hasMany(Profil, { foreignKey : "id_user"});
        Profil.belongsTo(User, { foreignKey: 'id_user'})
        sequelize.sync();
        initializeConfigMiddlewares(this.app);
        this._initializeRoutes();
        initializeErrorMiddlwares(this.app);
    }

    start() {
        this.server = this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }

    stop() {
        this.server.close();
    }

    _initializeRoutes() {
        this.app.use('/users', userRoutes.initializeRoutes());
        this.app.use('/auth', authRoutes.initializeRoutes());
        this.app.use('/profil', profilRoutes.initializeRoutes());
    }
}

module.exports = WebServer;