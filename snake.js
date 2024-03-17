const snake = {
  init: function(startX, startY, length, playArea) {
    this.body = [];
    for(let i = 0; i < length; i++) {
      this.body.push({ x: startX, y: startY + i })
    }
    this.move = function(direction) {
      for (let i = this.body.length - 1; i > 0; i--) {
        if (i === 0) return;
        this.body[i] = { ...this.body[i - 1] }
      }
      this.body[0].x += direction.x;
      this.body[0].y += direction.y;

      // check off-screen
      this.body.forEach((segment, i) => {
        if (segment.x >= playArea.columns) this.body[i].x -= playArea.columns;
        if (segment.x < 0) this.body[i].x += playArea.columns;

        if (segment.y >= playArea.rows) this.body[i].y -= playArea.rows;
        if (segment.y < 0) this.body[i].y += playArea.rows;
      })
    }
  },
}

module.exports = snake;





































































































