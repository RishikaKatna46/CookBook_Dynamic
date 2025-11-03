// src/models/Ingredient.js
import db from "../db.js";

export class Ingredient {
  // 🔹 Creates a new ingredient linked to a recipe
  static async create(name, recipeId) {
    try {
      const result = await db.run(
        "INSERT INTO ingredients (name, recipe_id) VALUES (?, ?)",
        [name, recipeId]
      );
      return result.lastID;
    } catch (err) {
      console.error("Error inserting ingredient:", err);
      throw err;
    }
  }

  // 🔹 Finds all ingredients for a specific recipe
  static async findByRecipeId(recipeId) {
    try {
      const rows = await db.all(
        "SELECT * FROM ingredients WHERE recipe_id = ?",
        [recipeId]
      );
      return rows;
    } catch (err) {
      console.error("Error fetching ingredients:", err);
      throw err;
    }
  }

  // 🔹 Deletes all ingredients for a specific recipe
  static async deleteByRecipeId(recipeId) {
    try {
      await db.run("DELETE FROM ingredients WHERE recipe_id = ?", [recipeId]);
    } catch (err) {
      console.error("Error deleting ingredients:", err);
      throw err;
    }
  }
}

export default Ingredient;
