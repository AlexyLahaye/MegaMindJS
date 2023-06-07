const Sequelize = require('sequelize');

exports.sequelize = new Sequelize('postgres://postgres:Test123@localhost:5432/MegaMind')