let serial;
let sensors = "";
let sensor0, sensor1;

let paddleL, paddleR, ball, wallTop, wallBottom;
let serveSpeed = 10;

let label;

function preload() {
	label = loadImage('workLabel.png');
}
function setup() {
	createCanvas(windowWidth, windowHeight);

    serial = new p5.SerialPort();
	serial.openPort('COM4');  //something like /dev/tty.usbmodem14401 for MacOS or COM3 for PC
    serial.on('data', gotData);

	allSprites.collider = 'static';
	allSprites.shapeColor = color(255);

	paddleL = new Sprite(30, height / 2, 10, 100);
	paddleR = new Sprite(width - 28, height / 2, 10, 100);

	wallTop = new Sprite(width / 2, 0, width, 30);
	wallBottom = new Sprite(width / 2, height, width, 30);

	ball = new Sprite(width / 2, height / 2, 10, 10, 'dynamic');

	ball.collide(paddleL, () => {
		ball.direction -= (ball.y - paddleL.y) * 0.5;
		ball.speed = serveSpeed;
	});

	ball.collide(paddleR, () => {
		ball.direction += (ball.y - paddleR.y) * 0.5;
		ball.speed = serveSpeed;
	});

	ball.bounciness = 1;
	ball.rotationLock = true;
	ball.speed = serveSpeed;
	ball.friction = 0;

	let pallette = { w: color(255), ' ': color(0, 0, 0, 0) };
	net = spriteArt('w \n w\n'.repeat(height / 2), 2, pallette);
}

function gotData() {
    let serialInput = serial.readLine();
    trim(serialInput);
    if (!serialInput) return;
	sensors = split(serialInput, ',');
	if (sensors.length == 2) {
		sensor0 = int(sensors[0]);
		sensor1 = int(sensors[1]);
    }
}

function draw() {
	background(63, 63, 63);
	image(label, width / 2 - 586, height / 2 - 328);
    image(net, width / 2 - 1, 0);

	paddleL.y = map(sensor0, 0, 1023, 50, windowHeight - 50);
	paddleR.y = map(sensor1, 0, 1023, 50, windowHeight - 50);
	
	if (ball.x < -400) {
		ball.direction = 0;
	} else if (ball.x > width + 400) {
		ball.direction = 180;
	}
	if (ball.x < -400 || ball.x > width + 400) {
		ball.x = width / 2;
		ball.y = height / 2;
		ball.speed = serveSpeed;
	}	
}