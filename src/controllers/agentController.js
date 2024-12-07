const Agent = require('../models/agentModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const agentController = {
  async createagent(req, res) {

    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ status: false, message: 'All fields are required' });
    }
    try {


        const emailexits = await Agent.findAgentByEmail(email);
        if (emailexits) {
            return res.status(409).json({ status: false, message: 'Email already exists' });
        }

        const phoneexits = await Agent.findAgentByPhone(phone);
        if (phoneexits) {
            return res.status(409).json({ status: false, message: 'Phone already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const agentId = await Agent.createagent(
            name,           
            email,           
            phone,           
            hashedPassword,  
            password        
        );

        res.status(200).json({ status: true, message: 'Agent registered successfully', data: { name, email, phone, agentId} });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  async loginAgent(req, res) {
    const { login, password } = req.body; 
  
    try {
      let agent;
  
      // Login by email or phone
      if (login.includes('@')) {
        agent = await Agent.findAgentByEmail(login);
      } else {
        agent = await Agent.findAgentByPhone(login);
        console.log(agent)
      }

      console.log(agent)

      
  
      if (!agent) {
        return res.status(401).json({ status: false, message: 'Invalid credentials' });
      }
  
     
      if (!agent.password) {
        return res.status(500).json({ status: false, message: 'Password not found in database' });
      }
  
      
      const isMatch = await bcrypt.compare(password, agent.password);
      if (!isMatch) {
        return res.status(401).json({ status: false, message: 'Invalid credentials' });
      }

      
      // Generate JWT token
      const token = jwt.sign({ userId: agent.id }, process.env.JWT_SECRET);
      const data = {agent,usertype:'agent' ,tokendata:token} 
  
      res.json({ status: true, message: 'Agent logged in successfully', data});
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },



  async getAllagent(req, res) {
    try {
      const agents = await Agent.getAll();
      res.json(agents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteagentbyid(req, res) {
    try {
      const { id } = req.params;
      await Agent.deleteById(id);
      res.json({ message: 'Agent deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = agentController;
