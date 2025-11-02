async function searchRecipes() {
    const query = document.getElementById('searchInput').value.trim();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
  
    if (!query) {
      resultsContainer.innerHTML = '<p>Please enter an ingredient or cuisine.</p>';
      return;
    }
  
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
  
      if (!data.results || data.results.length === 0) {
        resultsContainer.innerHTML = '<p>No recipes found.</p>';
        return;
      }
  
      data.results.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.title}" />
          <h4>${recipe.title}</h4>
        `;
        resultsContainer.appendChild(card);
      });
    } catch (err) {
      console.error(err);
      resultsContainer.innerHTML = '<p>Error fetching recipes. Please try again later.</p>';
    }
  }
  