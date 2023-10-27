const pool = require('../config/db');
const logger = require('../config/logger');

class UserService {
  static async updateBalance(userId, amount) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const { rows } = await client.query('SELECT balance FROM users WHERE id = $1 FOR UPDATE', [userId]);
      const currentBalance = rows[0].balance;
      logger.info(`Current balance for user ${userId}: ${currentBalance}`);

      if (currentBalance - amount < 0) {
        throw new Error('Insufficient balance');
      }

      await client.query('UPDATE users SET balance = balance - $1 WHERE id = $2', [amount, userId]);
      logger.info(`Balance for user ${userId} successfully updated.`);

      await client.query('COMMIT');
      return 'Balance updated successfully';
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error(`Error updating balance for user ${userId}: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = UserService;
