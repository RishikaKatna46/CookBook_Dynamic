// src/controllers/recipeController.js
import { getAllRecipes, getRecipeById, addRecipe, updateRecipe,
  deleteRecipe } from "../models/Recipe.js";
  import { Ingredient } from "../models/Ingredient.js";

  /**
   * 🔹 Show all recipes
   */
  export const listRecipes = async (req, res) => {
    try {
      const recipes = await getAllRecipes();
      res.render("recipes/index", { title: "My Recipes", recipes });
    } catch (err) {
      console.error("Error listing recipes:", err);
      res.status(500).send("Server error while loading recipes.");
    }
  };

  /**
   * 🔹 Show form for creating a new recipe
   */
  export const newRecipeForm = (req, res) => {
    res.render("recipes/new", { title: "Add New Recipe" });
  };

  /**
   * 🔹 Create a new recipe
   */
  export const createRecipe = async (req, res) => {
    try {
      const { name, instructions, ingredients, category, rating } = req.body;

      // Add recipe (name is mapped to title in database)
      const result = await addRecipe({
        title: name,
        instructions,
        category,
        rating
      });

      // Parse and save ingredients if provided
      if (ingredients && ingredients.trim()) {
        const ingredientsList = ingredients.split(',').map(i => i.trim()).filter(i => i);
        for (const ingredient of ingredientsList) {
          await Ingredient.create(ingredient, result.lastID);
        }
      }

      res.redirect("/recipes?created=true");
    } catch (err) {
      console.error("Error creating recipe:", err);
      res.status(500).send("Failed to create recipe.");
    }
  };

  /**
   * 🔹 Edit recipe form
   */
  export const editRecipeForm = async (req, res) => {
    try {
      const recipe = await getRecipeById(req.params.id);
      const ingredients = await Ingredient.findByRecipeId(req.params.id);

      // Join ingredients as comma-separated string
      recipe.ingredientsString = ingredients.map(ing => ing.name).join(', ');

      res.render("recipes/edit", { title: "Edit Recipe", recipe });
    } catch (err) {
      console.error("Error loading edit form:", err);
      res.status(500).send("Failed to load edit form.");
    }
  };

  /**
   * 🔹 Update recipe
   */
  export const updateRecipeController = async (req, res) => {
    try {
      const { name, instructions, ingredients, category, rating } = req.body;

      // Update recipe (name is mapped to title in database)
      await updateRecipe(req.params.id, {
        title: name,
        instructions,
        category,
        rating
      });

      // Delete old ingredients and add new ones
      await Ingredient.deleteByRecipeId(req.params.id);
      if (ingredients && ingredients.trim()) {
        const ingredientsList = ingredients.split(',').map(i => i.trim()).filter(i => i);
        for (const ingredient of ingredientsList) {
          await Ingredient.create(ingredient, req.params.id);
        }
      }

      res.redirect("/recipes?updated=true");
    } catch (err) {
      console.error("Error updating recipe:", err);
      res.status(500).send("Failed to update recipe.");
    }
  };

  /**
   * 🔹 Delete recipe
   */
  export const deleteRecipeController = async (req, res) => {
    try {
      await deleteRecipe(req.params.id);
      res.redirect("/recipes?deleted=true");
    } catch (err) {
      console.error("Error deleting recipe:", err);
      res.status(500).send("Failed to delete recipe.");
    }
  };

  /**
   * 🔹 View recipe details + ingredients
   */
  export const showRecipeDetails = async (req, res) => {
    try {
      const recipe = await getRecipeById(req.params.id);
      const ingredients = await Ingredient.findByRecipeId(req.params.id);
      res.render("recipes/show", { title: recipe.title, recipe, ingredients
  });
    } catch (err) {
      console.error("Error showing recipe details:", err);
      res.status(500).send("Failed to load recipe details.");
    }
  };
