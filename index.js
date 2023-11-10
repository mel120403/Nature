const natureButtons = document.querySelectorAll('.nature-button');
const messageDiv = document.getElementById('message');
const hintDiv = document.getElementById('hint');
const scoreDiv = document.getElementById('score');
const natureSounds = document.querySelectorAll('audio');

let score = 0;

function playNatureSound(event) {
    const keyCode = event.target.dataset.key;
    const natureSound = document.querySelector(`audio[data-key="${keyCode}"]`);
    const nature = event.target.dataset.nature;
    const imagePath = `images/${nature.toLowerCase()}.png`;

    const natureImage = new Image();
    natureImage.src = imagePath;
    natureImage.onload = () => {
        messageDiv.innerHTML = `Click on the button or press '${event.key}' to play the sound<br>${nature}`;
        messageDiv.appendChild(natureImage);
        natureSound.currentTime = 0;
        natureSound.play();

        // Display hint after a delay
        setTimeout(() => {
            showHint(nature);
        }, 2000);
    };
}

function showHint(nature) {
    // Provide hints based on nature sound
    let hint = '';
    switch (nature.toLowerCase()) {
        case 'water':
            hint = 'Hint: The sound of flowing water, like rivers or streams.';
            break;
        case 'fire':
            hint = 'Hint: The crackling sound of fire, like a campfire or fireplace.';
            break;
        case 'birds':
            hint = 'Hint: The chirping and singing of birds in nature.';
            break;
        case 'wind':
            hint = 'Hint: The sound of wind blowing through trees or across open spaces.';
            break;
    }

    hintDiv.textContent = hint;
}

natureButtons.forEach(button => {
    button.addEventListener('click', playNatureSound);
});

window.addEventListener('keydown', function (event) {
    const natureButton = document.querySelector(`.nature-button[data-key="${event.keyCode}"]`);
    if (natureButton) {
        natureButton.click();
    }
});

// Update score and reset hint after each correct answer
natureSounds.forEach(sound => {
    sound.addEventListener('ended', function () {
        score++;
        scoreDiv.textContent = `Score: ${score}`;
        hintDiv.textContent = '';
    });
});
