const map = require('./map');
const table = require('table');

const main = () => {
  const arr = map.generateMap();
  map.fillMapSides(arr);
  map.init();
  map.addPlayer(arr);
  map.creatingPlatforms(arr);

  setInterval(() => {
    console.clear();
    // map.printMap(arr);
    map.printMapAxel(arr);

    console.log('\n balra: a, jobbra: d, ugrás fel: w, ugrás balra fel: q, ugrás jobbra fel: e kilépés: x');
  }, 1000);
  const stdin = process.stdin;
  stdin.setRawMode(true); // dont wait for enter
  stdin.resume(); // exit only with process.exit
  stdin.setEncoding('utf8'); // characters return
  stdin.on('data', (key) => {
    if (key === 'x') {
      process.exit();
    }
    if (key === 'a') {
      map.movePlayerLeft(arr);
      console.log('balra megy');
    }
    if (key === 'd') {
      map.movePlayerRight(arr);
      console.log('jobbra megy');
    }
    if (key === 'w') {
      map.jumpPlayerUp(arr);
      console.log('ugrás fel');
    }
    if (key === 'q') {
      map.jumpPlayerUpLeft(arr);
      console.log('ugrás balra fel');
    }
    if (key === 'e') {
      map.jumpPlayerUpRight(arr);
      console.log('ugrás jobbra fel');
    }
  });
};

main();
