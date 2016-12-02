var y
var x
var modePlay=1
var modeOver=2
var mode=modePlay
var squares = [];
var squareSpeed=1

function setup () {
	createCanvas(windowWidth, windowHeight)
	x=windowWidth/2
	y=windowHeight/2
	
	setTimeout(function () {

		setInterval(function () {

			squares.push(square());

			console.log('spawning a new square', squares);

		}, 500);
		setInterval (function () {
			squareSpeed=squareSpeed+1
		},30000)

	}, 3000);
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
		if (collideRectCircle(square.x, square.y, 30, 30, x, y, 80)) {mode=modeOver}
		
	}

}
function drawOver () {
	background(200)
	textAlign(CENTER,CENTER)
	fill (0)
	text("Command R to restart",windowWidth/2, windowHeight/2);

}



function keyPressed() {
	if (keyCode === LEFT_ARROW) {
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