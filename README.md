# CookBook - Dynamic Recipe Management App

This is our final project for ISM 6225 - a full-stack web application for managing and discovering recipes. We built it using Node.js, Express, and SQLite following the MVC architecture pattern.

## What This App Does

CookBook lets you search for recipes from an external API, save your own recipes, and manage ingredients. We implemented full CRUD operations so you can create, read, update, and delete recipes. The app also tracks statistics about your recipe collection like average ratings and most popular categories.

## Tech Stack

- **Backend:** Node.js with Express (ES6 modules)
- **Database:** SQLite3 with foreign key constraints
- **Template Engine:** EJS with express-ejs-layouts
- **External API:** Forkify API (free, no API key needed!)
- **Styling:** Custom CSS with an orange-themed design

## Getting Started

### Installation

First, clone the repo and install dependencies:

```bash
git clone https://github.com/RishikaKatna46/CookBook_Dynamic.git
cd CookBook_Dynamic
npm install
```

### Running the App

Start the server:

```bash
npm start
```

The app will be available at `http://localhost:3000`

For development with auto-restart using nodemon:

```bash
npm run dev
```

### Database Setup

The database is automatically created when you first run the app. It creates a SQLite database at `data/cookbook.db` with two tables:
- `recipes` - stores recipe information (title, category, rating, created_at)
- `ingredients` - stores ingredients linked to recipes with cascade delete

If you want to seed the database with sample data:

```bash
npm run seed
```

## Project Structure

```
CookBook_Dynamic/
├── public/
│   ├── css/            # Custom orange-themed styles
│   ├── js/             # Client-side JavaScript (search, modal)
│   └── images/         # Static images and ERD
├── src/
│   ├── app.js          # Main Express application
│   ├── db.js           # Database connection and schema
│   ├── controllers/    # Route handlers (apiController, recipeController)
│   ├── models/         # Database models (Recipe, Ingredient)
│   └── routes/         # Route definitions (api, recipes, index)
├── views/
│   ├── layout.ejs      # Main layout template
│   ├── home.ejs        # Homepage with recipe search
│   ├── about.ejs       # About page with team info
│   └── recipes/        # Recipe CRUD pages (index, new, edit)
├── data/               # SQLite database storage (gitignored)
├── .env                # Environment variables (gitignored)
└── package.json
```

## Features

### 1. Recipe Search
Search for recipes using the Forkify API. Results display in a responsive grid with images and titles. Click any recipe card to see full details including ingredients, cooking time, servings, and publisher information in a modal popup.

### 2. My Recipes (CRUD Operations)
Manage your personal recipe collection:
- **Create:** Add new recipes with title, category, and rating
- **Read:** View all your saved recipes in a clean interface
- **Update:** Edit existing recipes anytime
- **Delete:** Remove recipes you don't need anymore

### 3. Statistics API
The `/api/stats` endpoint provides insights:
- Total number of saved recipes
- Average recipe rating
- Most popular category in your collection

### 4. About Page
Team information with member names and roles, ERD diagram showing database relationships, and project links.

## API Endpoints

### Recipe Search
```
GET /api/search?query={searchTerm}
```
Returns recipes from Forkify API matching the search term. No authentication required.

### Recipe Details
```
GET /api/recipe/:id
```
Fetches detailed information for a specific recipe including ingredients list, instructions, cooking time, and servings.

### Statistics
```
GET /api/stats
```
Returns statistics about your saved recipes from the local database.

### CRUD Operations
```
GET    /recipes           # List all recipes
GET    /recipes/new       # Show create form
POST   /recipes           # Create new recipe
GET    /recipes/:id/edit  # Show edit form
PUT    /recipes/:id       # Update recipe
DELETE /recipes/:id       # Delete recipe
```

## Environment Variables

Create a `.env` file in the root directory. For local development, you only need:

```
PORT=3000
```

The Forkify API doesn't require an API key, which is why we ended up switching to it. It's completely free and has no rate limits.

For Azure deployment, you might need:
```
PORT=3000
DB_FILE=/home/site/data/cookbook.db
```

## Our Team

**Shivani Jagannatham** - Frontend Lead
Worked on layouts, styling, and making sure the UI looks consistent across all pages.

**Revanth Malisetty** - CRUD Engineer
Built the models, controllers, and routes for recipe and ingredient management.

**Rishika Katna** - Data & Recipe Details
Set up the database, seeding, stats endpoint, and the recipe details modal functionality.

**Praneeth Venkata Sai Eluri** - Platform & Docs
Handled app configuration, environment setup, ERD documentation, and preparing for Azure deployment.

## Database Schema

### Recipes Table
```sql
CREATE TABLE recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  category TEXT,
  rating REAL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Ingredients Table
```sql
CREATE TABLE ingredients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recipe_id INTEGER,
  name TEXT,
  quantity TEXT,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);
```

The relationship is one-to-many: each recipe can have multiple ingredients. We enabled foreign key constraints with cascading deletes, so when you delete a recipe, all its ingredients are automatically removed too.

## Deployment on Azure

This app is ready for deployment on Azure App Service:

1. Create an Azure App Service with Node.js 18+ runtime
2. Connect your GitHub repository in the Deployment Center
3. Add environment variables in Configuration → Application Settings
4. The app uses `npm start` as the startup command
5. Make sure the data directory is writable for SQLite

## Challenges We Faced

**API Selection Process:**
We went through three different APIs before finding the right one:
- Started with Spoonacular (required API key with strict rate limits)
- Tried TheMealDB (ran into connection issues from our environment)
- Finally settled on Forkify API which worked perfectly without any authentication

**Module System Migration:**
Had to migrate the entire codebase from CommonJS to ES6 modules for consistency. This meant adding `"type": "module"` to package.json and updating all require/module.exports to import/export statements.

**Layout System Compatibility:**
Fixed issues with express-ejs-layouts by removing old layout syntax like `<% layout('layout') %>` from EJS templates.

**Frontend JavaScript Errors:**
Had to escape special characters in recipe titles for onclick handlers to prevent syntax errors in dynamically generated HTML.

## What We Learned

- How to structure a Node.js app using MVC architecture
- Working with SQLite and understanding foreign key relationships
- Integrating external APIs and handling their different response formats
- Deploying Node.js apps to cloud platforms like Azure
- Git workflow with multiple team members and branches
- Debugging and fixing compatibility issues between different packages

## Notes

- The search functionality uses the free Forkify API, so no API key setup is needed
- Database file is automatically created in the `data/` directory on first run
- All pages use express-ejs-layouts for consistent structure
- Foreign key constraints are enabled for proper data integrity
- The orange color theme was chosen to give a warm, inviting feel

## Repository

GitHub: https://github.com/RishikaKatna46/CookBook_Dynamic

---

Built for ISM 6225 Final Project - Dynamic MVC Web Application with Azure Deployment
University of South Florida, Muma College of Business
