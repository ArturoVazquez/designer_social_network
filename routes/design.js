const express = require('express');
const router = express.Router();
const designController = require('../controllers/designController');
const uploadFile = require('../middleware/uploadFile');


router.get('/designForm/:designer_id', designController.showFormCreateDesign);
router.post('/createDesign/:designer_id', uploadFile("designs"), designController.createDesign);
router.get('/designProfile/:id', designController.profile);
router.get('/editDesign/:id', designController.showEditFilm);
router.post('/editDesigns/:id/:designer_id',uploadFile("designs"), designController.editDesign);
router.get('/delTotalDesign/:id/:designer_id', designController.delTotalDesign);
router.get('/allDesigns', designController.allDesigns);
router.get('/designProfileUser/:id', designController.showProfileUser);
router.get('/search', designController.doSearch);

module.exports = router;
