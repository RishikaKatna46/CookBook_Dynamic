// src/controllers/recipeController.js
const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient');

// Display all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.render('recipes/index', { recipes: recipes, title: 'All Recipes' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Show the form to create a new recipe
exports.showNewForm = (req, res) => {
  res.render('recipes/new', { title: 'New Recipe' });
};

// Handle the creation of a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const { name, instructions } = req.body;
    // Ingredients are submitted as a single comma-separated string
    const ingredients = req.body.ingredients.split(','); 
    
    await Recipe.create(name, instructions, ingredients);
    res.redirect('/recipes'); // Redirect to the list of all recipes
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Show the form to edit an existing recipe
exports.showEditForm = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      // Join ingredients back into a comma-separated string for the form
      recipe.ingredientsString = recipe.ingredients.map(ing => ing.name).join(', ');
      res.render('recipes/edit', { recipe: recipe, title: 'Edit Recipe' });
    } else {
      res.status(404).send('Recipe not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Handle the update of an existing recipe
// Note: This is a simplified update. A full version would also update ingredients.
exports.updateRecipe = async (req, res) => {
  try {
    const { name, instructions } = req.body;
    await Recipe.update(req.params.id, name, instructions);
    // You would also add logic here to update ingredients if needed
    res.redirect('/recipes');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Handle deleting a recipe
exports.deleteRecipe = async (req, res) => {
  try {
    await Recipe.delete(req.params.id);
    res.redirect('/recipes');
  } catch (err) {
    res.status(500).send(err.message);
  }
};