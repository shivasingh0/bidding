const Bid = require('../models/bidModel');
const Item = require('../models/itemModel');
const Notification = require('../models/notificationModel');
const io = require('socket.io')(3000);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('bid', async (data) => {
    try {
      const { itemId, userId, bidAmount } = data;
      const item = await Item.findByPk(itemId);
      if (!item || item.end_time < new Date()) throw new Error('Auction ended or item not found');
      if (bidAmount <= item.current_price) throw new Error('Bid amount must be higher than current price');

      const bid = await Bid.create({ item_id: itemId, user_id: userId, bid_amount: bidAmount });
      item.current_price = bidAmount;
      await item.save();

      io.emit('update', { itemId, bidAmount });

      const notification = await Notification.create({ user_id: userId, message: `Your bid of ${bidAmount} is placed` });
      io.emit('notify', { userId, message: notification.message });
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
