const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

cvs.setAttribute("height", window.innerHeight);
cvs.setAttribute("width", window.innerWidth);

let bird = new Image();
let bg = new Image();
let fish = new Image();

bg.src = "./Images/SunsetDrawing.jpg";
bird.src = "./Images/bird_sprite.png";
fish.src = "./Images/dive.png";

var flySound = new Audio();
flySound.src = "Sounds/fly.mp3";

let bX = 0;
let bY = 0;

let birdSizeX = 459;
let birdSizeY = 150;
var fishSizeX = 75;
var fishSizeY = 75;

let time = 0;
let speed = 10;
let createFish = true;

let fishCoord = [
  {
    x: Math.floor(Math.random() * (cvs.width - cvs.width / 2) + cvs.width / 2),
    y: cvs.height - 100,
    maxX: Math.floor(Math.random() * (cvs.height / 3 - 200) + 200),
    reachedTop: false
  }
];

setInterval(() => {
  time++;
  ctx.clearRect(bX, bY, birdSizeX, birdSizeY);
  drawBird();
  drawFish();
  // flySound.play();
}, 50);

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
}

function drawFish() {
  for (let i = 0; i < fishCoord.length; i++) {
    let f = fishCoord[i];
    ctx.drawImage(fish, f.x, f.y, fishSizeX, fishSizeY);

    f.x -= 5;

    if (f.y < f.maxX) {
      f.reachedTop = true;
    }
    if (f.reachedTop == true) {
      f.y += 5;
    } else {
      f.y -= 5;
    }

    if (f.reachedTop && f.y > cvs.height) {
      fishCoord.splice(i, 1);
      console.log(fishCoord.length);
    }
  }
  if (Math.floor(Math.random() * 50) == 25) {
    fishCoord.push({
      x: Math.floor(
        Math.random() * (cvs.width - cvs.width / 2) + cvs.width / 2
      ),
      y: cvs.height - 100,
      maxX: Math.floor(Math.random() * (cvs.height / 3 - 200) + 200),
      reachedTop: false
    });
  }
}
