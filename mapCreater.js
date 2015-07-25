// Map Constants
var tileDimension = 30;
var mapDimension = 20;

// Selected
var selectedX = 0;
var selectedY = 0;

// Food Tracker
var foodTracker = [false, false, false, false, false, false, false, false, false, false];
var foodAmt = 0;

// Player Set
var playerSet = false;

// Canvas Initialization
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = tileDimension * mapDimension;
canvas.height = tileDimension * mapDimension;

// Initial Blank Map
var blankMap = [
  ["W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W"],
  ["W","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","W"],
  ["W","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","W"],
  ["W","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","W"],
  ["W","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","W"],
  ["W","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","W"],
  ["W","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","W"],
  ["W","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","W"],
  ["W","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","W"],
  ["W","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","W"],
  ["W","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","W"],
  ["W","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","W"],
  ["W","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","W"],
  ["W","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","W"],
  ["W","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","W"],
  ["W","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","W"],
  ["W","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","W"],
  ["W","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","W"],
  ["W","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","W"],
  ["W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W"]
];

// Duplicate Blank Map
var currentMap = [];
for (var i = 0; i < blankMap.length; i++)
    currentMap[i] = blankMap[i].slice();

// Render Map On Initialization and Reset
renderMap(currentMap);
function renderMap(map) {
  currentMap = map;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#363947";
  for (i = 0; i < mapDimension; i++) {
    for (j = 0; j < mapDimension; j++) {
      if (map[i][j].charAt(0) == 'W'){
        ctx.fillStyle = "#3D6BBF";
        ctx.fillRect(j * tileDimension,i * tileDimension, tileDimension, tileDimension);
      }	else if (map[i][j].charAt(0) == 'G'){
        ctx.fillStyle = "#B8A073";
        ctx.fillRect(j * tileDimension,i * tileDimension, tileDimension, tileDimension);
      }
    }
  }
}

// Key Handling
window.onkeydown = function(e) {
  var key = e.keyCode ? e.keyCode : e.which;
  // Key Down
  if (key == 40) {
    if (canMoveHere(selectedX, selectedY + 1)) {
      selectedY++;
      setSelected(selectedX, selectedY);
    }
    // Key Up
  } else if (key == 38) {
    if (canMoveHere(selectedX, selectedY - 1)) {
      selectedY--;
      setSelected(selectedX, selectedY);
    }
    // Key Left
  } else if (key == 37) {
    if (canMoveHere(selectedX - 1, selectedY)) {
      selectedX--;
      setSelected(selectedX, selectedY);
    }
    // Key Right
  } else if (key == 39) {
    if (canMoveHere(selectedX + 1, selectedY)) {
      selectedX++;
      setSelected(selectedX, selectedY);
    }
    // 1
  } else if (key == 49 || key == 97) {
      setCurrPos('W');
    // 2
  } else if (key == 50 || key == 98) {
    setCurrPos('G');
    // 3
  } else if (key == 51 || key == 99) {
    toggleFood();
    // 4
  } else if (key == 52 || key == 100) {


    // 5
  } else if (key == 53 || key == 101) {


    // 6
  } else if (key == 54 || key == 102) {


    // 7
  } else if (key == 55 || key == 103) {


    // 8
  } else if (key == 56 || key == 104) {


    // 9
  } else if (key == 57 || key == 105) {


    // 0
  } else if (key == 48 || key == 96) {


   // 0
  } else if (key == 80) {
    togglePlayer();
  }
}

// Check If Selected Can Move Here
function canMoveHere(x, y) {
  if (x >= 0 && x <= 19 && y >= 0 && y <= 19) {
    return true;
  }
  return false;
}

// Set Selected Position
function setSelected(x, y) {
  var selected = document.getElementById("selected");
  selected.style.top = y * tileDimension;
  selected.style.left = x * tileDimension;
}

// Set Map Position With Type
function setCurrPos(x) {
  if (x == 'W'){
    if(currentMap[selectedY][selectedX].charAt(1) == 'F') {
      foodTracker[currentMap[selectedY][selectedX].charAt(2)] = false;
      var id = 'food' + currentMap[selectedY][selectedX].charAt(2);
      $('#' + id).toggleClass('active', true);
      foodAmt--;
    }
    if(currentMap[selectedY][selectedX].charAt(1) == 'P') {
      playerSet = false;
      $('#player').toggleClass('active', true);
    }
    ctx.fillStyle = "#3D6BBF";
    ctx.fillRect(selectedX * tileDimension, selectedY * tileDimension, tileDimension, tileDimension);
    currentMap[selectedY][selectedX] = x;
  }	else if (x == 'G'){
    if(currentMap[selectedY][selectedX].charAt(1) == 'F') {
      currentMap[selectedY][selectedX] = x + currentMap[selectedY][selectedX].substring(1,3);
    } else if(currentMap[selectedY][selectedX].charAt(1) == 'P') {
      currentMap[selectedY][selectedX] = x + 'P';
    } else {
      currentMap[selectedY][selectedX] = x;
    }
    ctx.fillStyle = "#B8A073";
    ctx.fillRect(selectedX * tileDimension, selectedY * tileDimension, tileDimension, tileDimension);
  }
}

