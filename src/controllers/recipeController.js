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
      const { title, category, rating } = req.body;
      await addRecipe({ title, category, rating });
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
      const { title, category, rating } = req.body;
      await updateRecipe(req.params.id, { title, category, rating });
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
