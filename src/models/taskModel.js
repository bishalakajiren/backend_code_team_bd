const db = require('../config/db');

const TaskModel = {
  getAllTasks: async () => {
    const [rows] = await db.query(`
    SELECT 
    t.id AS taskId,
    t.taskName,
    c.clientName AS clientName,
    p.projectName AS projectName,
    (
        SELECT GROUP_CONCAT(u.userName)
        FROM users u
        WHERE JSON_CONTAINS(t.taskAssignTo, CAST(u.id AS CHAR))
    ) AS assignedUsers,
    (
        SELECT GROUP_CONCAT(tag.tagName)
        FROM tags tag
        WHERE JSON_CONTAINS(t.tags, CAST(tag.id AS CHAR))
    ) AS tagNames,
    t.status,
    t.priority,
    t.date
FROM 
    tasks t
LEFT JOIN 
    project p ON t.projectId = p.id
LEFT JOIN 
    client c ON t.clientId = c.id;
    `);
    return rows;
  },

  getTaskById: async (id) => {
    const [rows] = await db.query(`
      SELECT 
    t.id AS taskId,
    t.taskName,
    c.clientName AS clientName,
    p.projectName AS projectName,
    (
        SELECT GROUP_CONCAT(u.userName)
        FROM users u
        WHERE JSON_CONTAINS(t.taskAssignTo, CAST(u.id AS CHAR))
    ) AS assignedUsers,
    (
        SELECT GROUP_CONCAT(tag.tagName)
        FROM tags tag
        WHERE JSON_CONTAINS(t.tags, CAST(tag.id AS CHAR))
    ) AS tagNames,
    t.status,
    t.priority,
    t.date
FROM 
    tasks t
LEFT JOIN 
    project p ON t.projectId = p.id
LEFT JOIN 
    client c ON t.clientId = c.id
WHERE
    t.id = ?; 
    `, [id]);
    return rows[0];
  },

getTaskbyName : async (taskName) => {
  const [rows] = await db.query('SELECT * FROM tasks WHERE taskName = ?', [taskName]);
  return rows[0];
},

  createTask: async (id, taskName, clientId, projectId,  taskAssignTo, tags, status, priority, date) => {
    await db.query(`
      INSERT INTO tasks (id, taskName, clientId, projectId,  taskAssignTo, tags, status, priority, date) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [id, taskName, clientId, projectId, JSON.stringify(taskAssignTo), JSON.stringify(tags), status, priority, date]);
  },

  updateTask: async (id, updatedFields) => {
    const fields = Object.keys(updatedFields);
  const values = Object.values(updatedFields);

  let setClause = fields.map((field, index) => `${field} = ?`).join(', ');
  
  // Update task query
  await db.query(`
    UPDATE tasks 
    SET ${setClause} 
    WHERE id = ?
  `, [...values, id]);
  },

  deleteTask: async (id) => {
    const [rows] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
    return rows.affectedRows > 0;
  },
  updateTaskStatus: async (id, status) => {
    await db.query(
      `UPDATE tasks SET status = ? WHERE id = ?`,
      [status, id]
    );
  },
  updateTaskPriority: async (id, status) => {
    await db.query(
      `UPDATE tasks SET priority = ? WHERE id = ?`,
      [status, id]
    );
  },
  
};

module.exports = TaskModel;
