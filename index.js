const map = require('./map');
const table = require('table');
let secondCounter = 0;
const lifeCounter = ['Életek száma: ', '♥ ', '♥ ', '♥ ', '♥ ', '♥ '];

const main = () => {
  const arr = map.generateMap();
  map.fillMapSides(arr);
  map.creatingPlatforms(arr);
  map.addPlayer(arr);
  map.fallingPlayer(arr);

  const stdin = process.stdin;

  stdin.setRawMode(true); // dont wait for enter
  stdin.resume(); // exit only with process.exit
  stdin.setEncoding('utf8'); // characters return

  setInterval(() => {
    secondCounter++;
  }, 1000);

  setInterval(() => {
    map.printPlayer(arr);
    map.sinkMap(arr);
    map.newMapRow(arr);
    map.printMapAxel(arr);
  }, 5000);

  setInterval(() => {
    console.clear();
    // map.printMap(arr);
    map.printMapAxel(arr);
    // map.sinkMap(arr);

    console.log('\n balra: a, jobbra: d, ugrás fel: w, ugrás balra fel: q, ugrás jobbra fel: e kilépés: x');
    console.log('Játékos helyzete X:' + map.playerObj.posX + ' y:' + map.playerObj.posY);
    console.log('Eltelt idő: ' + secondCounter);
    for (let i = 0; i < lifeCounter.length; i++) {
      process.stdout.write(lifeCounter[i]);
    }
  }, 500);

  stdin.on('data', (key) => {
    if (key === 'x') {
      process.exit();
    }
    if (key === 'a') {
      map.movePlayerLeft(arr);
      // console.log('balra megy');
    }
    if (key === 'd') {
      map.movePlayerRight(arr);
      // console.log('jobbra megy');
    }
    if (key === 'w') {
      map.jumpPlayerUp(arr);
      // console.log('ugrás fel');
    }
    if (key === 'q') {
      map.jumpPlayerUpLeft(arr);
      // console.log('ugrás balra fel');
    }
    if (key === 'e') {
      map.jumpPlayerUpRight(arr);
      // console.log('ugrás jobbra fel');
    }
  });
};

main();
