import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));


const localDbPath = path.join(__dirname, "..", "cookbook.db");

const cloudDbPath = process.env.DB_FILE || "/home/site/data/cookbook.db";

const filename = process.env.WEBSITE_SITE_NAME ? cloudDbPath : localDbPath;

export async function initDB() {
  const db = await open({
    filename,
    driver: sqlite3.Database,
  });

  await db.exec(`
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
      FOREIGN KEY(recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
    );
  `);

  const row = await db.get("SELECT COUNT(*) AS count FROM recipes");
  if (row.count === 0) {
    console.log("🌱 Seeding static project recipes into database...");
    await db.run(`
      INSERT INTO recipes (name, category, rating) VALUES
      ('Pancakes', 'Breakfast', 4.5),
      ('Grilled Cheese', 'Lunch', 4.3),
      ('Chicken Alfredo', 'Dinner', 4.8),
      ('Brownies', 'Dessert', 4.9),
      ('Caesar Salad', 'Salad', 4.6)
    `);
  }

  return db;
}

