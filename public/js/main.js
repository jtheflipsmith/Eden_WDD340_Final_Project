//Call to API
const recipe = document.getElementById('recipe-section');

async function getRecipe() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php/images/media/meals/llcbn01574260722.jpg/medium');
        if (!response.ok) {
            throw new Error('Failed to fetch recipe');
        }
        const data = await response.json();
        recipe.textContent = data.meals[0].strMeal;
        console.log(data);
    } catch (error) {
        console.error('Error fetching recipe:', error);
        recipe.textContent = 'Failed to load recipe';
    }   
}
recipe.textContent = 'Loading...';

// Call the function to fetch and display the recipe
//arrow function
const loadRecipe = document.getElementById('recipe-button');
loadRecipe.addEventListener('click', () => {
    getRecipe();
});

getRecipe();