const axios = require('axios');
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

module.exports = { searchRecipes };
