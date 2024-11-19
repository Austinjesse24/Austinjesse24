let score = 0;
let activeHole = null;
let gameInterval = null;
let moleTimeout = 1000;
const whackSound = new Audio('whack.mp3'); // Whack sound effect

function startGame() {
    score = 0;
    moleTimeout = 500;
    document.getElementById('score').textContent = score;
    document.getElementById('overlay').classList.add('hidden');
    document.getElementById('progress').style.animation = 'countdown 30s linear forwards';
    clearInterval(gameInterval);

    gameInterval = setInterval(() => {
        showMole();
        if (moleTimeout > 500) moleTimeout -= 100; // Speed up mole appearance over time
    }, moleTimeout);

    setTimeout(() => {
        clearInterval(gameInterval);
        document.getElementById('final-score').textContent = score;
        document.getElementById('overlay').classList.remove('hidden');
    }, 30000); // Game lasts 30 seconds
}

function showMole() {
    if (activeHole !== null) {
        document.getElementById(`hole${activeHole}`).innerHTML = '';
    }

    activeHole = Math.floor(Math.random() * 9) + 1;
    document.getElementById(`hole${activeHole}`).innerHTML = '<img src="whack-a-mole.webp" alt="mole" class="mole">';
}

function whackMole(holeId) {
    if (holeId === activeHole) {
        score++;
        whackSound.play();
        document.getElementById('score').textContent = score;
        document.getElementById('score').classList.add('increase');
        setTimeout(() => document.getElementById('score').classList.remove('increase'), 200);
        document.getElementById(`hole${activeHole}`).innerHTML = '';
        activeHole = null;
    }
}
