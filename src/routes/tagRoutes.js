const express = require('express');
const TagController = require('../controllers/tagController');

const router = express.Router();

router.get('/getalltags', TagController.getAlltags);
router.get('/gettagbyid/:id', TagController.gettagById);
router.post('/createtag', TagController.createtag);
router.patch('/updatetag/:id', TagController.updatetag);
router.delete('/deletetag/:id', TagController.deletetag);

module.exports = router;
