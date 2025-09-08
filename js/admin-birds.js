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
        
        // go to inspect > console and see the message, alert is the popup window
        console.log('Bird data:', { name, description, imageFile });
        alert('Ave guardada exitosamente!');
        
        // When success, clear the form
        $('#birdname').value = '';
        $('#birddescription').value = '';
        $('#birdpic').value = '';


         //LOGIC TO DISPLAY BIRD OBJECT UNDER 'AVES GUARDADAS' 
        // Create a container div for bird entry, it's like the li we studied in class
        const birdEntry = document.createElement('div');
        birdEntry.style.marginBottom = '10px';
        birdEntry.style.display = 'flex';
        birdEntry.style.alignItems = 'center';
        birdEntry.style.gap = '10px';
        
        // Create span for bird name
        const birdNameSpan = document.createElement('span');
        birdNameSpan.textContent = name;
        birdNameSpan.style.fontWeight = 'bold';
        
        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'pill';
        
        // Add click event to delete button
        deleteButton.addEventListener('click', () => {
            if (confirm(`¿Estás seguro de que quieres eliminar "${name}"?`)) {
                birdEntry.remove(); // Remove the entire bird entry from the DOM
            }
        });
        
        // Append name and button to the bird entry
        birdEntry.appendChild(birdNameSpan);
        birdEntry.appendChild(deleteButton);
        
        // Append the bird entry to the saved birds list
        $('#saved-birds-list').appendChild(birdEntry);

 


    });
});
