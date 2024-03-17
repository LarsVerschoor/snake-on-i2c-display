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
  console.log(inputsSinceLastFrame);

  const possibleDirections = [];

  inputsSinceLastFrame.forEach(inputKey => {
    if (inputKey === 'w' && lastFrameInput !== 's') possibleDirections.push(keyToDirection['w']);
    else if (inputKey === 'a' && lastFrameInput !== 'd') possibleDirections.push(keyToDirection['w']);
    else if (inputKey === 's' && lastFrameInput !== 'w') possibleDirections.push(keyToDirection['w']);
    else if (inputKey === 'd' && lastFrameInput !== 'a') possibleDirections.push(keyToDirection['w']);
  })

  console.log(possibleDirections);

  if (possibleDirections) return possibleDirections[0];
  return lastFrameInput;
}

const init = () => {
  snake.init(7, 1, 4);
  setInterval(() => {
    const direction = getDirection();
    input.lastInput = direction;
    input.reset();

    const directionObject = keyToDirection[direction];
    console.log(directionObject);
    snake.move(directionObject);
    
    renderScreenSegments(snake.body);
  }, 1000);
}

init();