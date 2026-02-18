import loadHeaderFooter from '../js/utils.mjs';

// Load header and footer
loadHeaderFooter();


// Subscribe form functionality
/* This code adds an event listener to the subscribe button on the subscription page. 
When the button is clicked, it retrieves the email address entered by the user, checks if it's valid (not empty), 
and then displays a thank you message. If the email input is empty, it prompts the user to enter a valid email address. 
After a successful subscription, it also clears the input field for better user experience.
*/
const subscribeButton = document.getElementById('subscribe-button');
subscribeButton.addEventListener('click', () => {
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    if (email) {
        alert(`Thank you for subscribing with ${email}!`);
        emailInput.value = '';
    } else {
        alert('Please enter a valid email address.');
    }   
});

