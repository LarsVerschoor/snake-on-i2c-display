const display = require('./display');
const snake = require('./snake');

const SEGMENT_SIZE = 8

const renderScreenSegments = (segments) => {
  segments.forEach((segment) => {
    const { x, y } = segment;
    display.fillRect(
      x * SEGMENT_SIZE + 1,
      y * SEGMENT_SIZE + 1,
      SEGMENT_SIZE - 2,
      SEGMENT_SIZE - 2
    );
  });

  display.renderBuffer();
}

const init = () => {
  snake.init(7, 1, 3);
  setInterval(() => {
    snake.move({ x: 1, y: 0 });
    renderScreenSegments(snake.body);
  }, 2000);
}

init();