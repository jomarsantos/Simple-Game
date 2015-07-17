function init() {
	$('#start').toggleClass('active');
	startGame();
}

function startGame() {
	var score = 0;
	var spriteTop = 30;
	var spriteLeft = 30;
	var targetTop;
	var targetLeft;
	var frameHeight = 600;
	var frameWidth = 600;
	var spriteHeight = 30;
	var spriteWidth = 30;
	var spriteSpeed = 30;
	var minTickSpeed = 140;
	var maxTickSpeed = 50;
	var tickSpeedIncrement = 10;
	var tickSpeed = minTickSpeed;
	var keys = {left:false, right:false, up:false, down:false};

	document.getElementById('sprite').style.top = spriteTop + "px";
	document.getElementById('sprite').style.left = spriteLeft + "px";
	document.getElementById('score').innerHTML = score;
	setSpeedTracker()
	$('#game').toggleClass('active');

	setTargetCoordinates();
	function setTargetCoordinates() {
		targetTop = Math.floor(Math.random() * 20 + 1) * 30 - 30;
		targetLeft = Math.floor(Math.random() * 20 + 1) * 30 - 30;
		document.getElementById('target').style.top = targetTop;
		document.getElementById('target').style.left = targetLeft;
		// document.getElementById('target').style.backgroundColor = getRandomColor();
	}

	// function getRandomColor() {
	//   var letters = '0123456789ABCDEF'.split('');
	//   var color = '#';
	//   for (var i = 0; i < 6; i++ ) {
	//     color += letters[Math.floor(Math.random() * 16)];
	//   }
	//   return color;
	// }

	tick();
	function tick() {
		if ((keys['up'] && (spriteTop - spriteSpeed < 0)) ||
		(keys['down'] && (spriteTop + spriteSpeed + spriteHeight > frameHeight))  ||
		(keys['left'] && (spriteLeft - spriteSpeed < 0)) ||
		(keys['right'] && (spriteLeft + spriteSpeed + spriteWidth > frameWidth))) {
			$('#game').toggleClass('active');
			$('#gameOver').toggleClass('active');
			return;
		}
		if (keys['down'] && spriteTop + spriteSpeed + spriteHeight <= frameHeight) {
			spriteTop += spriteSpeed;
			document.getElementById('sprite').style.top = spriteTop + "px";
		}
		if (keys['up'] && (spriteTop - spriteSpeed) >= 0) {
			spriteTop -= spriteSpeed;
			document.getElementById('sprite').style.top = spriteTop + "px";
		}
		if (keys['left'] && (spriteLeft - spriteSpeed) >= 0) {
			spriteLeft -= spriteSpeed;
			document.getElementById('sprite').style.left = spriteLeft + "px";
		}
		if (keys['right'] && spriteLeft + spriteSpeed + spriteWidth <= frameWidth) {
			spriteLeft += spriteSpeed;
			document.getElementById('sprite').style.left = spriteLeft + "px";
		}
		if (spriteTop == targetTop & spriteLeft == targetLeft) {
			addPoint();
			setTargetCoordinates();
		}
		window.setTimeout(tick, tickSpeed);
	}

	function setSpeedTracker() {
		var enabled = 10 - ((tickSpeed - maxTickSpeed) / tickSpeedIncrement);
		var disabled = 10 - enabled;
		document.getElementById('enabledSpeed').innerHTML = Array(enabled+1).join("&#8226;");
		document.getElementById('disabledSpeed').innerHTML = Array(disabled+1).join("&#8226;");
	}

	function addPoint() {
		score++;
		document.getElementById('score').innerHTML = score;
	}

	window.onkeydown = function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		if (key == 40) {
			keys['down'] = true;
		} else if (key == 38) {
			keys['up'] = true;
		} else if (key == 37) {
			keys['left'] = true;
		} else if (key == 39) {
			keys['right'] = true;
		} else if (key == 65 && tickSpeed < minTickSpeed) {
			tickSpeed += tickSpeedIncrement;
			setSpeedTracker()
		} else if (key == 83 && tickSpeed > maxTickSpeed) {
			tickSpeed -= tickSpeedIncrement;
			setSpeedTracker()
		}
	}

	window.onkeyup = function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		if (key == 40) {
			keys['down'] = false;
		} else if (key == 38) {
			keys['up'] = false;
		} else if (key == 37) {
			keys['left'] = false;
		} else if (key == 39) {
			keys['right'] = false;
		}
	}
}

function tryAgain() {
	$('#gameOver').toggleClass('active');
	$('#start').toggleClass('active');
}

// window.onkeydown = function(e) {
// 	var key = e.keyCode ? e.keyCode : e.which;
// 	if (key == 32) {
// 		$('#gameOver').toggleClass('active',true);
// 		init();
// 	}
// }
