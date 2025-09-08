const $ = (sel) => document.querySelector(sel);

document.addEventListener('DOMContentLoaded', function() {
    // Get the bird ID from the URL
    // Example: birddetail.html?id=1234567890 
    const urlParams = new URLSearchParams(window.location.search);
    const birdId = urlParams.get('id');
    
    // If no ID in URL, show error
    if (!birdId) {
        document.body.innerHTML = '<h1>Error: No se especificó qué ave mostrar</h1>';
        return;
    }
    
    // Get all birds from localStorage
    const savedBirds = JSON.parse(localStorage.getItem('birds') || '[]');
    
    // Find the specific bird by ID
    const bird = savedBirds.find(b => b.id == birdId);
    
    // If bird not found, show error
    if (!bird) {
        document.body.innerHTML = '<h1>Error: Ave no encontrada</h1>';
        return;
    }
    
    // Show the bird details
    // You'll need to create these elements in your birddetail.html
    const birdTitle = $('#bird-title');
    const birdImage = $('#bird-image');
    const birdDescription = $('#bird-description');
    
    if (birdTitle) birdTitle.textContent = bird.name;
    if (birdImage) {
        birdImage.src = bird.image;
        birdImage.alt = bird.name;
    }
    if (birdDescription) birdDescription.textContent = bird.description;
    
    console.log('Showing bird:', bird);
});