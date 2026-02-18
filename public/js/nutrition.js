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
            if (ingredient && ingredient.trim() !== '') {
                mealIngredients.push(`${measure} ${ingredient}`.trim());
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
        if (nutritionInfo) {
            nutritionInfo.innerHTML = '<p>Sorry, we couldn\'t fetch the nutrition information at this time. Please try again later.</p>';
        }
    }
}

const loadRecipe = document.getElementById('recipe-button');
if (loadRecipe) {
    loadRecipe.addEventListener('click', () => {
        getNutrition();
    });
} else {
    console.warn('Load recipe button (`recipe-button`) not found.');
}

// Load initial recipe
getNutrition();

// Save recipe functionality
const saveButton = document.getElementById('save-recipe');
if (saveButton) {
    saveButton.addEventListener('click', () => {
        if (!nutritionInfo) {
            alert('Nutrition section not found.');
            return;
        }

        const h2 = nutritionInfo.querySelector('h2');
        if (!h2) {
            alert('No recipe loaded to save.');
            return;
        }
        const mealName = h2.textContent.trim();

        const mealImageEl = nutritionInfo.querySelector('.meal-image');
        const mealImage = mealImageEl ? mealImageEl.src : '';

        // Safely extract Category and Area from <p><strong>Label:</strong> value</p>
        let mealCategory = '';
        let mealArea = '';
        const pElements = Array.from(nutritionInfo.querySelectorAll('p'));
        pElements.forEach(p => {
            const strong = p.querySelector('strong');
            if (!strong) return;
            const label = strong.textContent.replace(':', '').trim().toLowerCase();
            const value = p.textContent.replace(strong.textContent, '').trim();
            if (label === 'category') mealCategory = value;
            if (label === 'area') mealArea = value;
        });

        // Instructions: find the H3 that says "Instructions" and get its next element sibling
        const instrHeading = Array.from(nutritionInfo.querySelectorAll('h3')).find(h => /instructions/i.test(h.textContent));
        const mealInstructionsEl = instrHeading ? instrHeading.nextElementSibling : nutritionInfo.querySelector('h3 + p');
        const mealInstructions = mealInstructionsEl ? mealInstructionsEl.textContent.trim() : '';

        const mealIngredients = Array.from(nutritionInfo.querySelectorAll('ul li')).map(li => li.textContent.trim());

        const recipeData = {
            name: mealName,
            image: mealImage,
            category: mealCategory,
            area: mealArea,
            instructions: mealInstructions,
            ingredients: mealIngredients
        };

        console.log('Saving recipe:', recipeData);
        const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
        if (!savedRecipes.includes(mealName)) {
            savedRecipes.push(mealName);
            localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
            localStorage.setItem(`recipe_${mealName}`, JSON.stringify(recipeData));
            alert(`Recipe "${mealName}" saved!`);
        } else {
            alert(`Recipe "${mealName}" is already saved.`);
        }
    });
} else {
    console.warn('Save button (`save-recipe`) not found in the DOM.');
}

