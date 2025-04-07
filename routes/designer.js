const express = require('express');
const router = express.Router();
const designerController = require('../controllers/designerController.js')


//localhost:4000/designer/list
router.get('/list', designerController.showDesignerList);
router.get('/registerForm', designerController.showRegisterForm);
router.post('/register', designerController.register);
router.get('/loginForm', designerController.showLogin);
router.post('/login', designerController.login);
router.get('/designerProfile/:id', designerController.profile);
router.get('/userViewDesigner/:id', designerController.showUserProfile);


module.exports = router;
