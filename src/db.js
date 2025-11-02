const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./cookbook.db');

// Enable foreign key constraints
db.run('PRAGMA foreign_keys = ON');

// Initialize database schema
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT,
      rating REAL DEFAULT 0,
      instructions TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS ingredients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipe_id INTEGER,
      name TEXT,
      quantity TEXT,
      FOREIGN KEY(recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
    )
  `);

  // Check if we need to add the instructions column to existing tables
  db.all("PRAGMA table_info(recipes)", [], (err, columns) => {
    if (err) {
      console.error('Error checking table schema:', err);
      return;
    }

    const hasInstructions = columns.some(col => col.name === 'instructions');

    if (!hasInstructions) {
      db.run("ALTER TABLE recipes ADD COLUMN instructions TEXT", (err) => {
        if (err) {
          console.error('Error adding instructions column:', err);
        } else {
          console.log('✅ Added instructions column to recipes table');
        }
      });
    }
  });

  // Seed database with sample data if empty
  db.get("SELECT COUNT(*) AS count FROM recipes", [], (err, row) => {
    if (err) {
      console.error('Error checking recipes:', err);
      return;
    }

    if (row.count === 0) {
      console.log('🌱 Seeding database with sample recipes...');
      const stmt = db.prepare(`
        INSERT INTO recipes (name, category, rating, instructions)
        VALUES (?, ?, ?, ?)
      `);

      stmt.run('Pancakes', 'Breakfast', 4.5, 'Mix flour, eggs, and milk. Cook on griddle until golden brown.');
      stmt.run('Grilled Cheese', 'Lunch', 4.3, 'Butter bread, add cheese, grill until golden on both sides.');
      stmt.run('Chicken Alfredo', 'Dinner', 4.8, 'Cook pasta. Make alfredo sauce with butter, cream, and parmesan. Add grilled chicken.');
      stmt.run('Brownies', 'Dessert', 4.9, 'Mix chocolate, butter, sugar, eggs, and flour. Bake at 350°F for 25 minutes.');
      stmt.run('Caesar Salad', 'Salad', 4.6, 'Toss romaine with caesar dressing, croutons, and parmesan cheese.');

      stmt.finalize(() => {
        console.log('✅ Sample recipes added successfully');
      });
    }
  });
});

module.exports = db;
