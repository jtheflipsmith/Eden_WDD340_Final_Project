import loadHeaderFooter from '../js/utils.mjs';

// Load header and footer
loadHeaderFooter();

const nutritionInfo = document.getElementById('nutrition-section');
async function getNutrition() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const meal = data.meals[0];
        const mealName = meal.strMeal;
        const mealImage = meal.strMealThumb;
        const mealCategory = meal.strCategory;
        const mealArea = meal.strArea;
        const mealInstructions = meal.strInstructions;
        const mealIngredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient) {
                mealIngredients.push(`${measure} ${ingredient}`);
            } else {
                break;
            }
        }
        nutritionInfo.innerHTML = `
            <h2>${mealName}</h2>
            <img src="${mealImage}" alt="${mealName}" class="meal-image">
            <p><strong>Category:</strong> ${mealCategory}</p>
            <p><strong>Area:</strong> ${mealArea}</p>
            <h3>Ingredients:</h3>
            <ul>
                ${mealIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <h3>Instructions:</h3>
            <p>${mealInstructions}</p>
        `;
    } catch (error) {
        console.error('Error fetching nutrition data:', error);
        nutritionInfo.innerHTML = '<p>Sorry, we couldn\'t fetch the nutrition information at this time. Please try again later.</p>';
    }   
}


const loadRecipe = document.getElementById('recipe-button');
loadRecipe.addEventListener('click', () => {
    getNutrition();
});

getNutrition();