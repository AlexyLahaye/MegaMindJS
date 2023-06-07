const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const profil = sequelize.define(
    'profils',
    {
        id_profil: { primaryKey: true, type: DataTypes.STRING },
        id_user: { foreignKey: true, type: DataTypes.STRING, allowNull: false  },
        pseudo_profil: { type: DataTypes.STRING, allowNull: false },
        avatar_profil: {type: DataTypes.TEXT, allowNull: true},
        mdp_profil: { type: DataTypes.STRING, allowNull: true },
        isadmin_profil: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    { tableName: 'profils' },
);

module.exports = profil;
