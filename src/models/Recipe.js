// src/models/Recipe.js
const db = require('../db');
const Ingredient = require('./Ingredient');

class Recipe {
  
  // Creates a new recipe and its ingredients
  static async create(name, instructions, ingredients) {
    return new Promise((resolve, reject) => {
      // Run SQL query to insert the main recipe
      db.run('INSERT INTO recipes (name, instructions) VALUES (?, ?)', [name, instructions], function (err) {
        if (err) {
          return reject(err);
        }
        
        const recipeId = this.lastID; // Get the ID of the recipe we just inserted
        
        // Now, insert all the ingredients linked to this new recipe
        const ingredientPromises = ingredients.map(ingredientName => {
          return Ingredient.create(ingredientName.trim(), recipeId);
        });

        // Wait for all ingredients to be saved
        Promise.all(ingredientPromises)
          .then(() => resolve(recipeId))
          .catch(err => reject(err));
      });
    });
  }

  // Finds all recipes
  static findAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM recipes', [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Finds one recipe by its ID, including its ingredients
  static async findById(id) {
    return new Promise((resolve, reject) => {
      // First, get the recipe
      db.get('SELECT * FROM recipes WHERE id = ?', [id], async (err, recipe) => {
        if (err) {
          return reject(err);
        }
        if (recipe) {
          // If recipe is found, get its ingredients
          const ingredients = await Ingredient.findByRecipeId(recipe.id);
          recipe.ingredients = ingredients; // Attach ingredients to the recipe object
          resolve(recipe);
        } else {
          resolve(null); // No recipe found
        }
      });
    });
  }

  // Deletes one recipe by its ID
  static delete(id) {
    return new Promise((resolve, reject) => {
      // The database schema should be set to "ON DELETE CASCADE"
      // so ingredients are deleted automatically.
      db.run('DELETE FROM recipes WHERE id = ?', [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, changes: this.changes });
        }
      });
    });
  }
  
  // Updates a recipe (Note: This is a simplified update)
  // A full update would also involve deleting/adding/updating ingredients
  static update(id, name, instructions) {
     return new Promise((resolve, reject) => {
        db.run('UPDATE recipes SET name = ?, instructions = ? WHERE id = ?', [name, instructions, id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id, changes: this.changes });
            }
        });
     });
  }
}

module.exports = Recipe;