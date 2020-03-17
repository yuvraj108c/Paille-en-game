class Bird {
  constructor(url) {
    this.url = url;
    this.sizeX = 150;
    this.sizeY = 100;
  }
  getImage() {
    let i = new Image();
    i.src = this.url;
    return i;
  }
  draw(ctx, x, y) {
    ctx.drawImage(this.getImage(), x, y, this.sizeX, this.sizeY);
  }
}
