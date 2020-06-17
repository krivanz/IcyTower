const table = require('table');

const MAPWIDTH = 10;
const MAPHEIGHT = 10;
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
  pPosR = 1; // 1, 1, player start from the bottom left side
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
        arr[i][j] = PLATFORMBRICK;
      } else if (i !== 0 && j === (arr[i].length - 1)) {
        arr[i][j] = PLATFORMBRICK;
      } else if (i === arr.length - 1) {
        arr[i][j] = PLATFORMBRICK; // PLATFOTMBRICK INSTEAD OF BOTTOMBRICK
      } else {
        arr[i][j] = EMPTYBRICK;
      }
    }
  }
};

const printMap = (arr) => {
  console.log(table.table(arr));
};

const creatingPlatforms = (arr) => {
  for (let i = 2; i < arr.length; i += 2) {
    for (let j = 1; j < arr[i].length - 1; j++) {
      const k = Math.floor(Math.random() * (arr[0].length - 1) + 1);
      arr[i][k] = PLATFORMBRICK;
    }
  }
};

const addPlayer = (arr) => {
  arr[pPosR][pPosC] = PLAYERSIGN;
};

const movePlayerRight = (arr) => {
  if (arr[pPosR][pPosC + 1] !== PLATFORMBRICK) {
    arr[pPosR][pPosC] = EMPTYBRICK;
    pPosC++;
    arr[pPosR][pPosC] = PLAYERSIGN;
    //    arr[pPosR][pPosC - 1] = EMPTYBRICK;
    fallingPlayer(arr);
  }
};

const movePlayerLeft = (arr) => {
  if (arr[pPosR][pPosC - 1] !== PLATFORMBRICK) {
    arr[pPosR][pPosC] = EMPTYBRICK;
    pPosC--;
    arr[pPosR][pPosC] = PLAYERSIGN;
    // arr[pPosR][pPosC + 1] = EMPTYBRICK;
    fallingPlayer(arr);
  }
};

const jumpPlayerUp = (arr) => { // jumping only up
  if ((arr[pPosR - 1][pPosC] || arr[pPosR - 2][pPosC]) !== TOPSIDEBRICK) {
    arr[pPosR][pPosC] = EMPTYBRICK;
    pPosR -= 2;
    arr[pPosR][pPosC] = PLAYERSIGN;
    // arr[pPosR + 2][pPosC] = EMPTYBRICK;
    fallingPlayer(arr);
  }
};

const jumpPlayerUpLeft = (arr) => { // jumping 2 brick up an 1 brick left
  if ((arr[pPosR - 1][pPosC] || arr[pPosR - 2][pPosC]) !== TOPSIDEBRICK) {
    arr[pPosR][pPosC] = EMPTYBRICK;
    pPosR -= 2;
    pPosC -= 1;
    arr[pPosR][pPosC] = PLAYERSIGN;
    //    arr[pPosR + 2][pPosC + 1] = EMPTYBRICK;
    fallingPlayer(arr);
  }
};

const jumpPlayerUpRight = (arr) => { // jumping 2 brick up an 1 brick right
  if ((arr[pPosR - 1][pPosC] || arr[pPosR - 2][pPosC]) !== TOPSIDEBRICK) {
    arr[pPosR][pPosC] = EMPTYBRICK;
    pPosR -= 2;
    pPosC += 1;
    arr[pPosR][pPosC] = PLAYERSIGN;
    // arr[pPosR + 2][pPosC - 1] = EMPTYBRICK;
    fallingPlayer(arr);
  }
};

const fallingPlayer = (arr) => {
  while (arr[pPosR + 1][pPosC] !== PLATFORMBRICK) {
    pPosR++;
    arr[pPosR][pPosC] = PLAYERSIGN;
    arr[pPosR - 1][pPosC] = EMPTYBRICK;
  }
};

const moveMap = (arr) => {

};

module.exports = {
  init,
  generateMap,
  fillMapSides,
  printMap,
  creatingPlatforms,
  moveMap,
  addPlayer,
  movePlayerRight,
  movePlayerLeft,
  jumpPlayerUp,
  jumpPlayerUpLeft,
  jumpPlayerUpRight,
  fallingPlayer
};
