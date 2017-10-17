const formatter = require('./formatter');

exports.launchAttack = function(number, map){

  
  var map = formatter.formatInputMap(map);
  var monsters = formatter.formatMonsters(number);

  releaseMonstersToRandomLocation(monsters, map);

  for(var i = 0; i < 10000 && Object.keys(monsters).length > 0; i++){

    for(var m in monsters){

      moveToAnotherCity(m, monsters, map);

    }

  }

  return formatter.formatOutputMap(map);

};

function releaseMonstersToRandomLocation(monsters, map){

  var cities = Object.keys(map);

  for(monster in monsters){

    do {

      var i = Math.floor(Math.random() * (cities.length - 1));
    
    // 2 monsters cannot be released in the same city
    } while(map[cities[i]].monster);

    map[cities[i]].monster = monster;
    monsters[monster].city = cities[i];

  }

}

function moveToAnotherCity(monsterId, monsters, map){

  var monster = monsters[monsterId];

  var currentCity = Object.assign( {}, map[monster.city] );
  delete currentCity.monster;


  var routes = Object.keys(currentCity);

  if(routes.length > 0){
    var i = Math.floor(Math.random() * (routes.length - 1));

    var nextCity = currentCity[routes[i]];

    //console.log("Monster " + monsterId + ", à " + monster.city + " va se déplacer vers " + routes[i] + " vers " + nextCity);

    if(!map[nextCity].monster){

      delete map[monster.city].monster;
      map[nextCity].monster = monster.id;
      monster.city = nextCity;


      //console.log("La ville est libre ! Monstre " + map[nextCity].monster + " arrive à " + monster.city + " !");

    }else{
      //console.log("La ville est occupée par " + map[nextCity].monster + " ! Monstre " + monster.id + " l'attaque en plein milieu de " + monster.city + " !");

      attackCity(nextCity, monster, monsters, map);
    }
  
  }else{
    console.log("Monster " + monsterId + " is traped in " + monster.city);
    delete monsters[monsterId];
  }

}

function attackCity(city, monster, monsters, map){

  console.log(city + " has been destroyed by monster " + monster.id + " and monster " + map[city].monster + "!");

  delete monsters[monster.id];
  delete monsters[map[city].monster];

  var neighbours = Object.assign( {}, map[city] );
  delete neighbours.monster;

  // For each city's neighbour
  for(var n in neighbours){

    // We check each road
    var routes = map[neighbours[n]];

    // For each road, if the destination is the destroyed city,
    // we delete the road
    for(r in routes){
      if(routes[r] === city)
        delete map[neighbours[n]][r];

    }

  }

  delete map[city];

}