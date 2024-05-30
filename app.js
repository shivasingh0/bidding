const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const bidRoutes = require('./routes/bidRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());

// Route setup
app.use('/auth', authRoutes);
app.use('/items', itemRoutes);
app.use('/bids', bidRoutes);
app.use('/notifications', notificationRoutes);

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

module.exports = app;
