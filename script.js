
const introScreen = document.getElementById('introScreen');
const gameScreen = document.getElementById('gameScreen');
const startButton = document.getElementById('startBtn');
const resetButton = document.getElementById('resetBtn');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
var WIDTH = canvas.width = 900;
var HEIGHT = canvas.height = 600;

let gameStarted = false;


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

