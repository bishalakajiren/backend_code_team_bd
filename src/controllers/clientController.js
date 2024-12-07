const ClientModel = require('../models/clientModel');
const { v4: uuidv4 } = require('uuid');

const ClientController = {
  getallclients: async (req, res) => {
    try {
      const clients = await ClientModel.getAllClients();
      res.json({ status: true, message: 'Clients fetched successfully', data: clients });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to fetch clients', error: error.message });
    }
  },

  getclientById: async (req, res) => {
    try {
      const { id } = req.params;
      const client = await ClientModel.getClientById(id);

      if (!client) {
        return res.status(404).json({ status: false, message: 'Client not found' });
      }

      res.json({ status: true, message: 'Client fetched successfully', data: client });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to fetch client', error: error.message });
    }
  },

  createclient: async (req, res) => {
    try {
      const { clientName } = req.body;

      if (!clientName) {
        return res.status(400).json({ status: false, message: 'Client name is required' });
      }

      const id = uuidv4();
      await ClientModel.createClient(id, clientName);

      res.status(201).json({
        status: true,
        message: 'Client created successfully',
        data: { id, clientName },
      });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to create client', error: error.message });
    }
  },

  updateclient: async (req, res) => {
    try {
      const { id } = req.params;
      const { clientName } = req.body;
      console.log(id, clientName);

      // Check if the client exists
      const clientExists = await ClientModel.getClientById(id);
      if (!clientExists) {
        return res.status(404).json({ status: false, message: 'Client not found' });
      }

      
      const updatedFields = {};
      if (clientName) updatedFields.clientName = clientName || clientExists.clientName;



     
      if (Object.keys(updatedFields).length === 0) {
        return res.status(400).json({ status: false, message: 'No valid fields to update' });
      }

      console.log(updatedFields);

      
      await ClientModel.updateClient(id, updatedFields);

      res.json({
        status: true,
        message: 'Client updated successfully',
        data: { id, ...updatedFields },
      });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to update client', error: error.message });
    }
  },

  deleteclient: async (req, res) => {
    try {
      const { id } = req.params;

     
      const clientExists = await ClientModel.getClientById(id);
      if (!clientExists) {
        return res.status(404).json({ status: false, message: 'Client not found' });
      }

     
      await ClientModel.deleteClient(id);

      res.status(200).json({ status: true, message: 'Client deleted successfully' });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to delete client', error: error.message });
    }
  },
};

module.exports = ClientController;
