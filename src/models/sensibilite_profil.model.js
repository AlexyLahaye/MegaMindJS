const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Sensibilite_profil = sequelize.define(
    'sensibilite_profil',
    {
        id_sensibilite: { primaryKey: true, type: DataTypes.STRING },
        id_profil: { primaryKey: true, type: DataTypes.STRING, allowNull: false  },
        ecriture_sensibilite: { type: DataTypes.STRING, allowNull: true },
        lecture_sensibilite: {type: DataTypes.STRING, allowNull: true},
        mots_sensibilite: {type: DataTypes.STRING, allowNull: true}
    },
    { tableName: 'sensibilite_profil' },
);

module.exports = Sensibilite_profil;