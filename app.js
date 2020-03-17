const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

c.height = window.innerHeight - 100;
c.width = window.innerWidth - 22;

let time = 0;
let flap_speed = 5;

// Birds
const bird_open = new Bird("./img/bird_open.png");
const bird_close = new Bird("./img/bird_close.png");
const mountain = new Mountain("./img/mountain.png", c.width);

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);
  time % flap_speed === 0
    ? bird_open.draw(ctx, 10, 100)
    : bird_close.draw(ctx, 10, 100);
  mountain.draw(ctx, mountain.x, 0, c.width * 1.5, 200);
}

function update() {
  mountain.update();
}

function loop() {
  update();
  outputParameters();
  time++;
  requestAnimationFrame(loop);
}

function outputParameters() {
  document.getElementById("time").textContent = `Time: ${time}`;
}

loop();

setInterval(() => {
  draw();
}, 100);
