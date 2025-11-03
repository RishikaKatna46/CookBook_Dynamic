async function searchRecipes() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');

    if (!query.trim()) {
      resultsDiv.innerHTML = '<p style="color: #e74c3c; text-align: center;">Please enter a search term</p>';
      return;
    }

    // Better loading state with spinner
    resultsDiv.innerHTML = `
      <div style="text-align: center; padding: 3rem; grid-column: 1/-1;">
        <div style="display: inline-block; width: 50px; height: 50px; border: 5px solid #fff5e6; border-top: 5px solid var(--primary-orange); border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <p style="margin-top: 1rem; color: var(--text-dark); font-weight: 600;">Searching delicious recipes...</p>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;

    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        resultsDiv.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; margin-bottom: 2rem;">
            <p style="color: var(--text-dark); font-size: 1.1rem;">
              Found <strong style="color: var(--primary-orange); font-size: 1.3rem;">${data.results.length}</strong> delicious recipes
            </p>
          </div>
        ` + data.results
          .map(
            (recipe) => `
            <div class="recipe-card" onclick="showRecipeDetails('${recipe.id}')">
              <img src="${recipe.image}" alt="${recipe.title.replace(/"/g, '&quot;')}" style="width: 100%; border-radius: 8px 8px 0 0; height: 180px; object-fit: cover;">
              <h3 style="margin: 1rem; font-size: 1.1rem;">${recipe.title}</h3>
              <button style="margin: 0 1rem 1rem 1rem; width: calc(100% - 2rem);">View Recipe</button>
            </div>
          `
          )
          .join('');
      } else {
        resultsDiv.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
            <div style="font-size: 5rem; margin-bottom: 1rem;">🔍</div>
            <h3 style="color: var(--text-dark); margin-bottom: 1rem;">No recipes found for "${query}"</h3>
            <p style="color: var(--text-light);">Try searching for popular ingredients like <strong>pasta</strong>, <strong>chicken</strong>, or <strong>salad</strong></p>
          </div>
        `;
      }
    } catch (err) {
      console.error('Search error:', err);
      resultsDiv.innerHTML = '<p style="color: #e74c3c; text-align: center; grid-column: 1/-1;">Error fetching recipes. Please try again.</p>';
    }
  }

  async function showRecipeDetails(recipeId) {
    const modal = document.getElementById('recipeModal');
    const detailsDiv = document.getElementById('recipeDetails');

    modal.style.display = 'block';
    detailsDiv.innerHTML = '<div class="loading">Loading recipe details...</div>';

    try {
      const response = await fetch(`/api/recipe/${recipeId}`);
      const recipe = await response.json();

      // Build ingredients list
      const ingredientsList = recipe.extendedIngredients
        .map(
          (ing) =>
            `<li style="padding: 0.5rem; border-bottom: 1px solid #eee;">
              <strong>${ing.amount} ${ing.unit}</strong> ${ing.name}
            </li>`
        )
        .join('');

      // Format instructions (split by periods or newlines for better readability)
      const formattedInstructions = recipe.instructions
        .replace(/\r\n/g, '<br><br>')
        .replace(/\n/g, '<br><br>');

      detailsDiv.innerHTML = `
        <div class="recipe-detail-header">
          <img src="${recipe.image}" alt="${recipe.title}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
          <h2 style="color: #ff8c42; margin-bottom: 0.5rem;">${recipe.title}</h2>
          <div style="display: flex; gap: 1.5rem; margin-bottom: 1.5rem; color: #666; flex-wrap: wrap;">
            ${recipe.publisher ? `<span>👨‍🍳 ${recipe.publisher}</span>` : ''}
            <span>⏱️ ${recipe.readyInMinutes} minutes</span>
            <span>👥 ${recipe.servings} servings</span>
          </div>
        </div>

        <div class="recipe-detail-section">
          <h3 style="color: #2c3e50; border-bottom: 2px solid #ff8c42; padding-bottom: 0.5rem; margin-bottom: 1rem;">Ingredients</h3>
          <ul style="list-style: none; padding: 0;">
            ${ingredientsList}
          </ul>
        </div>

        <div class="recipe-detail-section" style="margin-top: 2rem;">
          <h3 style="color: #2c3e50; border-bottom: 2px solid #ff8c42; padding-bottom: 0.5rem; margin-bottom: 1rem;">Instructions</h3>
          <div style="line-height: 1.8; color: #333;">
            ${formattedInstructions}
          </div>
        </div>

        <div style="margin-top: 2rem; text-align: center;">
          ${recipe.sourceUrl ? `
            <a href="${recipe.sourceUrl}" target="_blank" style="color: #ff8c42; text-decoration: none; font-weight: 500; padding: 0.75rem 2rem; border: 2px solid #ff8c42; border-radius: 8px; display: inline-block;">
              📖 View Full Recipe Instructions
            </a>
          ` : ''}
        </div>
      `;
    } catch (err) {
      console.error('Recipe details error:', err);
      detailsDiv.innerHTML = '<p style="color: #e74c3c; text-align: center;">Error loading recipe details. Please try again.</p>';
    }
  }

  function closeModal() {
    document.getElementById('recipeModal').style.display = 'none';
  }

  // Close modal when clicking outside
  window.onclick = function(event) {
    const modal = document.getElementById('recipeModal');
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }

  // Allow Enter key to search
  document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      searchRecipes();
    }
  });