// Toggle Player at Current Position
function togglePlayer() {
  if(currentMap[selectedY][selectedX].charAt(0) == 'W') {
    return;
  } else if (currentMap[selectedY][selectedX].charAt(1) == 'P') {
    currentMap[selectedY][selectedX] = currentMap[selectedY][selectedX].charAt(0);
    $('#player').toggleClass('active', true);
    playerSet = false;
  } else if(currentMap[selectedY][selectedX].charAt(1) == 'F') {
    foodTracker[currentMap[selectedY][selectedX].charAt(2)] = false;
    var id = 'food' + currentMap[selectedY][selectedX].charAt(2);
    $('#' + id).toggleClass('active', true);
    foodAmt--;
    currentMap[selectedY][selectedX] = currentMap[selectedY][selectedX].charAt(0) + 'P';
    var player = document.getElementById('player');
    player.style.top = selectedY * tileDimension;
    player.style.left = selectedX * tileDimension;
    $('#player').toggleClass('active', false);
    playerX = selectedX;
    playerY = selectedY;
    playerSet = true;
  } else if (currentMap[selectedY][selectedX].charAt(1) != 'P' && playerSet) {
    currentMap[playerY][playerX] = currentMap[playerY][playerX].charAt(0);
    currentMap[selectedY][selectedX] = currentMap[selectedY][selectedX].charAt(0) + 'P';
    var player = document.getElementById('player');
    player.style.top = selectedY * tileDimension;
    player.style.left = selectedX * tileDimension;
    $('#player').toggleClass('active', false);
    playerX = selectedX;
    playerY = selectedY;
    playerSet = true;
  } else {
    currentMap[selectedY][selectedX] = currentMap[selectedY][selectedX].charAt(0) + 'P';
    var player = document.getElementById('player');
    player.style.top = selectedY * tileDimension;
    player.style.left = selectedX * tileDimension;
    $('#player').toggleClass('active', false);
    playerX = selectedX;
    playerY = selectedY;
    playerSet = true;
  }
}

// Toggle Food at Current Position
function toggleFood() {
  if(currentMap[selectedY][selectedX].charAt(0) == 'W') {
    return;
  } else if(currentMap[selectedY][selectedX].charAt(1) == 'P' && foodAmt < 10) {
    currentMap[selectedY][selectedX] = currentMap[selectedY][selectedX].charAt(0);
    $('#player').toggleClass('active', true);
    playerSet = false;
    var i;
    for (i = 0; i < foodTracker.length; i++) {
      if (foodTracker[i] == false) {
        foodTracker[i] = true;
        break;
      }
    }
    currentMap[selectedY][selectedX] = currentMap[selectedY][selectedX] + 'F' + i;
    var id = 'food' + i;
    var food = document.getElementById(id);
    food.style.top = selectedY * tileDimension;
    food.style.left = selectedX * tileDimension;
    $('#' + id).toggleClass('active', false);
    foodAmt++;
  } else if(currentMap[selectedY][selectedX].charAt(1) == 'F') {
    foodTracker[currentMap[selectedY][selectedX].charAt(2)] = false;
    var id = 'food' + currentMap[selectedY][selectedX].charAt(2);
    $('#' + id).toggleClass('active', true);
    currentMap[selectedY][selectedX] = currentMap[selectedY][selectedX].charAt(0);
    foodAmt--;
  } else if (foodAmt < 10){
    var i;
    for (i = 0; i < foodTracker.length; i++) {
      if (foodTracker[i] == false) {
        foodTracker[i] = true;
        break;
      }
    }
    currentMap[selectedY][selectedX] = currentMap[selectedY][selectedX] + 'F' + i;
    var id = 'food' + i;
    var food = document.getElementById(id);
    food.style.top = selectedY * tileDimension;
    food.style.left = selectedX * tileDimension;
    $('#' + id).toggleClass('active', false);
    foodAmt++;
  }
}

// On Click Of Done Button Open Source Pop Up
function done() {
  $('#selected').toggleClass('active',true);
  $('#source').toggleClass('active');
  var source = JSON.stringify(currentMap);
  if (playerSet) {
    document.getElementById("mapSource").innerHTML = source.replace(new RegExp("],", "g"), "],<br>");
    document.getElementById("foodAmt").innerHTML = "Amount of Food: " + foodAmt;
  } else {
    document.getElementById("mapSource").innerHTML = "Error: Player's starting position must be set for map source to be generated.";
  }
}

// Close Source Pop Up
function closeSource() {
  $('#selected').toggleClass('active', false);
  $('#source').toggleClass('active', true);
}

// Reset Map
function reset() {
  var i;
  for (i = 0; i < foodTracker.length; i++) {
    if (foodTracker[i] == true) {
      $('#food' + i).toggleClass('active', true);
    }
  }
  $('#player').toggleClass('active', true);
  foodAmt = 0;
  foodTracker = [false, false, false, false, false, false, false, false, false, false];
  playerSet = false;
  $('#selected').toggleClass('active', false);
  $('#source').toggleClass('active', true);
  currentMap = [];
  for (var i = 0; i < blankMap.length; i++)
      currentMap[i] = blankMap[i].slice();
  renderMap(currentMap);
}
