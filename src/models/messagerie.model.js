const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const messagerie = sequelize.define(
    'messagerie',
    {
        id_mess: { primaryKey: true, type: DataTypes.STRING },
        id_profil_recoit_mess: { foreignKey: true, type: DataTypes.STRING },
        id_profil_envoie_mess: { foreignKey: true, type: DataTypes.STRING, allowNull: false  },
        contenu_mess: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: 'messagerie' },
);

module.exports = messagerie;