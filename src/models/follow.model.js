const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const follow = sequelize.define(
    'follow',
    {
        id_profil: { primaryKey: true, type: DataTypes.STRING },
        id_profil_suivi: { primaryKey: true, type: DataTypes.STRING, allowNull: false  },
    },
    { tableName: 'follow' },
);

module.exports = follow;