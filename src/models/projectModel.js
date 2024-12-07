const db = require('../config/db');

const ProjectModel = {
  getAllProjects: async () => {
    const [rows] = await db.query('SELECT * FROM project');
    return rows;
  },

  getProjectById: async (id) => {
    const [rows] = await db.query('SELECT * FROM project WHERE id = ?', [id]);
    return rows[0];
  },

  createProject: async (id, projectName, clientId) => {
    await db.query('INSERT INTO project (id, projectName, clientId) VALUES (?, ?, ?)', [id, projectName, clientId]);
  },

  // updateProject: async (id, projectName, clientId) => {
  //   await db.query('UPDATE project SET projectName = ?, clientId = ? WHERE id = ?', [projectName, clientId, id]);
  // },

  updateProject: async (id, updatedFields) => {
    const fields = Object.keys(updatedFields);
  const values = Object.values(updatedFields);

  let setClause = fields.map((field, index) => `${field} = ?`).join(', ');
  
  // Update task query
  await db.query(`
    UPDATE project
    SET ${setClause} 
    WHERE id = ?
  `, [...values, id]);
  },

  deleteProject: async (id) => {
    const [rows] = await db.query('DELETE FROM project WHERE id = ?', [id]);
    return rows.affectedRows > 0;
  },
};

module.exports = ProjectModel;
