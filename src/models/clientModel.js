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

  createClient: async (id, clientName) => {
    await db.query('INSERT INTO client (id, clientName) VALUES (?, ?)', [id, clientName]);
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
