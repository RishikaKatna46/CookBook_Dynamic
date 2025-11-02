const axios = require('axios');
const db = require('../db');
require('dotenv').config();

const searchRecipes = async (req, res) => {
  const query = req.query.query;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`,
      {
        params: { apiKey, query, number: 10 },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error('API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
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

module.exports = { searchRecipes, getStats };
