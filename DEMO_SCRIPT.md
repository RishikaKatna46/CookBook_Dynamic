# CookBook Dynamic - Live Demo Script

**ISM 6225 Final Project Presentation**
**Team Members:** Shivani Jagannatham, Revanth Malisetty, Rishika Katna, Praneeth Venkata Sai Eluri

---

## Introduction (30 seconds)

"Hello everyone! Today we're presenting CookBook Dynamic - a full-stack recipe management web application. Our app lets users search for recipes from an external API, manage their personal recipe collection with full CRUD operations, and track statistics about their saved recipes. We built it using Node.js, Express, SQLite, and the MVC architecture pattern."

---

## 1. Home Page & Recipe Search (1.5 minutes)

**Navigate to:** `http://localhost:3000`

### What to Show:
- **Search Functionality:**
  - "Let's start with the recipe search feature. We're using the Forkify API to fetch real-time recipe data."
  - Type in search box: "pasta" → Click Search
  - "As you can see, we get a responsive grid of recipe cards with images and titles."

- **Recipe Details Modal:**
  - Click on any recipe card
  - "When you click a recipe, a modal pops up showing detailed information: ingredients with quantities, cooking time, servings, publisher info, and a link to the full recipe source."
  - Click X or outside to close modal

### Key Points to Mention:
- "The Forkify API is completely free with no authentication required, which solved our initial API challenges."
- "The modal is implemented with vanilla JavaScript and styled to match our theme."

---

## 2. Statistics Dashboard (45 seconds)

**Still on Home Page - Scroll Down**

### What to Show:
- "Below the search, we have a live statistics dashboard that tracks your recipe collection."
- Point out the three stat cards:
  - **Total Recipes:** Shows current count (should show 2 if you added the sample recipes)
  - **Average Rating:** Dynamically calculated from your saved recipes
  - **Top Category:** Most popular category in your collection

### Key Points to Mention:
- "This data comes from our `/api/stats` endpoint which queries the SQLite database."
- "The stats update in real-time when you add, edit, or delete recipes."
- "Notice the recipe count also appears in the navigation badge next to 'My Recipes'."

---

## 3. Dark/Light Theme Toggle (30 seconds)

**Header - Top Right**

### What to Show:
- "We've implemented a dark/light theme toggle for user comfort."
- Click the moon icon → Page smoothly transitions to dark mode
- "Your preference is saved in localStorage and persists across sessions."
- Click sun icon → Switch back to light mode

### Key Points to Mention:
- "The theme uses CSS variables for smooth transitions."
- "All pages - home, recipes, about, contact - support both themes."
- "This shows attention to user experience and accessibility."

---

## 4. My Recipes - CRUD Operations (3 minutes)

**Navigate to:** Click "My Recipes" in navigation

### CREATE - Add New Recipe (1 minute)

**Click:** "Add New Recipe" button

#### What to Show:
- "Now let's demonstrate full CRUD functionality. I'll create a new recipe."
- Fill in the form:
  - **Recipe Name:** "Homemade Pizza"
  - **Instructions:** "Prepare dough, add toppings, bake at 450°F for 12-15 minutes."
  - **Ingredients:** "pizza dough, mozzarella cheese, tomato sauce, pepperoni, basil"
  - **Category:** "Italian"
  - **Rating:** 4.8
- Click "Save Recipe"
- "Notice the success toast notification confirming the recipe was created."

#### Key Points:
- "Ingredients are comma-separated and stored in a separate table with a foreign key relationship."
- "The form validates required fields before submission."

### READ - View Recipes (30 seconds)

**Back on My Recipes page**

#### What to Show:
- "Here's our recipe collection displayed in a clean grid layout."
- "Each card shows: title, category, rating, creation date, and action buttons."
- "Notice the recipe count badge updated to 3 (or current count)."

### UPDATE - Edit Recipe (1 minute)

**Click:** "Edit" button on the Pizza recipe you just created

#### What to Show:
- "Let's update this recipe. The edit form is pre-populated with existing data."
- Change rating from 4.8 to 5.0
- Add to ingredients: ", mushrooms, olives"
- Click "Save Changes"
- "Another success toast confirms the update."
- Show that the recipe now displays the new rating and ingredients

#### Key Points:
- "The update operation modifies the recipe and replaces all ingredients."
- "We use URL parameters (/recipes/:id/edit) for RESTful routing."

### DELETE - Remove Recipe (30 seconds)

**Click:** "Delete" button on a different recipe (not the one you just created)

#### What to Show:
- "For deletion, we have a confirmation prompt to prevent accidental deletions."
- Click "OK" to confirm
- "Success toast shows the recipe was deleted."
- "Thanks to CASCADE DELETE constraints, all associated ingredients are automatically removed."

