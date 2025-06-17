const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

mongoose.connect('mongodb://localhost:27017/recipesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ DB error:', err));

const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  instructions: String
});
const Recipe = mongoose.model('Recipe', recipeSchema);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const recipes = await Recipe.find();
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/recipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.post('/add-recipe', async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  await Recipe.create({
    title,
    ingredients: ingredients.split(','),
    instructions
  });
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});
