const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

cvs.setAttribute("height", window.innerHeight);
cvs.setAttribute("width", window.innerWidth);

let bird = new Image();
let bg = new Image();
let fish = new Image();
let shark = new Image();

bg.src = "./Images/SunsetDrawing.jpg";
bird.src = "./Images/bird_sprite.png";
fish.src = "./Images/dive.png";
shark.src = "./Images/whale.png";

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
let sharSizeX = 150;
let sharSizeY = 150;

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
let sharkCoord = [
  {
    x: cvs.width,
    y: cvs.height - 100,
    maxX: dY,
    reachedTop: false
  }
];

document.addEventListener("keydown", moveBird);

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

function drawShark() {
  for (let i = 0; i < sharkCoord.length; i++) {
    let f = sharkCoord[i];
    ctx.drawImage(shark, f.x, f.y, sharSizeX, sharSizeY);

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

    // Delete shark if bottom reached
    if (f.reachedTop && f.y > cvs.height) {
      sharkCoord.splice(i, 1);
    }

    let remainingX = cvs.width - (birdSizeX / 2.5 + dX + cvs.width - f.x);
    let remainingY = Math.abs(f.y - dY);

    // Shark eat bird
    if (remainingX <= 15 && remainingX >= -15 && remainingY <= 25) {
      sharkCoord.splice(i, 1);
      message();
      clearInterval(interval);
      return;
    }
  }
  // Create new shark
  if (Math.floor(Math.random() * 200) == 38) {
    sharkCoord.push({
      x: Math.floor(
        Math.random() * (cvs.width - cvs.width / 2) + cvs.width / 2
      ),
      y: cvs.height - 100,
      maxX: dY,
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

  if (dY <= 0) dY = 0;
  if (dX <= 0) dX = 0;
}

function Start() {
  document.getElementById("menu").style.display = "none";
  interval = setInterval(() => {
    time++;
    ctx.clearRect(bX, bY, birdSizeX, birdSizeY);
    drawBird();
    drawFish();
    drawShark();

    flySound.play();

    // Score indicator
    ctx.fillStyle = "white";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, 25);
  }, 50);
}

function message() {
  location.href = `GameOver.html?score=${score}`;
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
