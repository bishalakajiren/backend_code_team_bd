const db = require('../config/db');

const TagModel = {
  getAllTags: async () => {
    const [rows] = await db.query('SELECT * FROM tags');
    return rows;
  },

  getTagById: async (id) => {
    const [rows] = await db.query('SELECT * FROM tags WHERE id = ?', [id]);
    return rows[0];
  },

  createTag: async (tagName) => {
    await db.query('INSERT INTO tags (tagName) VALUES (?)', [tagName]);
  },

//   updateTag: async (id, tagName) => {
//     await db.query('UPDATE tags SET tagName = ? WHERE id = ?', [tagName, id]);
//   },

  updateTag: async (id, updatedFields) => {
    const fields = Object.keys(updatedFields);
  const values = Object.values(updatedFields);

  let setClause = fields.map((field, index) => `${field} = ?`).join(', ');
  
  await db.query(`
    UPDATE tags
    SET ${setClause} 
    WHERE id = ?
  `, [...values, id]);
  },

  deleteTag: async (id) => {

    const [rows] = await db.query('DELETE FROM tags WHERE id = ?', [id]);
    return rows.affectedRows > 0;
    
  },
};

module.exports = TagModel;
