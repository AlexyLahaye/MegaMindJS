const Sequelize = require('sequelize');

exports.sequelize = new Sequelize('MegaMind', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
})