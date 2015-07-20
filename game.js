// Main Menu Screen
function mainScreen() {
	$('#gameOverScreen').toggleClass('active',true);
	$('#mainScreen').toggleClass('active',false);
}

// Game Over Menu
function gameOver() {
	$('#game').toggleClass('active',true);
	$('#gameOverScreen').toggleClass('active',false);
}

// Performed When Clicking "Try Again" From Game Over Menu
function tryAgain() {
	$('#gameOverScreen').toggleClass('active',true);
	startGame();
}

// Start Game
function startGame() {
	// Triggers
	var isGameOver = false;
	var isCompleted = false;

	// Constants
	var playerX = 1;
	var playerY = 1;
	var tileDimension = 30;
	var mapDimension = 20;

	// Level Variables
	var currentMap;
	var foodRemaining;
	var countDown;
	var countDownTimeout;

	// Set Up Canvas
	$('#canvas').toggleClass('active',false);
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = tileDimension * mapDimension;
	canvas.height = tileDimension * mapDimension;

	// Render Map of Level
	function renderMap(map){
		currentMap = map;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#363947";
		for (i = 0; i < mapDimension; i++) {
			for (j = 0; j < mapDimension; j++) {
				if (map[i][j].charAt(0) == 'W'){
					ctx.fillStyle = "#363947";
					ctx.fillRect(j * tileDimension,i * tileDimension, tileDimension, tileDimension);
				}	else if (map[i][j].charAt(0) == 'G'){
					ctx.fillStyle = "#4D8A4D";
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

	// Set Player's Position
	function setPlayer(x, y) {
		playerX = x;
		playerY = y;
		var player = document.getElementById("player");
		player.style.top = y * tileDimension;
		player.style.left = x * tileDimension;
		$('#player').toggleClass('active', false);
	}

	// Returns the result of a move (checks the value of a position)
	function moveResult(x,y) {
		console.log(currentMap);
		if (currentMap[y][x].charAt(1) == 'F') {
			return 'eat';
		}
		if (currentMap[y][x].charAt(0) == 'W') {
			return 'dead';
		} else if (currentMap[y][x].charAt(0) == 'G') {
			return 'empty';
		}
	}

	// Set Food's Position
	function setFood(num, x, y) {
		var id = 'food' + num;
		var food = document.getElementById(id);
		food.style.top = y * tileDimension;
		food.style.left = x * tileDimension;
		$('#' + id).toggleClass('active', false);
	}

	// Returns the result of a move (checks the value of a position)
	function removeFood(x,y) {
		foodRemaining--;
		var num = currentMap[y][x].charAt(2);
		var id = 'food' + num;
		$('#' + id).toggleClass('active', true);
		currentMap[y][x] = currentMap[y][x].charAt(0);
	}

	// Set Count Down
	function setCountDown(x) {
		countDown = x + 1;
		countDownTick();
		function countDownTick() {
			countDown--;
			document.getElementById('countDown').innerHTML = countDown;
			countDownTimeout = setTimeout(countDownTick, 1000);
		}
	}

	// Key Handling
	window.onkeydown = function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		// Key Down
		if (key == 40) {
			if (moveResult(playerX, playerY + 1) == 'dead') {
				isGameOver = true;
			} else if (moveResult(playerX, playerY + 1) == 'eat') {
				playerY++;
				setPlayer(playerX, playerY);
				removeFood(playerX, playerY);
			} else if (moveResult(playerX, playerY + 1) == 'empty') {
				playerY++;
				setPlayer(playerX, playerY);
			}
		// Key Up
		} else if (key == 38) {
			if (moveResult(playerX, playerY - 1) == 'dead') {
				isGameOver = true;
			} else if (moveResult(playerX, playerY - 1) == 'eat') {
				playerY--;
				setPlayer(playerX, playerY);
				removeFood(playerX, playerY);
			} else if (moveResult(playerX, playerY - 1) == 'empty') {
				playerY--;
				setPlayer(playerX, playerY);
			}
		// Key Left
		} else if (key == 37) {
			if (moveResult(playerX - 1, playerY) == 'dead') {
				isGameOver = true;
			} else if (moveResult(playerX - 1, playerY) == 'eat') {
				playerX--;
				setPlayer(playerX, playerY);
				removeFood(playerX, playerY);
			} else if (moveResult(playerX - 1, playerY) == 'empty') {
				playerX--;
				setPlayer(playerX, playerY);
			}
		// Key Right
		} else if (key == 39) {
			if (moveResult(playerX + 1, playerY) == 'dead') {
				isGameOver = true;
			} else if (moveResult(playerX + 1, playerY) == 'eat') {
				playerX++;
				setPlayer(playerX, playerY);
				removeFood(playerX, playerY);
			} else if (moveResult(playerX + 1, playerY) == 'empty') {
				playerX++;
				setPlayer(playerX, playerY);
			}
		}
	}

	var levelOneMap = [
		['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W'],
		['W','GP','GF0','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W']
	];

	function levelOne() {
		foodRemaining = 1;
		setCountDown(5);
		renderMap(levelOneMap);
		isCompleted = false;
		levelOneTick();
		function levelOneTick() {
			if (countDown == 0) {
				isGameOver = true;
			}
			if (isGameOver) {
				clearTimeout(countDownTimeout);
				return gameOver();
			}
			if (foodRemaining == 0) {
				isCompleted = true;
			}
			if (isCompleted) {
				clearTimeout(countDownTimeout);
				return levelTwo();
			}
				window.setTimeout(levelOneTick, 1000/60);
		}
	}

	var levelTwoMap = [
		['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W'],
		['W','G','G','GF2','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','GP','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
		['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W']
	];

	function levelTwo() {

	}

	// Initiate Game
	$('#mainScreen').toggleClass('active', true);
	$('#gameOverScreen').toggleClass('active', true);
	$('#game').toggleClass('active', false);
	levelOne();
}
