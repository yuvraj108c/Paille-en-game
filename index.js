const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

cvs.setAttribute("height", window.innerHeight - 4);
cvs.setAttribute("width", window.innerWidth);

let bird_open = new Image();
let bird_close = new Image();
let bg = new Image();

bird_open.src = "./Images/bird_open.png";
bird_close.src = "./Images/bird_close.png";
bg.src = "./Images/SunsetDrawing.jpg";

const birdSizeX = 150;
const birdSizeY = 100;

let bX = 100;
let bY = 100;

let flap_const = 10;
let flap_speed = 5;

(function loop() {
  draw();
  flap_const == (flap_const == 10 ? 11 : 10);

  requestAnimationFrame(loop);
})();

function draw() {
  ctx.drawImage(bg, 0, 0, cvs.width, cvs.height);
  flap_const === 10
    ? ctx.drawImage(bird_close, bX, bY, birdSizeX, birdSizeY)
    : ctx.drawImage(bird_open, bX, bY, birdSizeX, birdSizeY);
}
