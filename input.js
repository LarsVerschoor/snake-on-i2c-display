const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = {
  pressedKeys: [],
  lastInput: 'w',
  reset: function() {
    this.pressedkeys = [];
  },
  add: function(key) {
    this.pressedKeys.unshift(key);
  }
};

rl.input.on('keypress', (key) => {
  const pressedKey = key.toLowerCase();
  if (pressedKey !== 'w' && pressedKey !== 'a' && pressedKey !== 's' && pressedKey !== 'd') return;
  input.add(pressedKey);
});

rl.input.setRawMode(true);

rl.resume();

module.exports = input;