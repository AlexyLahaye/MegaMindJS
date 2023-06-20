const Notification = require("./notification.model");
const uuid = require("uuid");

exports.getAllNotifFromIdProfil = async (id_profil_notifier) => {
    return await Notification.findAll({where : {id_profil_notifier}});
}

exports.getNotifById = async (id_notification) => {
    return await Notification.findOne({where : {id_notification}});
}

exports.createNotif = async (body) => {
    const Notif = body
    Notif.id_notification = uuid.v4();
    await Notification.create(Notif);
};

exports.updateNotif = async (id_notification, updatedFields) => {
    try {
        // Récupérer la notification existante à mettre à jour
        const existingNotif = await Notification.findOne({ id_notification });

        if (!existingNotif) {
            throw new Error("La notification spécifiée n'existe pas.");
        }

        // Mettre à jour les champs de la notification existante avec les nouvelles valeurs
        Object.assign(existingNotif, updatedFields);

        // Sauvegarder les modifications
        await existingNotif.save();
    } catch (error) {
        console.error(error);
        throw new Error("Une erreur est survenue lors de la mise à jour de la notification.");
    }
};

exports.deleteNotif = async (id_notification) => {
    await Notification.destroy({ where: { id_notification } });
};