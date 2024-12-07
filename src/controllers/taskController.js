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

      const taskExists = await TaskModel.getTaskbyName(taskName);
      if (taskExists) {
        return res.status(409).json({ status: false, message: 'Task name already exists' });
      }

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
  
      if (taskName) updatedFields.taskName = taskName || taskExists.taskName;
      if (clientId) updatedFields.clientName = clientName || taskExists.clientName;
      if (projectId) updatedFields.projectName = projectName || taskExists.projectName;
      if (taskAssignTo) updatedFields.taskAssignTo = JSON.stringify(taskAssignTo) || JSON.stringify(taskExists.taskAssignTo) ; 
      if (tags) updatedFields.tags = JSON.stringify(tags) || JSON.stringify(taskExists.tags); 
      if (status) updatedFields.status = status || taskExists.status;
      if (priority) updatedFields.priority = priority || taskExists.priority;
      if (date) updatedFields.date = date || taskExists.date;
  

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
  updateTaskStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      // Validate status
      const validStatuses = ['Running', 'Not Started', 'Paused', 'Completed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
          status: false, 
          message: 'Invalid status value' 
        });
      }
  
      // Check if the task exists
      const taskExists = await TaskModel.getTaskById(id);
      if (!taskExists) {
        return res.status(404).json({ 
          status: false, 
          message: 'Task not found' 
        });
      }
  
      // Update the status
      await TaskModel.updateTaskStatus(id, status);
  
      res.status(200).json({
        status: true,
        message: 'Task status updated successfully',
        data: { id, status },
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: 'Failed to update task status',
        error: error.message,
      });
    }
  },
  updateTaskPriority: async (req, res) => {
    try {
      const { id } = req.params;
      const { priority } = req.body;
      console.log(priority);
  
      // Validate status
      const validStatuses = ['Low', 'Mid', 'High'];
      if (!validStatuses.includes(priority)) {
        return res.status(400).json({ 
          status: false, 
          message: 'Invalid priority value' 
        });
      }
  
      // Check if the task exists
      const taskExists = await TaskModel.getTaskById(id);
      if (!taskExists) {
        return res.status(404).json({ 
          status: false, 
          message: 'Task not found' 
        });
      }
  
      // Update the status
      await TaskModel.updateTaskPriority(id, priority);
  
      res.status(200).json({
        status: true,
        message: 'Task priority updated successfully',
        data: { id, priority },
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: 'Failed to update task priority',
        error: error.message,
      });
    }
  },
  updateTaskField: async (req, res) => {
    try {
      const { id } = req.params;
      const { field, value } = req.body;
  
      // Define valid fields and their allowed values
      const validFields = {
        status: ['Running', 'Not Started', 'Paused', 'Completed'],
        priority: ['Low', 'Mid', 'High'],
      };
  
      // Validate the field and its value
      if (!validFields[field] || !validFields[field].includes(value)) {
        return res.status(400).json({
          status: false,
          message: `Invalid field or value. Allowed fields: ${Object.keys(validFields).join(', ')}`,
        });
      }
  
      // Check if the task exists
      const taskExists = await TaskModel.getTaskById(id);
      if (!taskExists) {
        return res.status(404).json({
          status: false,
          message: 'Task not found',
        });
      }
  
      // Update the field dynamically
      await TaskModel.updateTask(id, { [field]: value });
  
      res.status(200).json({
        status: true,
        message: `Task ${field} updated successfully`,
        data: { id, [field]: value },
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: 'Failed to update task field',
        error: error.message,
      });
    }
  },
  getAlltask1: async (req, res) => {
    try {
      const { status, priority } = req.query; // Get filters from query parameters

      // Define valid enums for filtering
      const validStatuses = ['Running', 'Not Started', 'Paused', 'Completed'];
      const validPriorities = ['Low', 'Mid', 'High'];

      // Validate query parameters
      if (status && !validStatuses.includes(status)) {
        return res.status(400).json({
          status: false,
          message: `Invalid status value. Allowed values: ${validStatuses.join(', ')}`,
        });
      }

      if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({
          status: false,
          message: `Invalid priority value. Allowed values: ${validPriorities.join(', ')}`,
        });
      }

      // Fetch all tasks from the model
      let tasks = await TaskModel.getAllTasks();

      // Apply filtering dynamically
      if (status) {
        tasks = tasks.filter((task) => task.status === status);
      }
      if (priority) {
        tasks = tasks.filter((task) => task.priority === priority);
      }

      res.json({
        status: true,
        message: 'Tasks fetched successfully',
        data: tasks,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: 'Failed to fetch tasks',
        error: error.message,
      });
    }
  },
  
  
};

module.exports = TaskController;
