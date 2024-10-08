
const introScreen = document.getElementById('introScreen');
const gameScreen = document.getElementById('gameScreen');
const startButton = document.getElementById('startBtn');
const resetButton = document.getElementById('resetBtn');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
var WIDTH = canvas.width = 900;
var HEIGHT = canvas.height = 600;

var gameStarted = false;


var colorArray = [
    'blue',
    'green',
    'red'
]
var maxRad = 40;
var minRad = 5;
var lives = 3;
var score = 0;
var gameOver = false;

var mouse = {
    x: undefined,
    y: undefined
}

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
function resetGame() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    gameStarted = false;
    gameOver = false;
}

function Circle(x, y, r, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.r = r;
    this.color = color;
    this.blasted = false;
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    this.update = function () {
        if (this.x + this.r > WIDTH || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > HEIGHT || this.y - this.r < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        if (this.blasted) return;
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.r < maxRad) {
                this.r += 1;
            }
        }
        else if (this.r > minRad) {
            this.r -= 1;
        }
        if (this.r >= maxRad) {
            this.blasted = true;
            this.blast();
        }
        this.draw();
    }
    this.blast = function () {
        if (this.color === 'blue') {
            score += 10;
        } else if (this.color === 'green') {
            score += 20;
        } else if (this.color === 'red') {
            lives -= 1;
        }

        if (lives <= 0) {
            gameOver = true;
        }
        var index = circleArray.indexOf(this);
        if (index > -1) {
            circleArray.splice(index, 1);
        }

        for (var i = 0; i < 10; i++) {
            var x = Math.random() * WIDTH;
            var dx = (Math.random() - 0.5) * 2;
            var dy = (Math.random() - 0.5) * 3;
            var y = Math.random() * HEIGHT;
            var r = Math.random() * 3 + 1;
            var color = colorArray[Math.floor(Math.random() * colorArray.length)];
            circleArray.push(new Circle(x, y, r, dx, dy, color));
        }
    }

}
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x - canvas.offsetLeft;
    mouse.y = event.y - canvas.offsetTop;
});

var circleArray = [];
function initCircles() {
    for (var i = 0; i < count; i++) {
        var x = Math.random() * WIDTH;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 3;
        var y = Math.random() * HEIGHT;
        var r = Math.random() * 3 + 1;
        var color = colorArray[Math.floor(Math.random() * colorArray.length)];
        circleArray.push(new Circle(x, y, r, dx, dy, color));
    }
}

initCircles(200);

showIntro();