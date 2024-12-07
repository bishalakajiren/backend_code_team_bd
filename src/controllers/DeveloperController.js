const DeveloperModel = require('../models/developerModel');

const DeveloperController = {
  getAlldeveloper: async (req, res) => {
    try {
      const developers = await DeveloperModel.getAllUsers();
      res.json({ status: true, message: 'Developers fetched successfully', data: developers });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to fetch developers', error: error.message });
    }
  },

  getdeveloperById: async (req, res) => {
    try {
      const { id } = req.params;
      const developer = await DeveloperModel.getUserById(id);

      if (!developer) {
        return res.status(404).json({ status: false, message: 'Developer not found' });
      }

      res.json({ status: true, message: 'Developer fetched successfully', data: developer });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to fetch developer', error: error.message });
    }
  },

  createdeveloper: async (req, res) => {
    try {
      const { userName, email, role } = req.body;

      if (!userName || !email || !role) {
        return res.status(400).json({ status: false, message: 'User name, email, and role are required' });
      }

      await DeveloperModel.createUser(userName, email, role);

      res.status(201).json({
        status: true,
        message: 'Developer created successfully',
        data: { userName, email, role },
      });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to create developer', error: error.message });
    }
  },

  updatedeveloper: async (req, res) => {
    try {
      const { id } = req.params;
      const { userName, email, role } = req.body;

    
      const developerExists = await DeveloperModel.getUserById(id);
      if (!developerExists) {
        return res.status(404).json({ status: false, message: 'Developer not found' });
      }

      
      const updatedFields = {};
      if (userName) updatedFields.userName = userName;
      if (email) updatedFields.email = email;
      if (role) updatedFields.role = role;

    
      if (Object.keys(updatedFields).length === 0) {
        return res.status(400).json({ status: false, message: 'No valid fields to update' });
      }

    
      await DeveloperModel.updateUser(id, updatedFields);

      res.json({
        status: true,
        message: 'Developer updated successfully',
        data: { id, ...updatedFields },
      });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to update developer', error: error.message });
    }
  },

  deletedeveloper: async (req, res) => {
    try {
      const { id } = req.params;

      
      const developerExists = await DeveloperModel.getUserById(id);
      if (!developerExists) {
        return res.status(404).json({ status: false, message: 'Developer not found' });
      }

      
      await DeveloperModel.deleteUser(id);

      res.status(200).json({ status: true, message: 'Developer deleted successfully' });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to delete developer', error: error.message });
    }
  },
};

module.exports = DeveloperController;
