const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

cvs.setAttribute("height", window.innerHeight - 4);
cvs.setAttribute("width", window.innerWidth);

let bird = new Image();
let bg = new Image();

bg.src = "./Images/SunsetDrawing.jpg";
bird.src = "./Images/bird_sprite.png";

var flySound = new Audio();
flySound.src = "Sounds/fly.mp3";

let bX = 0;
let bY = 0;
let birdSizeX = 459;
let birdSizeY = 150;

let time = 0;
let speed = 5;

setInterval(() => {
  time++;
  ctx.clearRect(bX, bY, birdSizeX, birdSizeY);
  drawBird();
}, 100);

function drawBird() {
  ctx.drawImage(bg, 0, 0, cvs.width, cvs.height);
  ctx.drawImage(
    bird,
    time % speed == 0 ? bX : bX + birdSizeX / 2,
    bY,
    birdSizeX / 2,
    birdSizeY,
    0,
    0,
    birdSizeX / 2,
    birdSizeY
  );
  flySound.play();
}
