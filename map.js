
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
const index = require('./index');

const MAPWIDTH = 20;
const MAPHEIGHT = 15;
const PLAYERSIGN = '☻';
const PLATFORMBRICK = '▓';
// const LEFTSIDEBRICK = '#';
// const RIGHTSIDEBRICK = '@';
const TOPSIDEBRICK = '&';
const BOTTOMBRICK = '^';
const EMPTYBRICK = ' ';
const playerObj = {
  posX: 7,
  posY: 3
};
let secondCounter = 0;
const lifeCounter = ['Életek száma: ', '♥ ', '♥ ', '♥ ', '♥ ', '♥ '];

let secondCounterIntervalID;
let sinkMapIntervalID;
let mapDrawIntervalID;

const sinkMap = (arr) => { // minden elemet 2 sorral lejjebb másol
  let temp;
  for (let i = arr.length - 2; i > 2; i--) {
    for (let j = 0; j < arr[i].length; j++) {
      temp = arr[i - 2][j];
      arr[i][j] = temp;
      if (temp === PLAYERSIGN) {
        arr[i][j] = EMPTYBRICK;
        playerObj.posY += 2;
        console.log('X:' + playerObj.posX + ' y:' + playerObj.posY);
        arr[playerObj.posY][playerObj.posX] = PLAYERSIGN;
        // fallingPlayer();
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
        arr[i][j] = PLATFORMBRICK; // left side
      } else if (i !== 0 && j === (arr[i].length - 1)) {
        arr[i][j] = PLATFORMBRICK; // right side
      } else if (i === arr.length - 1) {
        arr[i][j] = BOTTOMBRICK; // PLATFORMBRICK INSTEAD OF BOTTOMBRICK
      } else {
        arr[i][j] = EMPTYBRICK;
      }
    }
  }
};

const printMapAxel = (arr) => {
  console.clear();
  for (let i = 0; i < arr.length; i++) { // kiveszem a +1-eket
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === TOPSIDEBRICK) {
        axel.text(j + 1, i + 1, TOPSIDEBRICK);
      }
      if (arr[i][j] === EMPTYBRICK) {
        axel.text(j + 1, i + 1, EMPTYBRICK);
      }
      if (arr[i][j] === PLATFORMBRICK) {
        axel.text(j + 1, i + 1, PLATFORMBRICK);
      }
      if (arr[i][j] === PLAYERSIGN) {
        axel.text(j + 1, i + 1, PLAYERSIGN);
      }
      if (arr[i][j] === BOTTOMBRICK) {
        axel.text(j + 1, i + 1, BOTTOMBRICK);
      }
    }
  }
  printHud();
};

const creatingPlatforms = (arr) => {
  for (let i = 2; i < arr.length - 1; i += 2) {
    for (let j = 1; j < arr[i].length - 2; j++) {
      const k = Math.floor(Math.random() * (arr[0].length - 1) + 1); // -1 helyett 3
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
  return arr;
};

const movePlayerLeft = (arr) => {
  if (arr[playerObj.posY][playerObj.posX - 1] !== PLATFORMBRICK) {
    arr[playerObj.posY][playerObj.posX] = EMPTYBRICK;
    playerObj.posX -= 1;
    arr[playerObj.posY][playerObj.posX] = PLAYERSIGN;
    // arr[pPosR][pPosC + 1] = EMPTYBRICK;
    fallingPlayer(arr);
  }
  return arr;
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
  if (arr[playerObj.posY + 1][playerObj.posX] === BOTTOMBRICK) {
    console.log('újrakezdés');
    lifeCounter.pop();
    playerObj.posY = 1; // visszaáll a kezdőpontra
    playerObj.posX = 7;
    printHud();
    setTimeout(() => {
    }, 10000);
    clearInterval(secondCounterIntervalID);
    clearInterval(mapDrawIntervalID);
    clearInterval(sinkMapIntervalID);
    axel.clear();
    arr = [];
    gameStart();
  } else {
    if (arr[playerObj.posY + 1][playerObj.posX] !== PLATFORMBRICK) {
      playerObj.posY += 1;
      arr[playerObj.posY][playerObj.posX] = PLAYERSIGN;
      arr[playerObj.posY - 1][playerObj.posX] = EMPTYBRICK;
      fallingPlayer(arr);
    }
  }
};

const printPlayer = (arr) => {
  axel.text(playerObj.posY + 1, playerObj.posX + 1, PLAYERSIGN);// +1 +1 kivéve
};

const printHud = () => {
  console.log('\nbalra: a, jobbra: d, ugrás fel: w, ugrás balra fel: q, ugrás jobbra fel: e kilépés: x');
  console.log('Játékos helyzete X:' + playerObj.posX + ' y:' + playerObj.posY);
  console.log('Eltelt idő: ' + secondCounter);
  for (let i = 0; i < lifeCounter.length; i++) {
    process.stdout.write(lifeCounter[i]);
  }
};

const gameStart = () => {
  const arr = generateMap();
  fillMapSides(arr);
  creatingPlatforms(arr);
  addPlayer(arr);
  fallingPlayer(arr);

  const stdin = process.stdin;

  stdin.setRawMode(true); // dont wait for enter
  stdin.resume(); // exit only with process.exit
  stdin.setEncoding('utf8'); // characters return

  secondCounterIntervalID = setInterval(() => {
    secondCounter++;
  }, 1000);

  sinkMapIntervalID = setInterval(() => {
    // printPlayer(arr);
    sinkMap(arr);
    newMapRow(arr);
    printMapAxel(arr);
  }, 5000);

  mapDrawIntervalID = setInterval(() => {
    // axel.clear();
    // map.printMap(arr);
    printMapAxel(arr);
    // printPlayer(arr);

    // map.sinkMap(arr);
  }, 500);

  stdin.on('data', (key) => {
    if (key === 'x') {
      process.exit();
    }
    if (key === 'a') {
      movePlayerLeft(arr);
      console.log('\nbalra megy');
    }
    if (key === 'd') {
      movePlayerRight(arr);
      console.log('\njobbra megy');
    }
    if (key === 'w') {
      jumpPlayerUp(arr);
      console.log('\nugrás fel');
    }
    if (key === 'q') {
      jumpPlayerUpLeft(arr);
      console.log('\nugrás balra fel');
    }
    if (key === 'e') {
      jumpPlayerUpRight(arr);
      console.log('\nugrás jobbra fel');
    }
  });
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
  playerObj,
  secondCounter,
  lifeCounter,
  gameStart
};
