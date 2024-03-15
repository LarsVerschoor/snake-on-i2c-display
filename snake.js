const snake = {
  body: [],
  init: function(startX, startY, length) {
    this.body = [];
    for(let i = 0; i < length; i++) {
      this.body.push({ x: startX, y: startY + i })
    }
  },
  move: function(direction) {
    for (let i = this.body.length - 1; i > 0; i--) {
      if (i === 0) return;
      this.body[i] = { ...this.body[i - 1] }
    }
    this.body[0].x += direction.x;
    this.body[0].y += direction.y;
    console.log(this.body);
  }
}

module.exports = { snake };





































































































