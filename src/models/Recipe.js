// src/models/Recipe.js
import db from "../db.js";

export async function getAllRecipes() {
  return await db.all("SELECT * FROM recipes ORDER BY created_at DESC");
}

export async function getRecipeById(id) {
  return await db.get("SELECT * FROM recipes WHERE id = ?", [id]);
}

export async function addRecipe({ title, category, rating }) {
  return await db.run(
    "INSERT INTO recipes (title, category, rating) VALUES (?, ?, ?)",
    [title, category, rating]
  );
}

export async function updateRecipe(id, { title, category, rating }) {
  return await db.run(
    "UPDATE recipes SET title = ?, category = ?, rating = ? WHERE id = ?",
    [title, category, rating, id]
  );
}

export async function deleteRecipe(id) {
  return await db.run("DELETE FROM recipes WHERE id = ?", [id]);
}
