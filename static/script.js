async function generateStartingWord() {
    try {
        const response = await fetch('/random_word');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.text();
        generateUnderscores(data.length);
        
        // Return the generated word for further use
        return data;

    } catch (error) {
        console.error('Error fetching random word:', error);
        return 'Error fetching random word';
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Wait for generateStartingWord to complete and get the starting word
        const startingWord = await generateStartingWord();
        
        // Now you have the startingWord variable available
        console.log(startingWord);

        // You can use startingWord here or pass it to other functions as needed
        
    } catch (error) {
        console.error('Error initializing:', error);
    }
});

function generateUnderscores(wordLength) {
    const container = document.getElementById('underscores');

    if (container === null) {
        console.error("Container with ID 'underscores' not found.");
        return;
    }

    container.innerHTML = '';

    for (let i = 0; i < wordLength; i++) {
        const div = document.createElement('div');
        div.classList.add('box');
        container.appendChild(div);
    }
}


function giveBoxValue(index, value) {
    const boxes = document.querySelectorAll('#underscores .box');

    if (boxes.length > index) {
        boxes[index].textContent = value;
        boxes[index].style.borderBottom = 'none';
    } else {
        console.error(`Box at index ${index} does not exist.`);
    }
}

