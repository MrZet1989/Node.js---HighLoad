const express = require('express');
const userRoutes = require('./routes/user');
const logger = require('./config/logger');

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  logger.info(`Received a ${req.method} request to ${req.url}`);
  next();
});

app.use('/user', userRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
