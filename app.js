const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

c.height = window.innerHeight - 100;
c.width = window.innerWidth - 22;

let time = 0;
let flap_speed = 3;

// Birds
const bird_open = new Bird("./img/bird_open.png");
const bird_close = new Bird("./img/bird_close.png");

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);
  time % flap_speed === 0
    ? bird_open.draw(ctx, 10, 10)
    : bird_close.draw(ctx, 10, 10);
}

function loop() {
  time++;
  draw();
  outputParameters();
}

function outputParameters() {
  document.getElementById("time").textContent = `Time: ${time}`;
}

setInterval(() => {
  loop();
}, 100);
