// src/routes/recipeRoutes.js
import express from "express";
import {
  listRecipes,
  newRecipeForm,
  createRecipe,
  editRecipeForm,
  updateRecipeController,
  deleteRecipeController,
  showRecipeDetails
} from "../controllers/recipeController.js";

const router = express.Router();

/**
 * 🔹 List all recipes
 */
router.get("/", listRecipes);

/**
 * 🔹 Form to create a new recipe
 */
router.get("/new", newRecipeForm);

/**
 * 🔹 Create new recipe (POST)
 */
router.post("/", createRecipe);

/**
 * 🔹 Edit existing recipe
 */
router.get("/:id/edit", editRecipeForm);

/**
 * 🔹 Update recipe (PUT)
 */
router.put("/:id", updateRecipeController);

/**
 * 🔹 Update recipe (POST for form submission)
 */
router.post("/:id/update", updateRecipeController);

/**
 * 🔹 Delete recipe (DELETE)
 */
router.delete("/:id", deleteRecipeController);

/**
 * 🔹 Delete recipe (POST for form submission)
 */
router.post("/:id/delete", deleteRecipeController);

/**
 * 🔹 Show details of a specific recipe
 */
router.get("/:id", showRecipeDetails);

export default router;
