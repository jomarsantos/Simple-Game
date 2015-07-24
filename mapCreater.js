// Map Constants
var tileDimension = 30;
var mapDimension = 20;

// Selected
var selectedX = 0;
var selectedY = 0;

// Food
var food = [false, false, false, false, false, false, false, false, false, false];

// Canvas Initialization
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = tileDimension * mapDimension;
canvas.height = tileDimension * mapDimension;

// Initial Blank Map
var blankMap =
  [["W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W"],
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
  ["W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W"]];

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
      if (map[i][j].length > 1) {
        if (map[i][j].charAt(1) == 'P'){
          setPlayer(j,i);
        } else if (map[i][j].charAt(1) == 'F'){
          setFood(map[i][j].charAt(2), j, i);
        }
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
  currentMap[selectedY][selectedX] = x;
  if (x == 'W'){
    ctx.fillStyle = "#3D6BBF";
    ctx.fillRect(selectedX * tileDimension, selectedY * tileDimension, tileDimension, tileDimension);
  }	else if (x == 'G'){
    ctx.fillStyle = "#B8A073";
    ctx.fillRect(selectedX * tileDimension, selectedY * tileDimension, tileDimension, tileDimension);
  }
}

// Set Food's Position
function toggleFood() {
  if(currentMap[selectedY][selectedX].charAt(1) == 'F') {
    currentMap[selectedY][selectedX] = currentMap[selectedY][selectedX].charAt(0);
  } else {
    var i;
    for (i = 0; i < food.length; i++) {
      if (food[i] == false) {
        break;
      }
    }
    currentMap[selectedY][selectedX] = currentMap[selectedY][selectedX] + 'F' + i;
    var id = 'food' + i;
    var food = document.getElementById(id);
    food.style.top = selectedY * tileDimension;
    food.style.left = selectedX * tileDimension;
    $('#' + id).toggleClass('active', false);
  }
}

// On Click Of Done Button Open Source Pop Up
function done() {
  $('#selected').toggleClass('active',true);
  $('#source').toggleClass('active',false);
  var source = JSON.stringify(currentMap);
  document.getElementById("source").innerHTML = source.replace(new RegExp("],", "g"), "],<br>");
}

// Close Source Pop Up
function closeSource() {
  $('#selected').toggleClass('active', false);
  $('#source').toggleClass('active', true);
}

// Reset Map
function reset() {
  $('#selected').toggleClass('active', false);
  $('#source').toggleClass('active', true);
  currentMap = [];
  for (var i = 0; i < blankMap.length; i++)
      currentMap[i] = blankMap[i].slice();
  renderMap(currentMap);
}
