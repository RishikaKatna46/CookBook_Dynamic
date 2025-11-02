const express = require('express');
const router = express.Router();
const { searchRecipes, getStats } = require('../controllers/apiController');

router.get('/search', searchRecipes);
router.get('/stats', getStats);

module.exports = router;
