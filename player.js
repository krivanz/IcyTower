const PLAYER = 'O';
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

const addPlayer = () => {
  arr[pPosR][pPosC] = PLAYERSIGN;
};

const movePlayer = () => {

};
