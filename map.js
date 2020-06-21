/*
qgit ignoreba rakni a node module-t

npm init
leszedni a node module-s

package modul
scrip objejt start
npm run start
pótolni
*/
const axel = require('axel');
const table = require('table');

const MAPWIDTH = 50;
const MAPHEIGHT = 19; // ddd
const PLAYERSIGN = '☻';// ♂ ¥ ♥ ☻'[[W],[W]],[[W],[W]]';
const PLATFORMBRICK = '▓'; // ▀
const LEFTSIDEBRICK = '#';
const RIGHTSIDEBRICK = '@';
const TOPSIDEBRICK = '&';
const BOTTOMBRICK = '^';
const EMPTYBRICK = ' ';
const speed = 100;
const playerObj = {
  playerPosCol: 1,
  playerPosRow: 1
};

let pPosR = playerObj.playerPosRow;
let pPosC = playerObj.playerPosCol;

const init = () => { // initialising variables
  pPosR = 17; // 1, 1, player start from the bottom left side
  pPosC = 10;
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
        arr[i][j] = TOPSIDEBRICK; // top side
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

const printMapAxel = (arr) => {
  axel.clear();
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      axel.bg(0, 0, 0);
      if (arr[i][j] === TOPSIDEBRICK) {
        axel.point(j + 1, i + 1, TOPSIDEBRICK);
      }
      if (arr[i][j] === EMPTYBRICK) {
        axel.point(j + 1, i + 1, EMPTYBRICK);
      }
      if (arr[i][j] === PLATFORMBRICK) {
        axel.fg(255, 0, 255);
        axel.text(j + 1, i + 1, PLATFORMBRICK);
      }
      if (arr[i][j] === PLAYERSIGN) {
        axel.fg(255, 255, 0);
        axel.text(j + 1, i + 1, PLAYERSIGN);
      }
    }
    axel.bg(0, 0, 0);
  }
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
  setTimeout(() => {
    if ((arr[pPosR - 1][pPosC] || arr[pPosR - 2][pPosC]) !== TOPSIDEBRICK) {
      arr[pPosR][pPosC] = EMPTYBRICK;
      pPosR -= 2;
      pPosC -= 1;
      arr[pPosR][pPosC] = PLAYERSIGN;
      //    arr[pPosR + 2][pPosC + 1] = EMPTYBRICK;
      fallingPlayer(arr);
    }
  }, 50);
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

const sinkMap = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    arr[i - 1] = arr[i];
  }
};

const newMapRow = (arr) => {

};

const printPlayer = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === PLAYERSIGN) {
        axel.fg(255, 255, 0);
        axel.text(j + 1, i + 1, PLAYERSIGN);
      }
    }
  }
};

module.exports = {
  init,
  generateMap,
  fillMapSides,
  printMap,
  printMapAxel,
  creatingPlatforms,
  sinkMap,
  addPlayer,
  movePlayerRight,
  movePlayerLeft,
  jumpPlayerUp,
  jumpPlayerUpLeft,
  jumpPlayerUpRight,
  fallingPlayer,
  printPlayer
};
