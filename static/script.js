let startingWord
var len = -1
var wrongLetters = ""

async function generateStartingWord() {
    try {
        const response = await fetch('/random_word');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.text();
        generateUnderscores(data.length);
        
        // Assign the fetched word to the global variable startingWord
        startingWord = data;

    } catch (error) {
        console.error('Error fetching random word:', error);
        startingWord = 'Error fetching random word';
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    try {
        await generateStartingWord();
        
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



function revealUnderscore(index, keyPressed) {
    const boxes = document.querySelectorAll('#underscores .box');

    if (index.length === 0 && /^[a-zA-Z]$/.test(keyPressed)) {
        keyPressed = keyPressed.toUpperCase()
        if (!wrongLetters.includes(keyPressed))
            wrongLetters += keyPressed
            wrongLetters = wrongLetters.split('').sort().join('')
        return
    }
    

    for (let i of index) {
        if (boxes.length > i) {
            boxes[i].textContent = startingWord[i].toUpperCase()
            boxes[i].style.borderColor = '#6c757d'
            len-- //Decrement len to count reveald letters
        } else {
            console.error(`Box at index ${i} does not exist.`);
        }
    }

    let allBoxesFilled = true; 

    for (let j = 0; j < startingWord.length; j++) {
        if (boxes[j] && boxes[j].textContent === '') {
            allBoxesFilled = false;
            break
        }
    }
    if (allBoxesFilled) {
        console.log("GJ, You WIN");
        document.removeEventListener('keydown', handleKeyPress);
        showWinMessage()
    }
}

function findIndexesOfChar(char) {
    const indexes = [];
    if (startingWord) {
        for (let i = 0; i < startingWord.length; i++) {
            if (startingWord[i] === char) {
                indexes.push(i);
            }
        }
    }
    return indexes;
}

function handleKeyPress(event) {
    // Get the pressed key from the event
    const keyPressed = event.key;

    // Check if the pressed key is a lowercase letter
    if (/[a-zA-Z]/.test(keyPressed)) {
        revealUnderscore(findIndexesOfChar(keyPressed), keyPressed)
        updateWrongLetters()
    }
}

document.addEventListener('keydown', handleKeyPress);

document.addEventListener('DOMContentLoaded', function() {
    const keyPressed = document.getElementById('keyboardWorkaround');
    
    // if (keyPressed) {
    //     keyPressed.value = ''; // Check if element exists before setting its value
    // } else {
    //     console.error("Element with ID 'keyboardWorkaround' not found.");
    // }
});


function updateWrongLetters() {
    const div = document.getElementById('wrongLetters');
    if (div) {
        div.textContent = wrongLetters; // Set the text content of the div to wrongLetters
    } else {
        console.error(`Box at index ${index} does not exist.`);
    }
}

function showWinMessage() {
    // Hide the container with the class 'letters'
    const lettersContainer = document.querySelector('.letters');
    if (lettersContainer) {
        lettersContainer.style.display = 'none';
    }

    // Show the win message
    const winMessage = document.getElementById('winMessage');
    const wordMessage = document.getElementById('wordMessage');
    const wrongMessage = document.getElementById('wrongMessage')
    if (winMessage && wordMessage) {
        winMessage.style.display = 'block';
        setTimeout(() => {
            wordMessage.innerHTML = `The word was ${startingWord.toUpperCase()}!`;
            wordMessage.style.display = 'block';
        }, 750);
        if (wrongLetters.length == 0) {
            setTimeout(() => {
                wrongMessage.innerHTML = `You have used no wrong letters`;
                wrongMessage.style.display = 'block';
                wrongMessage.style.color = 'lightgreen'
            }, 1500);
        }
        else if (wrongLetters.length == 1){
            setTimeout(() => {
            wrongMessage.innerHTML = `You have used  only ${wrongLetters.length} wrong letter`;
            wrongMessage.style.display = 'block';
            wrongMessage.style.color = 'lightgreen'
        }, 1500);
    }
        else if (wrongLetters.length < 6){
            setTimeout(() => {
            wrongMessage.innerHTML = `You have used ${wrongLetters.length} wrong letters`;
            wrongMessage.style.display = 'block';
            wrongMessage.style.color = 'lightgreen'
        }, 1500);
        }
        else {
            setTimeout(() => {
            wrongMessage.innerHTML = `You have used ${wrongLetters.length} wrong letters`;
            wrongMessage.style.display = 'block';
        }, 1500);
    }
        

    }
}