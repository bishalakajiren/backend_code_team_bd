const express = require('express');
const ProjectController = require('../controllers/projectController');

const router = express.Router();

router.get('/getallprojects', ProjectController.getAllprojects);
router.get('/getprojectsbyid/:id', ProjectController.getprojectById);
router.post('/createproject', ProjectController.createproject);
router.patch('/updateproject/:id', ProjectController.updateproject);
router.delete('/deleteproject/:id', ProjectController.deleteproject);

module.exports = router;
