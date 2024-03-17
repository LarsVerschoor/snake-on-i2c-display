const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// logic

const keyBinds = {
  w: { x: 0, y: -1 },
  a: { x: -1, y: 0 },
  s: { x: 0, y: 1 },
  d: { x: 1, y: 0 }
}

let nextDirectionUserInput = [];
let previousDirection = 'w';

const filterImpossibleInputs = () => {
  nextDirectionUserInput.forEach((input, i) => {
    if (input === 'w' && previousDirection === 's') nextDirectionUserInput.splice(i, 1);
    else if (input === 'a' && previousDirection === 'd') nextDirectionUserInput.splice(i, 1);
    else if (input === 's' && previousDirection === 'w') nextDirectionUserInput.splice(i, 1);
    else if (input === 'd' && previousDirection === 'a') nextDirectionUserInput.splice(i, 1);
  })
}

const getNextDirection = () => {
  filterImpossibleInputs();
  nextDirectionUserInput.push(previousDirection);
  const nextDirection = nextDirectionUserInput[0];
  nextDirectionUserInput = [];
  previousDirection = nextDirection;
  return { ...keyBinds[nextDirection] };
}

rl.input.on('keypress', (key) => {
  const pressedKey = key.toLowerCase();
  if (pressedKey !== 'w' && pressedKey !== 'a' && pressedKey !== 's' && pressedKey !== 'd') return;
  nextDirectionUserInput.unshift(pressedKey);
});

rl.input.setRawMode(true);

rl.resume();

module.exports = { getNextDirection };