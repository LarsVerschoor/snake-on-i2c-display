const Oled = require('oled-i2c-bus');
const i2c = require('i2c-bus');
const {
  DISPLAY_WIDTH,
  DISPLAY_HEIGHT,
  SEGMENT_SIZE
} = require('./includes/settings');

const opts = {
    width: DISPLAY_WIDTH,
    height: DISPLAY_HEIGHT,
    address: 0x3C
}

const i2cBus = i2c.openSync(1);
const oled = new Oled(i2cBus, opts);

let screenBuffer = Buffer.alloc(DISPLAY_WIDTH * DISPLAY_HEIGHT / 8);

const addToBuffer = (x, y) => {
    const byteIndex = Math.floor(y / 8) * DISPLAY_WIDTH + x;
    const bitIndex = y % 8;
    screenBuffer[byteIndex] |= (1 << bitIndex);
}

const fillRect = (xStart, yStart, width, height) => {
    for (let x = xStart; x < xStart + width; x++) {
        for (let y = yStart; y < yStart + height; y++) {
            addToBuffer(x, y);
        }
    }
}

const renderBuffer = () => {
    oled.buffer = screenBuffer;
    oled.update();
    screenBuffer = Buffer.alloc(DISPLAY_WIDTH * DISPLAY_HEIGHT / 8);
}

const getPlayArea = () => {
  const { width, height } = opts;
  const columns = Math.floor(width / SEGMENT_SIZE);
  const rows = Math.floor(height / SEGMENT_SIZE);
  return {columns, rows}
}

module.exports = { fillRect, renderBuffer, getPlayArea }

/**

| = 1 byte (8 bits, 00000000)

16 x 16 display, "|" = 8px horizontaal
16x16 scherm (| is één byte, 8 bits, verticaal):
| | | | | | | | | | | | | | | |
| | | | | | | | | | | | | | | |
buffer (De data die het scherm moet gaan renderen, | = 1 byte):
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

case: x=10, y=10
byteIndex = math.floor(y / 8) * width + x
boven: als y 8 of meer is, moet die een rij naar onder, dus een breedte van het scherm verder in de buffer.
voorbeeld: byteIndex = Math.floor(10 / 8) * 16 + 10 = 26

bitIndex = y % 8
boven: Bepaalt welke bit in de byte er aan moet staan, dus wat er overblijft na het delen met 8
voorbeeld: bitIndex = 10 % 8 = 2

screenBuffer[byteIndex] |= (1 << bitIndex)
boven: als bitIndex 2 is, wordt in binair de tweede bit aangezet, << verschuift de bit 2 naar links (00000001 -> 00000100)
boven: |= zorgt ervoor dat als screenBuffer[byteIndex] al 00100000 was, dat het 00100100 word, dus dat de bits niet verloren gaan.

*/