const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const user = sequelize.define(
    'users',
    {
        id_user: { primaryKey: true, type: DataTypes.STRING },
        label_user: { type: DataTypes.STRING, allowNull: false },
        mdp_user: { type: DataTypes.STRING, allowNull: true },
    },
        { tableName: 'users' },
);

module.exports = user;