#### Key Points:
- "Our database schema uses foreign keys with CASCADE DELETE for data integrity."
- "The recipe count badge updates automatically."

---

## 5. View Recipe Details (30 seconds)

**Click:** "View" button on the Homemade Pizza recipe

### What to Show:
- "This is the detailed view page for a saved recipe."
- Point out:
  - Recipe title and metadata (category, rating)
  - Full instructions
  - Ingredients list
  - Creation timestamp

### Key Points:
- "This demonstrates the READ operation with detailed data presentation."
- "Uses EJS templating for server-side rendering."

---

## 6. About Page (45 seconds)

**Navigate to:** Click "About" in navigation

### What to Show:
- "The About page documents our team and project architecture."
- Scroll through:
  - **Team & Roles:** Each member's responsibilities
  - **ERD Diagram:** Shows our database schema with three tables
  - **Links:** GitHub repository and Azure deployment

### Key Points to Mention:
- "The ERD clearly shows the one-to-many relationship between recipes and ingredients."
- "We also have a contacts table for the contact form feature."

---

## 7. Contact Us (45 seconds)

**Navigate to:** Click "Contact Us" in navigation

### What to Show:
- "We added a contact form for user feedback and questions."
- Fill in the form:
  - **Name:** "Demo User"
  - **Email:** "demo@example.com"
  - **Message:** "Great app! Love the dark mode feature."
- Click "Send Message"
- "Success toast confirms the message was saved to the database."

### Key Points:
- "Contact submissions are stored in the contacts table."
- "This demonstrates additional database interactions beyond recipe management."

---

## 8. Technical Highlights (1 minute)

### Architecture & Tech Stack:
- "Our app follows the MVC (Model-View-Controller) architecture pattern."
- **Models:** Handle database operations (Recipe, Ingredient)
- **Views:** EJS templates with express-ejs-layouts for consistent structure
- **Controllers:** Route handlers for business logic (recipeController, apiController)

### Database:
- "We're using SQLite3 with three tables: recipes, ingredients, and contacts."
- "Foreign key constraints enabled with CASCADE DELETE."
- "The database is automatically created on first run."

### API Integration:
- "Initially tried Spoonacular and TheMealDB, but settled on Forkify for its reliability and no authentication requirement."
- "API calls are handled server-side to keep logic centralized."

### Modern Features:
- ES6 modules (import/export syntax)
- Async/await for database operations
- Promise-based SQLite wrapper
- LocalStorage for theme persistence
- Responsive design with CSS Grid and Flexbox

---

## 9. Challenges We Overcame (45 seconds)

1. **API Selection:** "Went through three different APIs before finding Forkify which worked perfectly."

2. **Module System Migration:** "Migrated entire codebase from CommonJS to ES6 modules for consistency."

3. **Stats API Fix:** "Had to refactor callback-style code to async/await for proper Promise handling."

4. **CRUD Field Alignment:** "Fixed field name mismatches between forms and database schema."

5. **Layout System Compatibility:** "Resolved express-ejs-layouts integration issues."

---

## 10. Future Enhancements (30 seconds)

If asked about future improvements:
- "User authentication and personal accounts"
- "Recipe image uploads for custom recipes"
- "Social features like sharing and favorites"
- "Recipe categorization with tags"
- "Print-friendly recipe views"
- "Nutritional information integration"

---

## Conclusion (30 seconds)

"To summarize, CookBook Dynamic demonstrates:
- Full-stack development with Node.js and Express
- MVC architecture pattern implementation
- Complete CRUD operations with SQLite
- External API integration
- Modern UI/UX features like dark mode
- Proper database design with foreign key relationships

Thank you! We're happy to answer any questions."

---

## Quick Stats for Q&A

- **Total Lines of Code:** ~2,500+
- **Database Tables:** 3 (recipes, ingredients, contacts)
- **API Endpoints:** 6 (search, recipe details, stats, CRUD operations)
- **Pages:** 5 (home, recipes, about, contact, recipe details)
- **Development Time:** 3-4 weeks
- **Team Size:** 4 members
- **Tech Stack:** Node.js, Express, SQLite, EJS, Forkify API

---

## Demo Tips

✅ **Before Demo:**
- Ensure server is running: `npm start`
- Have 2-3 sample recipes pre-loaded
- Test dark mode toggle works
- Verify all CRUD operations function
- Check stats dashboard displays correctly

✅ **During Demo:**
- Speak clearly and at moderate pace
- Show confidence in your work
- Handle questions gracefully
- If something breaks, explain what should happen
- Emphasize team collaboration

✅ **After Demo:**
- Thank the professor and classmates
- Be ready for technical questions
- Have GitHub repo link ready to share
