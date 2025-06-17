document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('recipeForm');
  const container = document.getElementById('recipesContainer');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const ingredientsText = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;

    const ingredients = ingredientsText.split('\n').filter(ing => ing.trim() !== '');

    await fetch('/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, ingredients, instructions })
    });

    form.reset();
    loadRecipes();
  });

  async function loadRecipes() {
    container.innerHTML = '';
    const res = await fetch('/api/recipes');
    const recipes = await res.json();

    recipes.forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${recipe.title}</h3>
        <div class="recipe-details">
          <strong>Ingredients:</strong>
          <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
          <strong>Instructions:</strong>
          <p>${recipe.instructions}</p>
        </div>
      `;
      card.addEventListener('click', () => {
        const details = card.querySelector('.recipe-details');
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
      });
      container.appendChild(card);
    });
  }

  loadRecipes();
});
