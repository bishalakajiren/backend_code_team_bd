const express = require('express');
const agentController = require('../controllers/agentController');

const router = express.Router();

router.post('/createagent', agentController.createagent);
router.get('/getallagent', agentController.getAllagent);
router.delete('/deleteagentbyid/:id', agentController.deleteagentbyid);

router.post('/loginagent', agentController.loginAgent);

module.exports = router;
