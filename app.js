var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
cvs.setAttribute("height", window.innerHeight - 4);
cvs.setAttribute("width", window.innerWidth);

var bird = new Image(150, 100);
var bird_fly = new Image(150, 100);
var bg = new Image();
var fish = new Image(75, 75);

bird.src = "./Images/bird_close.png";
bird_fly.src = "./Images/bird_open.png";
bg.src = "./Images/SunsetDrawing.jpg";
fish.src = "./Images/dive.png";

var fly = new Audio();
var scor = new Audio();
fly.src = "Sounds/fly.mp3";
scor.src = "Sounds/score.mp3";

var gravity = 1.5;
var score = 0;
var bX = 10;
var bY = 150;

var birdSizeX = 150;
var birdSizeY = 100;
var fishSizeX = 75;
var fishSizeY = 75;

document.addEventListener("keydown", moveUp);
document.addEventListener("keyup", flap);

function flap() {
  time = 10;
}
function moveUp() {
  if (bY <= 0) {
    bY = 0;
  }
  bY -= 25;
  time = 11;
  fly.play();
}

// array to store the coordinates of future fish
var fishCoord = [];

fishCoord[0] = {
  x: cvs.width,
  y: 0
};

// variables to make the wings flap
var flap_speed = 5;
var time = 0;

var reqId;

function draw() {
  ctx.drawImage(bg, 0, 0, cvs.width, cvs.height);

  for (var i = 0; i < fishCoord.length; i++) {
    ctx.drawImage(fish, fishCoord[i].x, fishCoord[i].y, fishSizeX, fishSizeY);
    fishCoord[i].x -= 2;
    fishCoord[i].y += 0.2;
    if (fishCoord[i].x == cvs.width - 300) {
      fishCoord.push({
        x: cvs.width,
        y: Math.floor(Math.random() * (300 - 100) + 100)
      });
    }

    // Bird eats fish
    if (
      bX + bird.width >= fishCoord[i].x &&
      bX + bird.width <= fishCoord[i].x + fish.width &&
      bY <= fishCoord[i].y + fish.height && bY + bird.height >= fishCoord[i].y
    ) {
      score++;
      console.log(score);
      scor.play();
      fishCoord.splice(i, 1);
    }
    // Bird falls in water
    else if (bY + bird.height > cvs.height - 150) {
      window.cancelAnimationFrame(reqId);
      message();
      return;
    }
  }

  // Ternary operator used to flap wings based on modulo function
  time % flap_speed === 0
    ? ctx.drawImage(bird, bX, bY, birdSizeX, birdSizeY)
    : ctx.drawImage(bird_fly, bX, bY, birdSizeX, birdSizeY);

  // the following will activate gravity on the bird
  bY += gravity;

  // Score indicator
  ctx.fillStyle = "white";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : " + score, 10, 25);
  reqId = requestAnimationFrame(draw);
}

function Start() {
  document.getElementById("menu").style.display = "none";
  draw();
}

function message() {
  location.href = "GameOver.html";
}

function reload() {
  location.href = "index.html";
}

function Instruct() {
  location.href = "Instructions.html";
}

function About() {
  location.href = "About.html";
}
