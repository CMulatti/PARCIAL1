const $ = (sel) => document.querySelector(sel);

document.addEventListener('DOMContentLoaded', function() {
    // Get the bird ID from the URL
    // Example: birddetail.html?id=1234567890 
    const urlParams = new URLSearchParams(window.location.search); //window.location.search gives us the part of the URL after the ?, e.g. ?id=1234567890.
    const birdId = urlParams.get('id');
    
    // If no ID in URL, show error
    if (!birdId) {
        document.body.innerHTML = '<h1>Error: No se especificó qué ave mostrar</h1>';
        return;
    }
    
    // Get all birds from localStorage
    const savedBirds = JSON.parse(localStorage.getItem('birds') || '[]');   //Try to get "birds" from localStorage. If nothing is found, uses '[]' (an empty array in string form). Then, JSON.parse turns that string into a real JS array.
    
    // Find the specific bird by ID 
    const bird = savedBirds.find(b => b.id == birdId); //Take one element (b) from the array, Compare its id to the birdId from the URL. If equal return true.
    
    // If bird not found, show error
    if (!bird) {
        document.body.innerHTML = '<h1>Error: Ave no encontrada</h1>';
        return;
    }
    
    // Show the bird details
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