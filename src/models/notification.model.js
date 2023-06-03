const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const notification = sequelize.define(
    'notification',
    {
        id_notification: { primaryKey: true, type: DataTypes.STRING },
        id_profil_notifier: { foreignKey: true, type: DataTypes.STRING, allowNull: false },
        id_profil_acteur_noctification: { foreignKey: true, type: DataTypes.STRING, allowNull: false  },
        contenu_notification: { type: DataTypes.STRING, allowNull: false },
        id_type_notification: { type: DataTypes.INTEGER, allowNull: false },
        is_check_notification: { type: DataTypes.BOOLEAN, allowNull: false }

    },
    { tableName: 'notification' },
);

module.exports = notification;