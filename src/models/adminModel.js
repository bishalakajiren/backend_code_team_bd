const db = require('../config/db');

const Admin = {
    async createAdmin(username, email, phone, password, textpassword) {

        const query = `
          INSERT INTO admins (username, email, phone, password, textpassword)
          VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [username, email, phone, password, textpassword]);
    
        return result.insertId; 
      },

  async findAdminByEmailOrPhone(email, phone) {
    const query = `SELECT * FROM admins WHERE email = ? OR phone = ? LIMIT 1`;
    const [rows] = await db.execute(query, [email, phone]);
    return rows[0]; 
  },

  async findAdminByEmail(email) {
    const query = `SELECT * FROM admins WHERE email = ? LIMIT 1`;
    const [rows] = await db.execute(query, [email]);
    return rows[0];
  },

  // Find admin by phone
  async findAdminByUsername(phone) {
    const query = `SELECT * FROM admins WHERE username = ? LIMIT 1`;
    const [rows] = await db.execute(query, [phone]);
    return rows[0];
  },

  async getAll() {
    const sql = 'SELECT * FROM admins';
    const [rows] = await db.execute(sql);
    return rows;
  },

  async deleteById(id) {
    const sql = 'DELETE FROM admins WHERE id = ?';
    await db.execute(sql, [id]);
  },
};

module.exports = Admin;
