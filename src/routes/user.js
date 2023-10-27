// src/routes/user.js
const express = require('express');
const UserService = require('../services/userService');
const logger = require('../config/logger');
const router = express.Router();

router.put('/update-balance', async (req, res) => {
  const { userId, amount } = req.body;
  logger.info(`Attempting to update balance for user: ${userId} with amount: ${amount}`);

  try {
    const result = await UserService.updateBalance(userId, amount);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
