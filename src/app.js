const readline = require('readline-sync');

const simulator = require('./simulator');
const fio = require('./files-io');

const inputFilePath = 'maps/world_map_medium.txt';
const outputFilePath = 'maps/destroyed_world_map.txt';


var map = fio.readFile(inputFilePath);

do {
  
  // Ask an number to the CLI
  var number = readline.question("How many monsters ? (entre 2 et " + map.length + ") ");

  // We cannot add 0, 1 or more monsters than there is cities
} while(number < 2 || number > map.length);

var newMap = simulator.launchAttack(number, map);

fio.writeFile(newMap, outputFilePath);

