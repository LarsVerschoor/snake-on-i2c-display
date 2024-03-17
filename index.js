const display = require('./display');
const snake = require('./snake');
const input = require('./input');
const { SEGMENT_SIZE } = require('./includes/settings');

const playArea = display.getPlayArea();

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
  snake.init(7, 1, 3, playArea);
  setInterval(() => {
    const direction = input.getNextDirection();
    snake.move(direction);
    renderScreenSegments(snake.body);
  }, 200);
}

init();