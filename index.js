const display = require('./display');
const snake = require('./snake');
// display.fillRect, display.renderBuffer, screen

const SEGMENT_SIZE = 8

// const screenSegments = (() => {
//   const rows = Math.floor(display.screen.height / SEGMENT_SIZE);
//   const columns = Math.floor(display.screen.width / SEGMENT_SIZE);
//   const positions = [];
//   for(let x = 0; x < columns; x++) {
//     positions[x] = [];
//     for (let y = 0; y < rows; y++) {
//       console.log(x, y);
//       positions[x][y] = false;
//     }
//   }
//   return positions;
// })();

// screenSegments[0][0] = true;
// screenSegments[1][1] = true;
// screenSegments[1][0] = true;

const renderScreenSegments = (segments) => {
  segments.forEach((segment) => {
    const { x, y } = segment;
    console.log(x, y);
    display.fillRect(
      x * SEGMENT_SIZE + 1,
      y * SEGMENT_SIZE + 1,
      SEGMENT_SIZE - 2,
      SEGMENT_SIZE - 2
    );
  });

  display.renderBuffer();
}

// renderScreenSegments([{x: 2, y: 2}]);


const init = () => {
  snake.init(7, 1, 3);
  setInterval(() => {
    snake.move({ x: 1, y: 0 });
    console.log(snake.body);
    renderScreenSegments(snake.body);
  }, 2000);
}

init();