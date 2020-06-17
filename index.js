const map = require('./map');

const main = () => {
  const arr = map.generateMap();
  map.fillMapSides(arr);
  map.init();
  map.addPlayer(arr);
  map.creatingPlatforms(arr);

  setInterval(() => {
    console.clear();
    map.printMap(arr);
  }, 1000);
  const stdin = process.stdin;
  stdin.setRawMode(true); // dont wait for enter
  stdin.resume(); // exit only with process.exit
  stdin.setEncoding('utf8'); // characters return
  stdin.on('data', (key) => {
    if (key === 'q') {
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
      map.jumpPlayer(arr);
      console.log('ugrás');
    }
  });
};

main();
