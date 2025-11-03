// src/controllers/apiController.js
import axios from "axios";
import db from "../db.js";
import "dotenv/config";

/**
 * 🔹 Search Recipes (Spoonacular API)
 */
export const searchRecipes = async (req, res) => {
  const query = req.query.query;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  try {
    const response = await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch",
      {
        params: { apiKey, query, number: 10 },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("API error:", err.message);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};

/**
 * 🔹 Get Recipe Details (Spoonacular API)
 */
export const getRecipeDetails = async (req, res) => {
  const recipeId = req.params.id;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information`,
      { params: { apiKey } }
    );
    res.json(response.data);
  } catch (err) {
    console.error("API error:", err.message);
    res.status(500).json({ error: "Failed to fetch recipe details" });
  }
};

/**
 * 🔹 Get Stats (from local SQLite DB)
 */
export const getStats = async (req, res) => {
  try {
    db.get("SELECT COUNT(*) as count FROM recipes", [], (err, countResult) => {
      if (err) {
        console.error("Error getting recipe count:", err);
        return res.status(500).json({ error: "Failed to fetch statistics" });
      }

      const totalRecipes = countResult.count;

      db.get("SELECT AVG(rating) as avgRating FROM recipes", [], (err, avgResult) => {
        if (err) {
          console.error("Error getting average rating:", err);
          return res.status(500).json({ error: "Failed to fetch statistics" });
        }

        const avgRating = avgResult.avgRating
          ? parseFloat(avgResult.avgRating.toFixed(2))
          : 0;

        db.get(
          `SELECT category, COUNT(*) as count 
           FROM recipes 
           WHERE category IS NOT NULL 
           GROUP BY category 
           ORDER BY count DESC 
           LIMIT 1`,
          [],
          (err, categoryResult) => {
            if (err) {
              console.error("Error getting top category:", err);
              return res.status(500).json({ error: "Failed to fetch statistics" });
            }

            const topCategory = categoryResult ? categoryResult.category : "None";

            res.json({
              totalRecipes,
              avgRating,
              topCategory,
            });
          }
        );
      });
    });
  } catch (err) {
    console.error("Stats error:", err.message);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
};
