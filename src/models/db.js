const Sequelize = require('sequelize');

exports.sequelize = new Sequelize('MegaMind', 'postgres', '5sb3j4gA', {
    host: 'localhost',
    dialect: 'postgres',
})