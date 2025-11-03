// src/app.js  (ESM, final - after removing charts)

import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import expressLayouts from "express-ejs-layouts";

// DB bootstraps on import (creates tables / optional seed via --seed)
import "./db.js";

// Routes
import indexRoutes from "./routes/indexRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const PORT = process.env.PORT || 3000;

// ---------- Middleware ----------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "..", "public")));

// ---------- Views & Layouts ----------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.use(expressLayouts);           // must be before routes that render views
app.set("layout", "layout");       // views/layout.ejs

// ---------- Routes ----------
app.use("/", indexRoutes);         // '/', '/about'
app.use("/recipes", recipeRoutes); // CRUD
app.use("/api", apiRoutes);        // /api/search, /api/recipe/:id, /api/stats
app.use("/contact", contactRoutes); // /contact (GET, POST)

// ❌ Removed charts route completely
// app.get('/charts', (req, res) => res.render('charts'));

// ---------- Error Handler ----------
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).send("Server error");
});

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(`✅ CookBook running at http://localhost:${PORT}`);
});
