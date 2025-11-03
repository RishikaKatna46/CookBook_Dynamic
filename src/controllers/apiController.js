const axios = require('axios');
const db = require('../db');
require('dotenv').config();

const searchRecipes = async (req, res) => {
  const query = req.query.query;

  try {
    const response = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/search.php',
      {
        params: { s: query },
      }
    );

    // TheMealDB returns { meals: [...] } or { meals: null }
    const meals = response.data.meals || [];

    // Transform to match our frontend format
    const results = meals.map(meal => ({
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
    }));

    res.json({ results });
  } catch (err) {
    console.error('API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
};

const getRecipeDetails = async (req, res) => {
  const recipeId = req.params.id;

  try {
    const response = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/lookup.php',
      { params: { i: recipeId } }
    );

    const meal = response.data.meals?.[0];

    if (!meal) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Transform ingredients (strIngredient1-20, strMeasure1-20)
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: ingredient,
          amount: measure || '',
          unit: '',
        });
      }
    }

    // Transform to match our frontend format
    const recipe = {
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: meal.strInstructions,
      extendedIngredients: ingredients,
      sourceUrl: meal.strSource,
      youtubeUrl: meal.strYoutube,
      servings: '4',
      readyInMinutes: '30',
    };

    res.json(recipe);
  } catch (err) {
    console.error('API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch recipe details' });
  }
};

const getStats = async (req, res) => {
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

module.exports = { searchRecipes, getRecipeDetails, getStats };
