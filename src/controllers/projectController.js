const ProjectModel = require('../models/projectModel');
const { v4: uuidv4 } = require('uuid');

const ProjectController = {
  getAllprojects: async (req, res) => {
    try {
      const projects = await ProjectModel.getAllProjects();
      res.json({ status: true, message: 'Projects fetched successfully', data: projects });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to fetch projects', error: error.message });
    }
  },

  getprojectById: async (req, res) => {
    try {
      const { id } = req.params;
      const project = await ProjectModel.getProjectById(id);

      if (!project) {
        return res.status(404).json({ status: false, message: 'Project not found' });
      }

      res.json({ status: true, message: 'Project fetched successfully', data: project });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to fetch project', error: error.message });
    }
  },

  createproject: async (req, res) => {
    try {
      const { projectName, clientId } = req.body;

      if (!projectName || !clientId) {
        return res.status(400).json({ status: false, message: 'Project name and client ID are required' });
      }

      const id = uuidv4();
      await ProjectModel.createProject(id, projectName, clientId);

      res.status(201).json({
        status: true,
        message: 'Project created successfully',
        data: { id, projectName, clientId },
      });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to create project', error: error.message });
    }
  },

  updateproject: async (req, res) => {
    try {
      const { id } = req.params;
      const { projectName, clientId } = req.body;

     
      const projectExists = await ProjectModel.getProjectById(id);
      if (!projectExists) {
        return res.status(404).json({ status: false, message: 'Project not found' });
      }

      
      const updatedFields = {};
      if (projectName) updatedFields.projectName = projectName;
      if (clientId) updatedFields.clientId = clientId;

     
      if (Object.keys(updatedFields).length === 0) {
        return res.status(400).json({ status: false, message: 'No valid fields to update' });
      }

      
      await ProjectModel.updateProject(id, updatedFields);

      res.json({
        status: true,
        message: 'Project updated successfully',
        data: { id, ...updatedFields },
      });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to update project', error: error.message });
    }
  },

  deleteproject: async (req, res) => {
    try {
      const { id } = req.params;

      
      const projectExists = await ProjectModel.getProjectById(id);
      if (!projectExists) {
        return res.status(404).json({ status: false, message: 'Project not found' });
      }

     
      await ProjectModel.deleteProject(id);

      res.status(200).json({ status: true, message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to delete project', error: error.message });
    }
  },
};

module.exports = ProjectController;
