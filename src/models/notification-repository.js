const Notification = require("./notification.model");
const uuid = require("uuid");

exports.getAllNotifFromIdProfil = async (id_profil) => {
    return await Notification.findAll({where : {id_notification}});
}

exports.getNotifById = async (id_post) => {
    return await Notification.findOne({where : {id_notification}});
}

exports.createNotif = async (body) => {
    const Notif = body
    Notif.id_notification = uuid.v4();
    await Notification.create(Notif);
};

exports.deleteNotif = async (id_notification) => {
    await Notification.destroy({ where: { id_notification } });
};