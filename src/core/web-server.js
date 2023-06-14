const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const userRoutes = require('../controllers/user.route');
const authRoutes = require('../controllers/auth.route');
const profilRoutes = require('../controllers/profil.route');
const comRoutes = require('../controllers/commentaire.route');
const postRoutes = require('../controllers/post.route');
const followRoutes = require('../controllers/follow.route');
const likeRoutes = require('../controllers/like.route');
const sensibiliteRoutes = require('../controllers/sensibilite.route');
const sensibiliteProfilRoutes = require('../controllers/sensibilite_profil.route');
const messagerieRoutes = require('../controllers/messagerie.route')
const notificationRoutes = require('../controllers/notification.route')
const {sequelize} = require("../models/db");
const User = require("../models/user.model");
const Profil = require("../models/profil.model");
const Post = require("../models/post.model")
const Sensibilite_profil = require("../models/sensibilite_profil.model")
const Sensibilite = require("../models/sensibilite.model")



class WebServer {
    app = undefined;
    port = process.env.PORT;
    server = undefined;

    constructor() {
        this.app = express();
        User.hasMany(Profil, { foreignKey : "id_user"});
        Profil.belongsTo(User, { foreignKey: 'id_user'});
        Profil.hasMany(Post, {foreignKey: "id_profil"})
        Post.belongsTo(Profil, {foreignKey: "id_profil"});
        Sensibilite_profil.belongsTo(Profil, {foreignKey : "id_profil"})
        sequelize.sync()
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
        this.app.use('/post', postRoutes.initializeRoutes());
        this.app.use('/commentaire', comRoutes.initializeRoutes());
        this.app.use('/follow', followRoutes.initializeRoutes());
        this.app.use('/like', likeRoutes.initializeRoutes());
        this.app.use('/sensibilite', sensibiliteRoutes.initializeRoutes());
        this.app.use('/sensibilite_profil', sensibiliteProfilRoutes.initializeRoutes());
        this.app.use('/messagerie', messagerieRoutes.initializeRoutes());
        this.app.use('/notification', notificationRoutes.initializeRoutes());
    }
}

module.exports = WebServer;