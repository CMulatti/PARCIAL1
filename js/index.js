const $ = (sel) => document.querySelector(sel);

document.addEventListener('DOMContentLoaded', function() {
    // Get birds from localStorage and transform then into JS array of bird objects
    const savedBirds = JSON.parse(localStorage.getItem('birds') || '[]'); 
    // Find where to put the bird cards
    const birdGallery = $('.bird-gallery');
    
    // If no birds, show a message
    if (savedBirds.length === 0) {
        birdGallery.innerHTML = '<p>No hay aves registradas aún. El administrador debe agregar algunas!</p>';
        return;
    }
    
    // Create a card for each bird
    savedBirds.forEach(bird => {
        // Create the card container
        const birdCard = document.createElement('div');
        birdCard.className = 'bird-card'; // Use CSS class instead of inline styles
        
        // Add the bird image
        const birdImage = document.createElement('img');
        birdImage.src = bird.image;
        birdImage.alt = bird.name;
        
        // Add the bird name
        const birdName = document.createElement('h3');
        birdName.textContent = bird.name;
        
        // Add click event to go to detail page
        birdCard.addEventListener('click', () => {
            // Go to bird detail page with the bird's ID
            window.location.href = `birddetail.html?id=${bird.id}`;
        });
        
        // Put image and name inside the card
        birdCard.appendChild(birdImage);
        birdCard.appendChild(birdName);
        
        // Add the card to the gallery
        birdGallery.appendChild(birdCard);
    });
});