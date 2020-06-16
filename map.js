const table = require('table');

const MAPWIDTH = 5;
const MAPHEIGHT = 8;
const PLAYERSIGN = 'O';
const PLATFORMBRICK = '*';
const LEFTSIDEBRICK = '#';
const RIGHTSIDEBRICK = '@';
const TOPSIDEBRICK = '&';
const BOTTOMBRICK = '^';
const EMPTYBRICK = ' ';

const generateMap = () => {
  const arr = new Array(MAPHEIGHT);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(MAPWIDTH);
  }
  return arr;
};

const fillMapSides = (arr) => { // fill the map sides with different bricks on each side
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (i === 0) {
        arr[i][j] = TOPSIDEBRICK;
      } else if (i !== 0 && j === 0) {
        arr[i][j] = LEFTSIDEBRICK;
      } else if (i !== 0 && j === (arr[i].length - 1)) {
        arr[i][j] = RIGHTSIDEBRICK;
      } else if (i === arr.length - 1) {
        arr[i][j] = BOTTOMBRICK;
      } else {
        arr[i][j] = EMPTYBRICK;
      }
    }
  }
};

const printMap = (arr) => {
  console.log(table.table(arr));
};

const moveMap = (arr) => {

};

module.exports = {
  init,
  generateMap,
  fillMapSides,
  printMap,
  moveMap
};
