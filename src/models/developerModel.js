const db = require('../config/db');

const DeveloperModel = {
  getAllUsers: async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  },

  getUserById: async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  getUserByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  getUserByUserName: async (userName) => {
    const [rows] = await db.query('SELECT * FROM users WHERE userName = ?', [userName]);
    return rows[0];
  },

  createUser: async (userName, email, role) => {
    await db.query('INSERT INTO users (userName, email, role) VALUES (?, ?, ?)', [userName, email, role]);
  },

//   updateUser: async (id, userName, email, role) => {
//     await db.query('UPDATE users SET userName = ?, email = ?, role = ? WHERE id = ?', [userName, email, role, id]);
//   },

updateUser: async (id, updatedFields) => {
    const fields = Object.keys(updatedFields);
  const values = Object.values(updatedFields);

  let setClause = fields.map((field, index) => `${field} = ?`).join(', ');
  
  // Update task query
  await db.query(`
    UPDATE users
    SET ${setClause} 
    WHERE id = ?
  `, [...values, id]);
  },

  deleteUser: async (id) => {

    const [rows] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return rows.affectedRows > 0;
  },
};

module.exports = DeveloperModel;
