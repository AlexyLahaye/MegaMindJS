const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Sensibilite = sequelize.define(
    'sensibilite',
    {
        id_sensibilite: { primaryKey: true, type: DataTypes.STRING },
        contenu_sensibilite: { type: DataTypes.STRING, allowNull: false  }
    },
    { tableName: 'sensibilites' },
);

module.exports = Sensibilite;