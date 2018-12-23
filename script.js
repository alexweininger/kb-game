var y = 100;
var p = new Player(new Vector(100, 100), 10);

var keyState = {};

var projectiles = [];


function setup() {
	// createCanvas must be the first statement
	createCanvas(1440, 960);
	stroke(0); // Set line drawing color to white
	frameRate(30);
}
// The statements in draw() are executed until the
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again.
function draw() {
	background(255); // Set the background to black
	y = y - 1;
	if (y < 0) {
		y = height;
	}
	ellipse(p.pos.x, p.pos.y, 50, 50);

	window.addEventListener('keydown', function (e) {
		keyState[e.keyCode || e.which] = true;
	}, true);
	window.addEventListener('keyup', function (e) {
		keyState[e.keyCode || e.which] = false;
	}, true);
	gameLoop();
	drawProjectiles();
}

function drawProjectiles() {
	projectiles.forEach(proj => {
		ellipse(proj.pos.x, proj.pos.y, 10, 10);
	});
}

function updateProjectiles() {
	projectiles.forEach(proj => {
		proj.pos.add(proj.speed);
	});
}

function gameLoop() {
	updateProjectiles();
	if (keyState[KEY_W]) {
		console.info("keypress W");
		p.pos.y -= 10;
	}

	if (keyState[KEY_A]) {
		console.info("keypress A");
		p.pos.x -= 10;
	}

	if (keyState[KEY_S]) {
		console.info("keypress S");
		p.pos.y += 10;

	}

	if (keyState[KEY_D]) {
		console.info("keypress D");
		p.pos.x += 10;
	}

	if (keyState[KEY_I] && keyState[KEY_J]) {
		console.info("keypress I");
		projectiles.push(new Projectile(new Vector(p.pos.x, p.pos.y - 30), new Vector(0, -30), "bullet"));
	}
	if (keyState[KEY_J]) {
		console.info("keypress J");
		projectiles.push(new Projectile(new Vector(p.pos.x - 30, p.pos.y), new Vector(-30, 0), "bullet"));
	}
	if (keyState[KEY_K]) {
		console.info("keypress K");
		projectiles.push(new Projectile(new Vector(p.pos.x, p.pos.y + 30), new Vector(0, 30), "bullet"));
	}
	if (keyState[KEY_L]) {
		console.info("keypress L");
		projectiles.push(new Projectile(new Vector(p.pos.x + 30, p.pos.y), new Vector(30, 0), "bullet"));
	}
}

var KEY_W = 87;
var KEY_A = 65;
var KEY_S = 83;
var KEY_D = 68;

var KEY_I = 73;
var KEY_J = 74;
var KEY_K = 75;
var KEY_L = 76;

var KEY_SPACE = 32;
