class Mountain {
  constructor(url, w) {
    this.url = url;
    this.x = 0;
    this.dx = 5;
    this.w = w;
  }
  getImage() {
    let i = new Image();
    i.src = this.url;
    return i;
  }
  draw(ctx, x, y, sizeX, sizeY) {
    ctx.drawImage(this.getImage(), x, y, sizeX, sizeY);
  }
  update() {
    // this.x = this.w;
    this.x = (this.x - this.dx) % (this.w / 2);
  }
}
