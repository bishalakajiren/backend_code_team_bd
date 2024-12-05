const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
require('dotenv').config();

const adminController = {

    
  async registerAdmin(req, res) {
    const { name, email, password, phone } = req.body;
    
    if (!name || !email || !password || !phone) {
        return res.status(400).json({ status: false, message: 'All fields are required' });
    }

    try {
        // Check for duplicate email or phone
        const adminExists = await Admin.findAdminByEmailOrPhone(email, phone);
        if (adminExists) {
            return res.status(409).json({ status: false, message: 'Email or phone already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const adminId = await Admin.createAdmin(
            name,           
            email,           
            phone,           
            hashedPassword,  
            password        
        );

        res.status(200).json({ status: true, message: 'Admin registered successfully', data: { name, email, phone, adminId} });
    } catch (error) {
        res.status(500).json({status:false, message: error.message});
    }
},

async loginAdmin(req, res) {
    const { login, password } = req.body; 
  
    try {
      let admin;
  
      // Login by email or phone
      if (login.includes('@')) {
        admin = await Admin.findAdminByEmail(login);
      } else {
        admin = await Admin.findAdminByUsername(login);
        console.log(admin)
      }

      console.log(admin)

      
  
      if (!admin) {
        return res.status(401).json({ status: false, message: 'Invalid credentials' });
      }
  
     
      if (!admin.password) {
        return res.status(500).json({ status: false, message: 'Password not found in database' });
      }
  
      
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ status: false, message: 'Invalid credentials' });
      }

      
      // Generate JWT token
      const token = jwt.sign({ userId: admin.id }, process.env.JWT_SECRET);
      const data = {admin,usertype:'admin' ,tokendata:token} 
  
      res.json({ status: true, message: 'Admin logged in successfully', data});
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

};

module.exports = adminController;
