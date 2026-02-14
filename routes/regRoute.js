const regController = require('../controllers/registerController');
const express = require('express');
const router = express.Router();

router.post('/signup', regController);

module.exports = router;