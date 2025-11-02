// src/routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// GET all recipes (Index page)
// -> /recipes
router.get('/', recipeController.getAllRecipes);

// GET the form to create a new recipe
// -> /recipes/new
router.get('/new', recipeController.showNewForm);

// POST a new recipe (handles the form submission)
// -> /recipes
router.post('/', recipeController.createRecipe);

// GET the form to edit a recipe
// -> /recipes/:id/edit
router.get('/:id/edit', recipeController.showEditForm);

// POST an update to a recipe (handles edit form submission)
// We will use method-override to make this a PUT request
// -> /recipes/:id
router.post('/:id/update', recipeController.updateRecipe); // Simplified for this form

// POST a delete request for a recipe
// We will use method-override to make this a DELETE request
// -> /recipes/:id
router.post('/:id/delete', recipeController.deleteRecipe); // Simplified for this form


module.exports = router;