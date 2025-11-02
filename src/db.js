// src/db.js (ESM, final)

import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
sqlite3.verbose();

// choose DB file (local vs Azure)
const localDbPath = path.join(__dirname, "..", "cookbook.db");
const cloudDbPath = process.env.DB_FILE || "/home/site/data/cookbook.db";
const filename = process.env.WEBSITE_SITE_NAME ? cloudDbPath : localDbPath;

// open database
export const db = new sqlite3.Database(filename);

// schema (recipes + ingredients)
const schema = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT,
  rating REAL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS ingredients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recipe_id INTEGER,
  name TEXT,
  quantity TEXT,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);
`;

db.serialize(() => {
  db.exec(schema);

  // seed only if empty
  db.get("SELECT COUNT(*) AS count FROM recipes", [], (err, row) => {
    if (err) return console.error("DB count error:", err);
    if (row?.count === 0) {
      console.log("🌱 Seeding database with sample recipes...");
      db.run(
        `INSERT INTO recipes (name, category, rating) VALUES
         ('Pancakes','Breakfast',4.5),
         ('Grilled Cheese','Lunch',4.3),
         ('Chicken Alfredo','Dinner',4.8),
         ('Brownies','Dessert',4.9),
         ('Caesar Salad','Salad',4.6)`
      );
    }
  });
});

// optional helper to match older code paths
export async function initDB() {
  return db;
}

