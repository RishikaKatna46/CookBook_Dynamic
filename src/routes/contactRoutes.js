// src/routes/contactRoutes.js
import express from "express";
import { showContactForm, submitContact } from "../controllers/contactController.js";

const router = express.Router();

// GET /contact - Show contact form
router.get("/", showContactForm);

// POST /contact - Submit contact form
router.post("/", submitContact);

export default router;
