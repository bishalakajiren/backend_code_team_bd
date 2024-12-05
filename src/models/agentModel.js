const db = require('../config/db');

const Agent = {
  

  async createagent(username, email, phone, password, textpassword) {

    const query = `
      INSERT INTO agents (username, email, phone, password, textpassword)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [username, email, phone, password, textpassword]);

    return result.insertId; 
  },

  async findagentByEmailOrPhone(email, phone) {
    const query = `SELECT * FROM agents WHERE email = ? OR phone = ? LIMIT 1`;
    const [rows] = await db.execute(query, [email, phone]);
    return rows[0]; 
  },

  async findAgentByEmail(email) {
    const query = `SELECT * FROM agents WHERE email = ? LIMIT 1`;
    const [rows] = await db.execute(query, [email]);
    return rows[0];
  },

  async findAgentByPhone(phone) {
    const query = `SELECT * FROM agents WHERE phone = ? LIMIT 1`;
    const [rows] = await db.execute(query, [phone]);
    return rows[0];
  },

  // Find admin by phone
  async findAgentByUsername(phone) {
    const query = `SELECT * FROM agents WHERE username = ? LIMIT 1`;
    const [rows] = await db.execute(query, [phone]);
    return rows[0];
  },

  async getAll() {
    const sql = 'SELECT * FROM agents';
    const [rows] = await db.execute(sql);
    return rows;
  },

  async deleteById(id) {
    const sql = 'DELETE FROM agents WHERE id = ?';
    await db.execute(sql, [id]);
  },
};

module.exports = Agent;
