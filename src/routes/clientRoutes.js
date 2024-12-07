const express = require('express');
const ClientController = require('../controllers/clientController');

const router = express.Router();

router.get('/getallclients', ClientController.getallclients);
router.post('/getbyclientid/:id', ClientController.getclientById);
router.post('/createclient', ClientController.createclient);
router.patch('/updateclient/:id', ClientController.updateclient);
router.delete('/deleteclient/:id', ClientController.deleteclient);

module.exports = router;
