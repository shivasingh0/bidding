const Notification = require('../models/notificationModel');

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({ where: { user_id: req.user.id } });
    res.send(notifications);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const markRead = async (req, res) => {
  try {
    const { notificationIds } = req.body;
    await Notification.update({ is_read: true }, { where: { id: notificationIds, user_id: req.user.id } });
    res.send({ success: true });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { getNotifications, markRead };
