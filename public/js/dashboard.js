import loadHeaderFooter from './utils.mjs';

// Load header and footer
loadHeaderFooter();


const savedRecipesSection = document.getElementById('dashboard-content');
const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

// load recipes from local storrage and display them in indivitual cards with name, image, category, area, ingredients, and instructions. 
if (!savedRecipesSection) {
    console.warn('Dashboard content element (`dashboard-content`) not found.');
} else if (savedRecipes.length > 0) {
    savedRecipesSection.innerHTML = '<h2>Saved Recipes</h2>';
    savedRecipes.forEach(recipe => {
        const recipeData = JSON.parse(localStorage.getItem(`recipe_${recipe}`));    
        if (!recipeData) {
            console.warn(`No stored data for saved recipe: ${recipe}`);
            return;
        }
        const name = recipeData.name || recipe;
        const image = recipeData.image || '';
        const category = recipeData.category || '';
        const area = recipeData.area || '';
        savedRecipesSection.innerHTML += `
            <div class="saved-recipe-card">
                <h3>${name}</h3>
                ${image ? `<img src="${image}" alt="${name}" class="saved-recipe-image">` : ''}
                <p><strong>Category:</strong> ${category}</p>
                <p><strong>Area:</strong> ${area}</p>
                <p><strong>Ingredients:</strong> ${recipeData.ingredients.join(', ')}</p>
                <p><strong>Instructions:</strong> ${recipeData.instructions}</p>
                <a href="/pages/recipe.html?recipe=${encodeURIComponent(recipe)}">View Recipe</a>
            </div>
        `;
    }
) } else {
    savedRecipesSection.innerHTML = '<p>No saved recipes yet. Click "Save Recipe" on a recipe to save it here!</p>';
}

