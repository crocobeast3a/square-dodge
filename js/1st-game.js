var modePlay = 1;
var modeOver = 2;
var rKey = 82
var song;
var boom
var mode;
var y;
var x;
var squares;
var squareSpeed;
var timeout
var squareIntervalId;
var speedIntervalId;

function startGame() {
	mode = modePlay
	squares = [];
	squareSpeed = 1
	x=windowWidth/2
	y=windowHeight/2
	timeout = setTimeout(function () {

		squareIntervalId = setInterval(function () {

			squares.push(square());

			console.log('spawning a new square', squares);

		}, 500);

		speedIntervalId = setInterval(function () {
			squareSpeed=squareSpeed+1
		}, 30000);

	}, 3000);

}
function stopGame() {
	clearInterval(squareIntervalId)
	clearInterval(speedIntervalId)
	clearTimeout(timeout)
	mode = modeOver
}

function preload() {
 song = loadSound('sound/background.mp3');
 boom = loadSound('sound/explosion.mp3')
}

function setup () {
	createCanvas(windowWidth, windowHeight)
	song.loop()
	startGame()
}


function draw () {
	if (mode===modePlay){
		drawPlay ()
	} else if (mode===modeOver) {
		drawOver()
	}
}


function drawPlay () {

	background(200);
	fill (0, 0, 255)
	ellipse (x, y, 80, 80)

	 //collide the cir object into this rectangle objec

	for (var i = 0; i < squares.length; i++) {
		var square = squares[i];
		fill (255, 0, 0)
		rect(square.x, square.y, 30, 30);
		square.y+=squareSpeed;
		if (collideRectCircle(square.x, square.y, 30, 30, x, y, 80)) {
			boom.play()
			stopGame()
		}
		
	}

}
function drawOver () {
	background(200)
	textAlign(CENTER,CENTER)
	fill (0)
	text("Press R to restart",windowWidth/2, windowHeight/2);

}



function keyPressed() {
	if (keyCode === rKey) {
		stopGame()
		startGame()
	} else if (keyCode === LEFT_ARROW) {
		x=x-50
		if (x <0){x=displayWidth}
		}
	else if (keyCode === RIGHT_ARROW) {
	
		x=x+50
		if (x >displayWidth) {
			x=0
		}
	}
	if (keyCode === UP_ARROW) {
		if (y<0) {
			y=displayHeight
		} else {
			y=y-50
		}
	} else if (keyCode === DOWN_ARROW) {
	
		y=y+50
		if (y>displayHeight) {
			y=1
        }
    }
}

function square() {
	return {
		x: Math.floor(Math.random() * displayWidth),
		y: 0
	};
}