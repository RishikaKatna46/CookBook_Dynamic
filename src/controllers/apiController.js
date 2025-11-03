import axios from "axios";
import db from "../db.js";
import "dotenv/config";

export const searchRecipes = async (req, res) => {
  const query = req.query.query;

  try {
    const response = await axios.get(
      'https://forkify-api.herokuapp.com/api/v2/recipes',
      {
        params: { search: query },
      }
    );

    // Forkify returns { status, data: { recipes: [...] } }
    const recipes = response.data.data?.recipes || [];

    // Transform to match our frontend format
    const results = recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image_url,
    }));

    res.json({ results });
  } catch (err) {
    console.error('API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
};

export const getRecipeDetails = async (req, res) => {
  const recipeId = req.params.id;

  try {
    const response = await axios.get(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
    );

    const recipeData = response.data.data?.recipe;

    if (!recipeData) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Transform ingredients from Forkify format
    const ingredients = recipeData.ingredients.map(ing => ({
      name: ing.description,
      amount: ing.quantity || '',
      unit: ing.unit || '',
    }));

    // Transform to match our frontend format
    const recipe = {
      id: recipeData.id,
      title: recipeData.title,
      image: recipeData.image_url,
      publisher: recipeData.publisher,
      instructions: `This delicious ${recipeData.title} recipe is brought to you by ${recipeData.publisher}. For full cooking instructions, please visit the source link below.`,
      extendedIngredients: ingredients,
      sourceUrl: recipeData.source_url,
      servings: recipeData.servings || 4,
      readyInMinutes: recipeData.cooking_time || 30,
    };

    res.json(recipe);
  } catch (err) {
    console.error('API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch recipe details' });
  }
};

export const getStats = async (req, res) => {
  try {
    // Get total count of recipes
    db.get('SELECT COUNT(*) as count FROM recipes', [], (err, countResult) => {
      if (err) {
        console.error('Error getting recipe count:', err);
        return res.status(500).json({ error: 'Failed to fetch statistics' });
      }

      const totalRecipes = countResult.count;

      // Get average rating
      db.get('SELECT AVG(rating) as avgRating FROM recipes', [], (err, avgResult) => {
        if (err) {
          console.error('Error getting average rating:', err);
          return res.status(500).json({ error: 'Failed to fetch statistics' });
        }

        const avgRating = avgResult.avgRating ? parseFloat(avgResult.avgRating.toFixed(2)) : 0;

        // Get top category (category with most recipes)
        db.get(
          'SELECT category, COUNT(*) as count FROM recipes WHERE category IS NOT NULL GROUP BY category ORDER BY count DESC LIMIT 1',
          [],
          (err, categoryResult) => {
            if (err) {
              console.error('Error getting top category:', err);
              return res.status(500).json({ error: 'Failed to fetch statistics' });
            }

            const topCategory = categoryResult ? categoryResult.category : 'None';

            // Send the stats response
            res.json({
              totalRecipes,
              avgRating,
              topCategory
            });
          }
        );
      });
    });
  } catch (err) {
    console.error('Stats error:', err.message);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};
