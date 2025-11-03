// public/js/search.js

// 🔹 Function: Search for recipes
async function searchRecipes() {
  const query = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("results");

  if (!query) {
    resultsDiv.innerHTML = `<p style="color: #e74c3c; text-align: center;">Please enter a search term</p>`;
    return;
  }

  resultsDiv.innerHTML = `<p class="loading">Searching recipes...</p>`;

  try {
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      resultsDiv.innerHTML = data.results
        .map(
          (recipe) => `
            <div class="recipe-card" onclick="showRecipeDetails(${recipe.id})">
              <img src="${recipe.image}" alt="${recipe.title}" 
                style="width: 100%; border-radius: 8px 8px 0 0; height: 180px; object-fit: cover;">
              <h3 style="margin: 1rem; font-size: 1.1rem;">${recipe.title}</h3>
              <button style="margin: 0 1rem 1rem 1rem; width: calc(100% - 2rem);">View Recipe</button>
            </div>
          `
        )
        .join("");
    } else {
      resultsDiv.innerHTML = `<p style="text-align: center; color: #666;">No recipes found. Try a different search term!</p>`;
    }
  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = `<p style="color: #e74c3c; text-align: center;">Error fetching recipes. Please try again.</p>`;
  }
}

// 🔹 Function: Show recipe details in a modal
async function showRecipeDetails(recipeId) {
  const modal = document.getElementById("recipeModal");
  const detailsDiv = document.getElementById("recipeDetails");

  modal.style.display = "block";
  detailsDiv.innerHTML = `<div class="loading">Loading recipe details...</div>`;

  try {
    const response = await fetch(`/api/recipe/${recipeId}`);
    const recipe = await response.json();

    detailsDiv.innerHTML = `
      <div class="recipe-detail-header">
        <img src="${recipe.image}" alt="${recipe.title}" 
          style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
        <h2 style="color: #ff8c42; margin-bottom: 0.5rem;">${recipe.title}</h2>
        <div style="display: flex; gap: 1.5rem; margin-bottom: 1.5rem; color: #666;">
          <span>⏱ ${recipe.readyInMinutes} minutes</span>
          <span>🍽 ${recipe.servings} servings</span>
          ${recipe.vegetarian ? "<span>🌱 Vegetarian</span>" : ""}
        </div>
      </div>

      <div class="recipe-detail-section">
        <h3 style="color: #2c3e50; border-bottom: 2px solid #ff8c42; padding-bottom: 0.5rem; margin-bottom: 1rem;">Ingredients</h3>
        <ul style="list-style: none; padding: 0;">
          ${
            recipe.extendedIngredients
              ? recipe.extendedIngredients
                  .map(
                    (ing) =>
                      `<li style="padding: 0.5rem; border-bottom: 1px solid #eee;">
                        <strong>${ing.amount || ""} ${ing.unit || ""}</strong> ${ing.name}
                      </li>`
                  )
                  .join("")
              : "<li>No ingredients available.</li>"
          }
        </ul>
      </div>

      <div class="recipe-detail-section" style="margin-top: 2rem;">
        <h3 style="color: #2c3e50; border-bottom: 2px solid #ff8c42; padding-bottom: 0.5rem; margin-bottom: 1rem;">Instructions</h3>
        <div style="line-height: 1.8; color: #333;">
          ${recipe.instructions || recipe.summary || "No instructions available."}
        </div>
      </div>

      ${
        recipe.sourceUrl
          ? `
        <div style="margin-top: 2rem; text-align: center;">
          <a href="${recipe.sourceUrl}" target="_blank" 
            style="color: #ff8c42; text-decoration: none; font-weight: 500;">
            View Original Recipe →
          </a>
        </div>
      `
          : ""
      }
    `;
  } catch (err) {
    console.error(err);
    detailsDiv.innerHTML = `<p style="color: #e74c3c; text-align: center;">Error loading recipe details. Please try again.</p>`;
  }
}

// 🔹 Function: Close modal
function closeModal() {
  document.getElementById("recipeModal").style.display = "none";
}

// 🔹 Close modal if user clicks outside
window.onclick = function (event) {
  const modal = document.getElementById("recipeModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// 🔹 Allow "Enter" key to trigger search
document.getElementById("searchInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchRecipes();
  }
});
