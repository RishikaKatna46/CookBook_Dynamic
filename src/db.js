// src/db.js
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "../data/cookbook.db");

// Create database connection (asynchronous)
let db;

async function connectDB() {
  if (db) return db; // Reuse existing connection

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  // Create tables if they don't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      category TEXT,
      rating REAL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS ingredients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipe_id INTEGER,
      name TEXT,
      quantity TEXT,
      FOREIGN KEY (recipe_id) REFERENCES recipes(id)
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("✅ SQLite database initialized successfully.");
  return db;
}

// Immediately connect and export db instance
const dbInstance = await connectDB();
export default dbInstance;
