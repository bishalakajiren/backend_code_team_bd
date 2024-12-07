const express = require('express');
const TaskController = require('../controllers/taskController');

const router = express.Router();

router.get('/getalltask', TaskController.getAlltask);
router.get('/gettaskbyid/:id', TaskController.gettaskById);
router.post('/createtask', TaskController.createtask);
router.patch('/updatetask/:id', TaskController.updatetask);
router.delete('/deletetask/:id', TaskController.deletetask);

module.exports = router;
