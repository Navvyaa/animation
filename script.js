
const introScreen = document.getElementById('introScreen');
const gameScreen = document.getElementById('gameScreen');
const startButton = document.getElementById('startBtn');
const resetButton = document.getElementById('resetBtn');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
var WIDTH = canvas.width = 900;
var HEIGHT = canvas.height = 600;

var gameStarted = false;


var colorArray= [
    'blue',
    'green',
    'red'
]
var maxRad = 40;
var minRad = 5;
var lives = 3;
var score = 0;
var gameOver = false;

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

function showIntro() {
    introScreen.style.display = 'block';
    gameScreen.style.display = 'none';
}
function startGame() {
    introScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
    gameStarted = true;
    gameOver = false;
    resetGame();
    animate();
}
function resetGame(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT); 
    gameStarted = false;
    gameOver = false;
}

showIntro();