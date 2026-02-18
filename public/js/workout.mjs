// import utils header footer function
import loadHeaderFooter from './utils.mjs';

// Load header and footer
loadHeaderFooter();

// import workout api into sectoin cards
const workoutInfo = document.getElementById('workouts');
async function getWorkouts() {
    try {
        const response = await fetch("https://wger.de/api/v2/exercise/");
        const data = await response.json();
        console.log(data);
        data.results.forEach(exercise => {
            const exerciseName = exercise.name || 'Unnamed Exercise';
            // Strip HTML tags from description or show a default message
            const exerciseDescription = exercise.description 
                ? exercise.description.replace(/<[^>]*>/g, '').trim() || 'No description available'
                : 'No description available';
            
            workoutInfo.innerHTML += `
                <div class="workout-card">
                    <h3>${exerciseName}</h3>
                    <p>${exerciseDescription}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error fetching workout data:', error);
        workoutInfo.innerHTML = '<p>Sorry, we couldn\'t fetch the workout information at this time. Please try again later.</p>';
    }
}

getWorkouts();

