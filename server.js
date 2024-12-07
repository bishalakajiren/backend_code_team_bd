require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./src/routes/adminRoutes');
const agentRoutes = require('./src/routes/agentRoutes');
const clientRoutes = require('./src/routes/clientRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const tagRoutes = require('./src/routes/tagRoutes');
const developerRoutes = require('./src/routes/developerRoutes');
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


app.use('/api/admin', adminRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/developers', developerRoutes);





const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});