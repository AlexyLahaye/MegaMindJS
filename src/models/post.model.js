const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const post = sequelize.define(
    'posts',
    {
        id_post: { primaryKey: true, type: DataTypes.STRING },
        id_profil: { foreignKey: true, type: DataTypes.STRING, allowNull: false  },
        contenu_post: { type: DataTypes.STRING, allowNull: false },
        sensibilite_post: { type: DataTypes.STRING, allowNull: false }
    },
    { tableName: 'posts' },
);

module.exports = post;
