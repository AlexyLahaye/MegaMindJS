const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const like = sequelize.define(
    'like',
    {
        id_like: { primaryKey: true, type: DataTypes.STRING },
        id_contenu_like: { foreignKey: true, type: DataTypes.STRING, allowNull: false  },
        id_profil_like: { foreignKey: true, type: DataTypes.STRING, allowNull: false },
        id_etat_like: { type: DataTypes.INTEGER, allowNull: false }
    },
    { tableName: 'likes' },
);

module.exports = like;