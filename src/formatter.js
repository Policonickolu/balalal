
/* format string to monster object
 *
 * ex:
 * { 0: 
 *  { id: '0',
 *    city: 'Modema'
 *   } 
 * }
 */
exports.formatMonsters = function (number){

  var monsters = {}

  for(var i = 0; i < number; i++){
    monsters[i] = {
      id: i,
      city: null
    };
  }

  return monsters;
}

/* format string to city object
 *
 * ex:
 * { Dimilu: 
 *  { north: 'Eludisnismu',
 *    south: 'Emusnu',
 *    east: 'Modema',
 *    west: 'E',
 *    monster: [id] } 
 * }
 */
exports.formatInputMap = function(map){

  var cities = {};

  for(var i = 0; i < map.length; i++){
    
    var data = map[i].split(" ").map( (el) => { return el.split("=")} )

    cities[data[0]] = {};
    
    for(var j = 1; j < data.length; j++){
    
      cities[data[0]][data[j][0]] = data[j][1]; 
    
    }

  }

  return cities;
}

exports.formatOutputMap = function(cities){

  var map = [];

  for(i in cities){

    var city = [];

    for(j in cities[i]){

      city.push(j + "=" + cities[i][j]);

    }

    map.push(i + " " + city.join(" "));

  }

  return map;

}