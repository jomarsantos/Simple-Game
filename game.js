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
	var spriteColumn = 1;
	var spriteRow = 1;
	var spriteHeight = 30;
	var spriteWidth = 30;
	var playerX = 1;
	var playerY = 1;
	var spriteSpeed = 30;
	var tileDimension = 30;
	var mapDimension = 20;

	// Current Map
	var currentMap;

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
				if (map[i][j] == 'W'){
					ctx.fillStyle = "#363947";
					ctx.fillRect(j * tileDimension,i * tileDimension, tileDimension, tileDimension);
				}
				if (map[i][j] == 'X'){
					ctx.fillStyle = "#4D8A4D";
					ctx.fillRect(j * tileDimension,i * tileDimension, tileDimension, tileDimension);
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
		if (currentMap[x][y] == 'W') {
			return 'dead';
		} else if (currentMap[x][y] == 'X') {
			return 'empty';
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
				// TODO: Remove Food and Update
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
				// TODO: Remove Food and Update
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
				// TODO: Remove Food and Update
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
				// TODO: Remove Food and Update
			} else if (moveResult(playerX + 1, playerY) == 'empty') {
				playerX++;
				setPlayer(playerX, playerY);
			}
		}
	}

	var levelOneMap = [
		['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W'],
		['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W'],
		['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W'],
		['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W'],
		['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W'],
		['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W'],
		['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W'],
		['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W'],
		['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W'],
		['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W'],
		['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W'],
		['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W'],
		['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W'],
		['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W'],
		['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W'],
		['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W'],
		['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W'],
		['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W'],
		['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W'],
		['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W']
	];

	function levelOne() {
		renderMap(levelOneMap);
		setPlayer(1,1);
		isCompleted = false;
		levelOneTick();
		function levelOneTick() {
			if (isGameOver) {
				return gameOver();
			}
			if (isCompleted) {
				return levelTwo();
			}
			window.setTimeout(levelOneTick, 100);
		}
	}

	function levelTwo() {
		// isCompleted = false;
		// if (isGameOver) {
		// 	return gameOver();
		// }
		// if (isCompleted) {
		// 	return levelTwo();
		// }
	}

	// Initiate Game
	$('#mainScreen').toggleClass('active', true);
	$('#gameOverScreen').toggleClass('active', true);
	$('#game').toggleClass('active', false);
	levelOne();
}
