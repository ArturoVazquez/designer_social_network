const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController.js')


//localhost:4000/
router.get('/', indexController.showHome);

//localhost:4000/about
router.get('/about', indexController.showAbout);

module.exports = router;
