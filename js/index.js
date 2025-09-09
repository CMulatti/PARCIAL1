const $ = (sel) => document.querySelector(sel);

document.addEventListener('DOMContentLoaded', function() {
    // Get birds from localStorage by reading its key ('birds') and transform them into JS array of bird objects
    const savedBirds = JSON.parse(localStorage.getItem('birds') || '[]'); 
    // Find where to put the bird cards
    const birdGallery = $('.bird-gallery');
    
    // If no birds, show a message
    if (savedBirds.length === 0) { //=== is for strict equality (equality of value AND equality of type. It is asking 'Is savedBirds.length a number?''Is it exactly equal to the number 0?'If both are true → condition passes. If only == was used, JS would say 'Well, maybe I can convert something into a number first and then compare'. Using === is a best practice to avoid surprises in other comparisons.
        birdGallery.innerHTML = '<p>No hay aves registradas aún. El administrador debe agregar algunas!</p>'; //innerHTML is an in-built property of any DOM element in JS. It tells the browser “Replace all the inside content of this element with the HTML string I’m giving you.”. By using innerHTML we can dynamically add the message only when needed.
        return;
    }
    
    // Create a card for each bird
    savedBirds.forEach(bird => {
        // Create the card container
        const birdCard = document.createElement('div');
        birdCard.className = 'bird-card';
        
        // Add the bird image. We create an image element and point it to the base64 data URL we saved earlier
        const birdImage = document.createElement('img');
        birdImage.src = bird.image; //here bird.image is the base64 string saved earlier, our image turned into text
        birdImage.alt = bird.name; //If the picture doesn’t show up, display the bird’s name as a fallback.
        
        // Create a title for the card using the bird's name
        const birdName = document.createElement('h3');
        birdName.textContent = bird.name;
        
        // Make the card clickable by adding a click event to go to detail page
        birdCard.addEventListener('click', () => {
            window.location.href = `birddetail.html?id=${bird.id}`; // we pass the bird's unique ID in the query string. Later in bird detail, we will read this using URLSearchParams
        });
        
        // Put image and name inside the card
        birdCard.appendChild(birdImage);
        birdCard.appendChild(birdName);
        
        // Add the card to the gallery
        birdGallery.appendChild(birdCard);
    });
});