const map = require('./map');

const term = require('terminal-kit').terminal;
const mainMenu = () => {
  const menuItems = ['Start', 'Controls', 'Exit'];
  term.singleLineMenu(menuItems, (err, arg) => {
    if (err) {
      return;
    }
    term.clear();
    if (arg.selectedIndex === 0) {
      console.log('Start, have fun');
      map.gameStart();
    } else if (arg.selectedIndex === 1) {
      console.log(' Irányítás: ');
      console.log(' balra: a, jobbra: d, ugrás fel: w ');
      console.log(' ugrás balra fel: q, ugrás jobbra fel: e kilépés: x');
    } else if (arg.selectedIndex === 2) {
      console.log('Good Bye');
      process.exit();
    }
  }
  );
};

/*
(' _____            _____                            ');
('|_   _|          |_   _|                           ');
('  | |   ___  _   _ | |  ___ __      __ ___  _ __   ');
('  | |  / __|| | | || | / _ \\ \ /\ / // _ \|\'__|  ');
('_ | |_| (__ | |_| || || (_) |\ V  V /|  __/| |     ');
(' \___/ \___| \__, |\_/ \___/  \_/\_/  \___||_|     ');
('              __/ |                              ');
('             |___/                              ');
('            IcyTower by Krivanz\n');
('---------------------------------------------------\n');
*/

const main = () => {
  mainMenu();
  // map.gameStart();
};

main();
