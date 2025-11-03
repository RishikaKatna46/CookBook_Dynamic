const express = require('express');
const router = express.Router();
const { searchRecipes, getRecipeDetails, getStats } = require('../controllers/apiController');

router.get('/search', searchRecipes);
router.get('/recipe/:id', getRecipeDetails);
router.get('/stats', getStats);

module.exports = router;
