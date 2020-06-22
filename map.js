
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

const MAPWIDTH = 20;
const MAPHEIGHT = 15; // ddd
const PLAYERSIGN = '☻';// ♂ ¥ ♥ ☻'[[W],[W]],[[W],[W]]';
const PLATFORMBRICK = '▓'; // ▀ ▓
const LEFTSIDEBRICK = '#';
const RIGHTSIDEBRICK = '@';
const TOPSIDEBRICK = '&';
const BOTTOMBRICK = '^';
const EMPTYBRICK = ' ';
const playerObj = {
  posX: 7,
  posY: 1
};

const sinkMap = (arr) => { // minden elemet 2 sorral lejjebb másol
  let temp;
  for (let i = arr.length - 2; i > 2; i--) {
    for (let j = 0; j < arr[i].length; j++) {
      temp = arr[i - 2][j];
      if (temp === PLAYERSIGN) {
        arr[i][j] = EMPTYBRICK;
        playerObj.posY += 2;
        arr[playerObj.posY][playerObj.posX] = PLAYERSIGN;
        console.log(playerObj.posY);
      } else {
        arr[i][j] = temp;
      }
    }
  }
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
        arr[i][j] = PLATFORMBRICK; //
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

/* const printMap = (arr) => {
  console.log(table.table(arr));
}; // out of use */

const printMapAxel = (arr) => {
  // axel.clear();
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      // axel.bg(0, 0, 0);
      //  axel.fg(255, 0, 255);
      if (arr[i][j] === TOPSIDEBRICK) {
        axel.text(j + 1, i + 1, TOPSIDEBRICK);
      }
      if (arr[i][j] === EMPTYBRICK) {
        axel.text(j + 1, i + 1, EMPTYBRICK);
      }
      if (arr[i][j] === PLATFORMBRICK) {
        //    axel.fg(255, 0, 255);
        axel.text(j + 1, i + 1, PLATFORMBRICK);
      }
      if (arr[i][j] === PLAYERSIGN) {
        //    axel.fg(255, 0, 255);
        axel.text(j + 1, i + 1, PLAYERSIGN);
      }
    }
    // axel.bg(0, 0, 0);
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

const newMapRow = (arr) => {
  for (let l = 1; l < MAPWIDTH - 2; l++) {
    arr[2][l] = EMPTYBRICK;
  }
  let k = 0;
  // for (let i = 2; i < 4; i += 2) {
  for (let j = 1; j < MAPWIDTH - 5; j++) {
    k = Math.round(Math.random() * (arr[0].length - 2) + 1);// arr[2].length);
    // const x = Math.round(Math.random() * 10) + 1;
    arr[2][k] = PLATFORMBRICK;
    console.log(k);
  }
};

const addPlayer = (arr) => {
  arr[playerObj.posY][playerObj.posX] = PLAYERSIGN;
};

const movePlayerRight = (arr) => {
  if (arr[playerObj.posY][playerObj.posX + 1] !== PLATFORMBRICK) {
    arr[playerObj.posY][playerObj.posX] = EMPTYBRICK;
    playerObj.posX += 1;
    arr[playerObj.posY][playerObj.posX] = PLAYERSIGN;
    //    arr[pPosR][pPosC - 1] = EMPTYBRICK;
    fallingPlayer(arr);
  }
};

const movePlayerLeft = (arr) => {
  if (arr[playerObj.posY][playerObj.posX - 1] !== PLATFORMBRICK) {
    arr[playerObj.posY][playerObj.posX] = EMPTYBRICK;
    playerObj.posX -= 1;
    arr[playerObj.posY][playerObj.posX] = PLAYERSIGN;
    // arr[pPosR][pPosC + 1] = EMPTYBRICK;
    fallingPlayer(arr);
  }
};

const jumpPlayerUp = (arr) => { // jumping only up
  if ((arr[playerObj.posY - 1][playerObj.posX] || arr[playerObj.posY - 2][playerObj.posX]) !== TOPSIDEBRICK) {
    arr[playerObj.posY][playerObj.posX] = EMPTYBRICK;
    playerObj.posY -= 2;
    arr[playerObj.posY][playerObj.posX] = PLAYERSIGN;
    // arr[pPosR + 2][pPosC] = EMPTYBRICK;
    fallingPlayer(arr);
  }
};

const jumpPlayerUpLeft = (arr) => { // jumping 2 brick up an 1 brick left
  if ((arr[playerObj.posY - 1][playerObj.posX] || arr[playerObj.posY - 2][playerObj.posX]) !== TOPSIDEBRICK) {
    arr[playerObj.posY][playerObj.posX] = EMPTYBRICK;
    playerObj.posY -= 2;
    playerObj.posX -= 1;
    arr[playerObj.posY][playerObj.posX] = PLAYERSIGN;
    //    arr[pPosR + 2][pPosC + 1] = EMPTYBRICK;
    fallingPlayer(arr);
  }
};

const jumpPlayerUpRight = (arr) => { // jumping 2 brick up an 1 brick right
  if ((arr[playerObj.posY - 1][playerObj.posX] || arr[playerObj.posY - 2][playerObj.posX]) !== TOPSIDEBRICK) {
    arr[playerObj.posY][playerObj.posX] = EMPTYBRICK;
    playerObj.posY -= 2;
    playerObj.posX += 1;
    arr[playerObj.posY][playerObj.posX] = PLAYERSIGN;
    // arr[pPosR + 2][pPosC - 1] = EMPTYBRICK;
    fallingPlayer(arr);
  }
};

const fallingPlayer = (arr) => {
  while (arr[playerObj.posY + 1][playerObj.posX] !== PLATFORMBRICK) {
    playerObj.posY += 1;
    arr[playerObj.posY][playerObj.posX] = PLAYERSIGN;
    arr[playerObj.posY - 1][playerObj.posX] = EMPTYBRICK;
  }
};

const printPlayer = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
    //  axel.fg(255, 255, 0);
      if (arr[i][j] === PLAYERSIGN) {
        axel.text(j + 1, i + 1, PLAYERSIGN);
        break;
      }
    }
  }
};

module.exports = {
  generateMap,
  fillMapSides,
  // printMap,
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
  printPlayer,
  newMapRow,
  playerObj
};
