const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- View Engine ----------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));

// ---------- Layouts Configuration ----------
app.use(expressLayouts);        // must come BEFORE routes
app.set('layout', 'layout');    // default layout file name (views/layout.ejs)

// ---------- Routes ----------
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));
app.get('/charts', (req, res) => res.render('charts'));
app.get('/recipes', (req, res) => res.render('recipes/list'));

app.listen(PORT, () =>
  console.log(`CookBook running on http://localhost:${PORT}`)
);
