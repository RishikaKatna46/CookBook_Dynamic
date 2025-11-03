// src/models/Recipe.js
import db from "../db.js";

export async function getAllRecipes() {
  return await db.all("SELECT * FROM recipes ORDER BY created_at DESC");
}

export async function getRecipeById(id) {
  return await db.get("SELECT * FROM recipes WHERE id = ?", [id]);
}

export async function addRecipe({ title, instructions, category, rating }) {
  return await db.run(
    "INSERT INTO recipes (title, instructions, category, rating) VALUES (?, ?, ?, ?)",
    [title, instructions, category, rating]
  );
}

export async function updateRecipe(id, { title, instructions, category, rating }) {
  return await db.run(
    "UPDATE recipes SET title = ?, instructions = ?, category = ?, rating = ? WHERE id = ?",
    [title, instructions, category, rating, id]
  );
}

export async function deleteRecipe(id) {
  return await db.run("DELETE FROM recipes WHERE id = ?", [id]);
}
