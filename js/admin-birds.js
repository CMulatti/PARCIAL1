export const $ = (sel) => document.querySelector(sel);

// DOMContentLoaded makes JS wait until the HTML is fully loaded before running 
document.addEventListener('DOMContentLoaded', function() {
    
    $('#btn-save-bird').addEventListener('click', () => {
        // Get bird form data
        const name = $('#birdname').value.trim();
        const description = $('#birddescription').value.trim();
        const imageFile = $('#birdpic').files[0]; // Get first file from array
        
        //VALIDATIONS
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
        
        //INSTEAD OF LISTING BIRDS, WE WILL SAVE THE BIRD AS AN OBJECT IN LOCAL STORAGE
        // We need to convert bird pic to base64 so we can store it, raw images can't be stored directly, so converting it is a must
        // STEP 1: DEFINE WHAT WILL HAPPEN WHEN THE FILE IS READY (LIKE CHOOSING A WASHING PROGRAM ON A WASHING MACHINE)
        const reader = new FileReader(); //FileReader is an in-built browser API to read files and extract out their content for further usage*/
        reader.onload = function(e) {
            // Create a JS bird object
            const newBird = {
                id: Date.now(), // Simple unique ID using timestamp
                name: name,
                description: description,
                image: e.target.result // This contains the bird pic encoded as a string(the image as base64)
            };
            
            // Get existing birds from localStorage (or empty array instead of 'null' if there is nth yet)
            let savedBirds = JSON.parse(localStorage.getItem('birds') || '[]'); //localStorage only saves strings, JSON.parse converts that string back into a real JS array
            
            // Add our new bird object to the array of previously saved birds
            savedBirds.push(newBird);
            
            // We put the updated array back into localStorage
            localStorage.setItem('birds', JSON.stringify(savedBirds)); //since local storage only stores strings, we use JSON.stringify() to turn the array into a JSON string. Here we take the savedBirds array of objects and store it in the browser’s localStorage under the key "birds".
            
            console.log('Bird saved:', newBird);
            alert('Ave guardada exitosamente! Ahora aparecerá en la página principal.');
            
            // Clear the form
            $('#birdname').value = '';
            $('#birddescription').value = '';
            $('#birdpic').value = '';
        };
        //STEP 2: START THE PROCESS (reader.readAsDataURL(...) IS LIKE STARTING THE WASHING MACHINE)
        // Start reading the image file
        reader.readAsDataURL(imageFile); //readAsData is a method of the in-built FileReader API
 


    });
});