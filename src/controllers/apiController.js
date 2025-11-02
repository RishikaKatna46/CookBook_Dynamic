import { initDB } from "../db.js";

export async function getStats(req, res) {
  const db = await initDB();
  const totalRecipes = (await db.get(`SELECT COUNT(*) AS c FROM recipes`)).c;
  const avgRating = (await db.get(`SELECT ROUND(AVG(rating),2) AS a FROM recipes`)).a;
  const topCategory = (await db.get(`
    SELECT category, COUNT(*) AS total
    FROM recipes
    GROUP BY category
    ORDER BY total DESC
    LIMIT 1
  `));
  res.json({
    totalRecipes,
    avgRating,
    topCategory: topCategory?.category || "N/A",
  });
}
