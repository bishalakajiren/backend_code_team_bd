const db = require('../config/db');

const ClientModel = {
  getAllClients: async () => {
    const [rows] = await db.query('SELECT * FROM client');
    return rows;
  },

  getClientById: async (id) => {
    const [rows] = await db.query('SELECT * FROM client WHERE id = ?', [id]);
    return rows[0];
  },

  createClient: async (id, clientName, email, mobile, address) => {
    await db.query('INSERT INTO client (id, clientName, email,mobile,address) VALUES (?, ?, ?, ?, ?)', [id, clientName, email, mobile, address]);
  },

  getclientbyname : async (clientName) => {
    const [rows] = await db.query('SELECT * FROM client WHERE clientName = ?', [clientName]);
    return rows[0];
  },
  getclientBymobile: async (mobile) => {
    const [rows] = await db.query('SELECT * FROM client WHERE mobile = ?', [mobile]);
    return rows[0];
  },
  getclientByemail: async (email) => {
    const [rows] = await db.query('SELECT * FROM client WHERE email = ?', [email]);
    return rows[0];
  },
 

//   updateClient: async (id, clientName) => {
//     await db.query('UPDATE client SET clientName = ? WHERE id = ?', [clientName, id]);
//   },

  updateClient: async (id, updatedFields) => {
    const fields = Object.keys(updatedFields);
  const values = Object.values(updatedFields);

  let setClause = fields.map((field, index) => `${field} = ?`).join(', ');
  
  // Update task query
  await db.query(`
    UPDATE client 
    SET ${setClause} 
    WHERE id = ?
  `, [...values, id]);
  },

  deleteClient: async (id) => {
    const [rows] = await db.query('DELETE FROM client WHERE id = ?', [id]);
    return rows.affectedRows > 0;
  },
};

module.exports = ClientModel;
