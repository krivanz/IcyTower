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
const speed = 1000;
const playerObj = {
  playerPosCol: 1,
  playerPosRow: 1
};

let pPosR = playerObj.playerPosRow;
let pPosC = playerObj.playerPosCol;

const init = () => { // initialising variables
  pPosR = 1; // player start from the bottom left side
  pPosC = 1;
};

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

const addPlayer = (arr) => {
  arr[pPosR][pPosC] = PLAYERSIGN;
};

const movePlayerRight = (arr) => {
  if (arr[pPosR][pPosC + 1] !== RIGHTSIDEBRICK) {
    pPosC++;
    arr[pPosR][pPosC] = PLAYERSIGN;
    arr[pPosR][pPosC - 1] = EMPTYBRICK;
    arr[pPosR][pPosC] = PLAYERSIGN;
  }
};

const movePlayerLeft = (arr) => {
  if (arr[pPosR][pPosC - 1] !== LEFTSIDEBRICK) {
    playerObj.playerSign = PLAYERSIGNONMOVE;
    pPosC--;
    arr[pPosR][pPosC] = playerObj.playerSign;
    arr[pPosR][pPosC + 1] = EMPTYBRICK;

    playerObj.playerSign = PLAYERSIGNONSTOP;
    arr[pPosR][pPosC] = playerObj.playerSign;
  }
};

const jumpPlayer = (arr) => { // jumping only up
  if ((arr[pPosR - 1][pPosC] || arr[pPosR - 2][pPosC]) !== TOPSIDEBRICK) {
    pPosR -= 2;
    arr[pPosR][pPosC] = playerObj.playerSign;
    arr[pPosR + 1][pPosC] = EMPTYBRICK;
  }
};

const fallingPlayer = (arr) => {
  while (arr[pPosR + 1][pPosC] !== (BOTTOMBRICK || PLATFORMBRICK)) {
    pPosR--;
  }
};

const moveMap = (arr) => {

};

module.exports = {
  init,
  generateMap,
  fillMapSides,
  printMap,
  moveMap,
  addPlayer,
  movePlayerRight,
  movePlayerLeft,
  jumpPlayer,
  fallingPlayer
};
