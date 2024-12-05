require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./src/routes/adminRoutes');
const agentRoutes = require('./src/routes/agentRoutes');
const cors = require('cors');
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public/profileImages"));
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use((err, req, res, next) => {
    console.log(req.body);
    console.error(err.stack);
    res.status(500).send({ message: 'Internal Server Error' });
  });

app.get('/', (req, res) => {
  res.send('Welcome to the TEAM_BD API!');
});

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/agent', agentRoutes);





const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});