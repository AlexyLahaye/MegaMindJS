const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const commentaire = sequelize.define(
    'commentaire',
    {
        id_com: { primaryKey: true, type: DataTypes.STRING },
        id_post_com: {foreignKey: true, type: DataTypes.STRING, allowNull: false },
        id_profil_com: { foreignKey: true, type: DataTypes.STRING, allowNull: false  },
        contenu_com: { type: DataTypes.STRING, allowNull: false },
        sensibilite_com: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: 'commentaire' },
);

module.exports = commentaire;