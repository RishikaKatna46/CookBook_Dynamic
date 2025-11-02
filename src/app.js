// src/app.js (ESM version)
import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import expressLayouts from "express-ejs-layouts";

import { initDB } from "./db.js";          // your src/db.js exports initDB()
import apiRoutes from "./routes/apiRoutes.js"; // keep if you already have this

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// ---------- View Engine ----------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.use(express.static(path.join(__dirname, "..", "public")));

// ---------- Layouts Configuration ----------
app.use(expressLayouts);        // must come BEFORE routes
app.set("layout", "layout");    // default layout file name (views/layout.ejs)

// ---------- Body parsers + method override ----------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// ---------- Routes ----------
app.use("/api", apiRoutes);

// simple render routes (keep these if you don't have separate route files yet)
app.get("/", (req, res) => res.render("home", { title: "Home" }));
app.get("/about", (req, res) => res.render("about", { title: "About" }));
app.get("/charts", (req, res) => res.render("charts", { title: "Charts" }));
app.get("/recipes", (req, res) => res.render("recipes/list", { title: "Recipes" }));

// ---------- Error Handler ----------
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).send("Server error");
});

// ---------- Start Server AFTER DB is ready ----------
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`CookBook running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Failed to init DB:", err);
  process.exit(1);
});

