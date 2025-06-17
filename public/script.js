window.onload = async () => {
    const container = document.getElementById('recipes');
    const res = await fetch('/recipes');
    const recipes = await res.json();
  
    recipes.forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'recipe-card';
      card.innerHTML = `
        <h3>${recipe.title}</h3>
        <strong>Ingredients:</strong>
        <ul>${recipe.ingredients.map(i => `<li>${i.trim()}</li>`).join('')}</ul>
        <strong>Instructions:</strong>
        <p>${recipe.instructions}</p>
      `;
      container.appendChild(card);
    });
  };
  
