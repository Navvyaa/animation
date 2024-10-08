
const introScreen = document.getElementById('introScreen');
const gameScreen = document.getElementById('gameScreen');
const startButton = document.getElementById('startBtn');
const resetButton = document.getElementById('resetBtn');
const homeButton = document.getElementById('homeBtn');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
var WIDTH = canvas.width = 900;
var HEIGHT = canvas.height = 600;

var colorArray = [
    'blue',
    'green',
    'red'
]

let animationId;
var maxRad = 40;
var minRad = 5;
var lives = 3;
var score = 0;
var gameOver = false;
var gameStarted = false;


startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
homeButton.addEventListener('click',showIntro);

function showIntro() {
    introScreen.style.display = 'block';
    gameScreen.style.display = 'none';
}

function startGame() {
    cancelAnimationFrame(animationId);
    introScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
    gameStarted = true;
    gameOver = false;
    resetGame();
}
function resetGame() {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    gameStarted = true;
    gameOver = false;
    lives=3;
    score=0;
    circleArray=[];
    initCircles(150);
    animate();
    // showIntro();
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
        if (mouse.x - this.x < 40 && mouse.x - this.x > -40 &&
            mouse.y - this.y < 40 && mouse.y - this.y > -40) {
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

        for (var i = 0; i < 5; i++) {
            var x = Math.random() * WIDTH;
            var dx = (Math.random() - 0.5) * 2;
            var dy = (Math.random() - 0.5) * 2;
            var y = Math.random() * HEIGHT;
            var r = Math.random() * 3 + 1;
            var color = colorArray[Math.floor(Math.random() * colorArray.length)];
            circleArray.push(new Circle(x, y, r, dx, dy, color));
        }
    }

}

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x - canvas.offsetLeft;
    mouse.y = event.y - canvas.offsetTop;
});

var circleArray = [];
function initCircles(count) {
    for (var i = 0; i < count; i++) {
        var x = Math.random() * WIDTH;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;
        var y = Math.random() * HEIGHT;
        var r = Math.random() * 3 + 1;
        var color = colorArray[Math.floor(Math.random() * colorArray.length)];
        circleArray.push(new Circle(x, y, r, dx, dy, color));
    }
}


function animate() {
    if (gameOver) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = 'rgb(255, 153, 0)';
        ctx.font = "100px Spicy Rice";
        ctx.fillText("Game Over", WIDTH / 2 - 255, HEIGHT / 2);
        ctx.fillText("Score: " + score, WIDTH / 2 -260, HEIGHT / 2 + 100);
        return;
    }

    animationId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = 'black';
    ctx.font = "20px Spicy Rice" ;
    ctx.fillText("Lives: " + lives, 20, 40);
    ctx.fillText("Score: " + score, WIDTH - 120, 40);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
showIntro();
initCircles(150);
animate();
