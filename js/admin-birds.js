export const $ = (sel) => document.querySelector(sel);

// DOMContentLoaded makes JS wait until the HTML is fully loaded before running 
document.addEventListener('DOMContentLoaded', function() {
    
    $('#btn-save-bird').addEventListener('click', () => {
        // Get bird form data
        const name = $('#birdname').value.trim();
        const description = $('#birddescription').value.trim();
        const imageFile = $('#birdpic').files[0]; // Get first file from array
        
        // Check if name is filled
        if (!name) {
            alert('Por favor ingresa el nombre del ave.');
            return;
        }

        /* Check if there are any nums in the name:
        /\d/ is a regular expression that matches any digit 
        .test(name) returns TRUE is any digit is found in the name
           */
        if (/\d/.test(name)) {
            alert('El nombre del ave no puede contener números!');
            return;
        }
        
        // Check is description is filled
        if (!description) {
            alert('Por favor ingresa la descripción!');
            return;
        }
        
        // Check if image is loaded
        if (!imageFile) {
            alert('Por favor selecciona una imagen!');
            return;
        }
        

        // Convert image to base64 so we can store it
        const reader = new FileReader();
        reader.onload = function(e) {
            // Create the bird object
            const newBird = {
                id: Date.now(), // Simple unique ID using timestamp
                name: name,
                description: description,
                image: e.target.result // This is the image as base64
            };
            
            // Get existing birds from localStorage (or empty array if none)
            let savedBirds = JSON.parse(localStorage.getItem('birds') || '[]');
            
            // Add our new bird to the array
            savedBirds.push(newBird);
            
            // Save back to localStorage
            localStorage.setItem('birds', JSON.stringify(savedBirds));
            
            console.log('Bird saved:', newBird);
            alert('Ave guardada exitosamente! Ahora aparecerá en la página principal.');
            
            // Clear the form
            $('#birdname').value = '';
            $('#birddescription').value = '';
            $('#birdpic').value = '';
        };
        
        // Start reading the image file
        reader.readAsDataURL(imageFile);
 


    });
});