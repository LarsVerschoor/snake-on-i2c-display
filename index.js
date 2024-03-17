const display = require('./display');
const snake = require('./snake');
const input = require('./input');

const SEGMENT_SIZE = 8;

const keyToDirection = {
  w: { x: 0, y: -1 },
  a: { x: -1, y: 0 },
  s: { x: 0, y: 1 },
  d: { x: 1, y: 0 }
}

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

const getDirection = () => {
  const inputsSinceLastFrame = input.pressedKeys;
  const lastFrameInput = input.lastInput;

  const possibleDirection = inputsSinceLastFrame.forEach(input => {
    switch(input) {
      case input === 'w' && lastFrameInput === 's':
        break;
      
      case input === 'a' && lastFrameInput === 'd':
        break;

      case input === 's' && lastFrameInput === 'w':
        break;

      case input === 'd' && lastFrameInput === 'a':
        break;

      default:
        return input;
    }
  })

  if (possibleDirection) return possibleDirection
  return null;
}

const init = () => {
  snake.init(7, 1, 4);
  setInterval(() => {
    const direction = getDirection();
    input.reset();

    if (direction) {
      const directionObject = keyToDirection(direction);
      snake.move(directionObject);
    }
    
    renderScreenSegments(snake.body);
  }, 1000);
}

init();