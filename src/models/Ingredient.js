// src/models/Ingredient.js
const db = require('../db');

class Ingredient {
  
  // Creates a new ingredient linked to a recipe
  static create(name, recipeId) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO ingredients (name, recipe_id) VALUES (?, ?)', [name, recipeId], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  // Finds all ingredients for a specific recipe
  static findByRecipeId(recipeId) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM ingredients WHERE recipe_id = ?', [recipeId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = Ingredient;