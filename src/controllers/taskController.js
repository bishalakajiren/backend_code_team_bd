const TaskModel = require('../models/taskModel');
const { v4: uuidv4 } = require('uuid');

const TaskController = {
  getAlltask: async (req, res) => {
    try {
      const tasks = await TaskModel.getAllTasks();
      res.json({ status: true, message: 'Tasks fetched successfully', data: tasks });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to fetch tasks', error: error.message });
    }
  },

  gettaskById: async (req, res) => {
    try {
      const { id } = req.params;
      const task = await TaskModel.getTaskById(id);

      if (!task) {
        return res.status(404).json({ status: false, message: 'Task not found' });
      }

      res.json({ status: true, message: 'Task fetched successfully', data: task });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to fetch task', error: error.message });
    }
  },

  createtask: async (req, res) => {
    try {
      const { taskName, clientId, projectId,  taskAssignTo, tags, status, priority, date } = req.body;
      const id = uuidv4();

      await TaskModel.createTask(id, taskName, clientId, projectId,  taskAssignTo, tags, status, priority, date);

      res.status(201).json({
        status: true,
        message: 'Task created successfully',
        data: { id, taskName, clientId, projectId, taskAssignTo, tags, status, priority, date },
      });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to create task', error: error.message });
    }
  },

  updatetask: async (req, res) => {
    try {
      const { id } = req.params;
      const { taskName, clientId, projectId,  taskAssignTo, tags, status, priority, date } = req.body;
  
      
      const taskExists = await TaskModel.getTaskById(id);
      if (!taskExists) {
        return res.status(404).json({ status: false, message: 'Task not found' });
      }
  
     
      const updatedFields = {};
  
      if (taskName) updatedFields.taskName = taskName;
      if (clientId) updatedFields.clientName = clientName;
      if (projectId) updatedFields.projectName = projectName;
      if (taskAssignTo) updatedFields.taskAssignTo = JSON.stringify(taskAssignTo); 
      if (tags) updatedFields.tags = JSON.stringify(tags); 
      if (status) updatedFields.status = status;
      if (priority) updatedFields.priority = priority;
      if (date) updatedFields.date = date;
  

      if (Object.keys(updatedFields).length === 0) {
        return res.status(400).json({ status: false, message: 'No valid fields to update' });
      }
  
      
      await TaskModel.updateTask(id, updatedFields);
  
      res.json({
        status: true,
        message: 'Task updated successfully',
        data: { id, ...updatedFields },
      });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to update task', error: error.message });
    }
  },
  

  deletetask: async (req, res) => {
    try {
      const { id } = req.params;

      const taskExists = await TaskModel.getTaskById(id);
      if (!taskExists) {
        return res.status(404).json({ status: false, message: 'Task not found' });
      }

      await TaskModel.deleteTask(id);
      res.status(200).json({ status: true, message: 'Task deleted successfully!' });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to delete task', error: error.message });
    }
  },
};

module.exports = TaskController;
