const map = require('./map');

const term = require('terminal-kit').terminal;
term.clear();
const mainMenu = () => {
  console.log(' _____            _____                            ');
  console.log('|_   _|          |_   _|                           ');
  console.log('  | |   ___  _   _ | |  ___ __      __ ___  _ __   ');
  console.log('  | |  / __|| | | || | / _ \\\\ \\ /\\ / // _ \\|  __|  ');
  console.log(' _| |_| (__ | |_| || || (_) |\\ V  V /|  __/| |     ');
  console.log(' \\___/ \\___| \\__, |\\_/ \\___/  \\_/\\_/  \\___||_|     ');
  console.log('              __/ |                                ');
  console.log('             |___/                                 ');
  console.log('       almost IcyTower by Krivanz\n                ');
  console.log('---------------------------------------------------\n');

  const menuItems = ['Start', 'Controls', 'Exit'];
  term.singleLineMenu(menuItems, (err, arg) => {
    if (err) {
      return;
    }
    term.clear();
    if (arg.selectedIndex === 0) {
      console.log('Start, have fun');
      map.stdinStart();
      map.gameStart();
      // map.stdinStart();
    } else if (arg.selectedIndex === 1) {
      console.log(' Irányítás: ');
      console.log(' balra: a, jobbra: d, ugrás fel: w ');
      console.log(' ugrás balra fel: q, ugrás jobbra fel: e kilépés: x');

      setTimeout(() => {}, 10000);
      term.clear();

      mainMenu();
    } else if (arg.selectedIndex === 2) {
      console.log('Good Bye');
      process.exit();
    }
  }
  );
};

const main = () => {
  mainMenu();
  // map.gameStart();
};

main();

module.exports = {
  mainMenu
};
