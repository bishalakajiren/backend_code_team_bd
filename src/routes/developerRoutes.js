const express = require('express');

const DeveloperController = require('../controllers/DeveloperController');

const router = express.Router();

router.get('/getalldeveloper', DeveloperController.getAlldeveloper);
router.get('/getdeveloperbyid/:id', DeveloperController.getdeveloperById);
router.post('/createdeveloper', DeveloperController.createdeveloper);
router.patch('/updatedeveloper/:id', DeveloperController.updatedeveloper);
router.delete('/deletedeveloper/:id', DeveloperController.deletedeveloper);

module.exports = router;
