const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

cvs.setAttribute("height", window.innerHeight);
cvs.setAttribute("width", window.innerWidth);

let bird = new Image();
let bg = new Image();
let fish = new Image();
let shark = new Image();

bg.src = "./Images/b3.jpg";
bird.src = "./Images/bird_sprite.png";
fish.src = "./Images/fish_sprite.png";
shark.src = "./Images/shark_sprite.png";

let flySound = new Audio();
let scoreSound = new Audio();
let bgSound = new Audio();
let overSound = new Audio();
flySound.src = "Sounds/fly.mp3";
scoreSound.src = "Sounds/eat.mp3";
bgSound.src = "Sounds/background.wav";
overSound.src = "Sounds/over.mp3";

let bX = 0;
let bY = 0;
let dX = 0;
let dY = 0;

let birdSizeX = 460;
let birdSizeY = 150;
let fishSizeX = 229;
let fishSizeY = 65;
let sharSizeX = 500;
let sharSizeY = 250;

let time = 0;
let speed = 10;
let score = 0;
const fly_step = 50;
let interval;

let fishCoord = [
  {
    x: cvs.width,
    y: cvs.height - 100,
    maxY: Math.floor(Math.random() * (cvs.height / 3 - 200) + 200),
    reachedTop: false,
  },
];
let sharkCoord = [
  {
    x: cvs.width,
    y: cvs.height - 100,
    maxY: dY,
    reachedTop: false,
  },
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

    ctx.drawImage(
      fish,
      time % speed == 0 ? bX : bX + fishSizeX / 2,
      bY,
      fishSizeX / 2,
      fishSizeY,
      f.x,
      f.y,
      fishSizeX / 2,
      fishSizeY
    );

    f.x -= 5;

    if (f.y < f.maxY) {
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
      scoreSound.volume = 0.5;
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
      maxY: Math.floor(Math.random() * (cvs.height / 3 - 200) + 200),
      reachedTop: false,
    });
  }
}

function drawShark() {
  for (let i = 0; i < sharkCoord.length; i++) {
    let f = sharkCoord[i];

    ctx.drawImage(
      shark,
      time % speed == 0 ? bX : bX + sharSizeX / 2,
      bY,
      sharSizeX / 2,
      sharSizeY,
      f.x,
      f.y,
      sharSizeX / 2,
      sharSizeY
    );

    f.x -= 5;

    if (f.y < f.maxY) {
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
    if (
      remainingX <= 25 &&
      remainingX >= -50 &&
      remainingY <= 25 &&
      remainingY >= -50
    ) {
      overSound.play();
      sharkCoord.splice(i, 1);
      clearInterval(interval);

      setTimeout(() => {
        message();
        return;
      }, 2000);
    }
  }
  // Create new shark
  if (Math.floor(Math.random() * 200) == 38) {
    sharkCoord.push({
      x: Math.floor(
        Math.random() * (cvs.width - cvs.width / 2) + cvs.width / 2
      ),
      y: cvs.height - 100,
      maxY: Math.floor(Math.random() * cvs.height),
      reachedTop: false,
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
  document.getElementsByClassName("menu")[0].style.display = "none";
  bgSound.play();
  bgSound.volume = 0.1;
  bgSound.loop = true;

  interval = setInterval(() => {
    time++;
    ctx.clearRect(bX, bY, birdSizeX, birdSizeY);
    drawBird();
    drawFish();
    drawShark();

    // Score indicator
    ctx.fillStyle = "white";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, 25);
  }, 50);

  interval2 = setInterval(() => {
    flySound.play();
    flySound.volume = 0.1;
  }, 700);
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
