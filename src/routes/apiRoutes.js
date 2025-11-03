// src/routes/apiRoutes.js
import express from "express";
import { searchRecipes, getRecipeDetails, getStats } from "../controllers/apiController.js";

const router = express.Router();

// 🔹 API Endpoints
router.get("/search", searchRecipes);          // /api/search?query=pasta
router.get("/recipe/:id", getRecipeDetails);   // /api/recipe/12345
router.get("/stats", getStats);                // /api/stats

export default router;
