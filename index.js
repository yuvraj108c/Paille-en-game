const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

cvs.setAttribute("height", window.innerHeight - 25);
cvs.setAttribute("width", window.innerWidth);

while (cvs.width % 5 !== 0) {
  cvs.setAttribute("width", cvs.width - 1);
}

let bird = new Image();
let bg = new Image();
let fish = new Image();

bg.src = "./Images/SunsetDrawing.jpg";
bird.src = "./Images/bird_sprite.png";
fish.src = "./Images/dive.png";

let flySound = new Audio();
let scoreSound = new Audio();
flySound.src = "Sounds/fly.mp3";
scoreSound.src = "Sounds/score.mp3";

let bX = 0;
let bY = 0;
let dX = 0;
let dY = 0;

let birdSizeX = 460;
let birdSizeY = 150;
let fishSizeX = 75;
let fishSizeY = 75;

let time = 0;
let speed = 10;
let score = 0;
const fly_step = 50;
let interval;

let fishCoord = [
  {
    x: cvs.width,
    y: cvs.height - 100,
    maxX: Math.floor(Math.random() * (cvs.height / 3 - 200) + 200),
    reachedTop: false
  }
];

document.addEventListener("keydown", moveBird);

interval = setInterval(() => {
  time++;
  ctx.clearRect(bX, bY, birdSizeX, birdSizeY);
  drawBird();
  drawFish();
  flySound.play();

  // Score indicator
  ctx.fillStyle = "white";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : " + score, 10, 25);
}, 50);

function drawBird() {
  ctx.drawImage(bg, 0, 0, cvs.width, cvs.height);
  ctx.drawImage(
    bird,
    time % speed == 0 ? bX : bX + birdSizeX / 2,
    bY,
    birdSizeX / 2,
    birdSizeY,
    dX,
    dY,
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

    // Go down if bird reached top
    if (f.reachedTop == true) {
      f.y += 5;
    } else {
      f.y -= 5;
    }

    // Delete fish if bottom reached
    if (f.reachedTop && f.y > cvs.height) {
      fishCoord.splice(i, 1);
    }

    let remainingX = cvs.width - (birdSizeX / 2.5 + dX + cvs.width - f.x);
    let remainingY = Math.abs(f.y - dY);

    // Bird eats fish
    if (remainingX <= 15 && remainingX >= -15 && remainingY <= 50) {
      scoreSound.play();
      score++;
      fishCoord.splice(i, 1);
    }
  }
  // Create new fish
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

function moveBird(e) {
  // up key
  if (e.keyCode == "38") {
    dY -= fly_step;
  }
  // down key
  else if (e.keyCode == "40") {
    dY += fly_step;
  }
  // left key
  else if (e.keyCode == "39") {
    dX += fly_step;
  }
  // right key
  else if (e.keyCode == "37") {
    dX -= fly_step;
  }
}
