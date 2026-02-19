export function renderWithTemplate(template, parentElement, data, callback) {
parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
};

// Helper function to load HTML templates
async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

//dynamically load header and footer
//This function is imported and called in each page's JavaScript file to load the header and footer templates into the respective elements on the page.
export default async function loadHeaderFooter(){

  const headerTemplate = await loadTemplate('/partials/header.html');
  const footerTemplate = await loadTemplate('/partials/footer.html');

  const headerElement = document.getElementById('main-header')
  const footerElement = document.getElementById('main-footer')

 await renderWithTemplate(headerTemplate, headerElement);
 await renderWithTemplate(footerTemplate, footerElement);
}

      // Hamburger menu functionality
  const hamButton = document.getElementById('ham-button');
  const navElement = document.getElementById('nav-links');

  // create an event listener for the button that will open and close menu links
  export function setupHamburgerMenu() {
    hamButton.addEventListener('click', () => { // 'click' targets the action of clicking
      navElement.classList.toggle("open");
      hamButton.classList.toggle("open");
  });
}