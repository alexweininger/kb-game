var y = 100;
var p = new Player(new Vector(100, 100), 10);

var keyState = {};

var shootKeys = [];

var projectiles = [];

const CANVAS_HEIGHT = 800;
const CANVAS_WIDTH = 1440;

function setup() {
	// createCanvas must be the first statement
	createCanvas(CANVAS_HEIGHT, CANVAS_WIDTH);
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
	projectiles = projectiles.filter(isOnScreen);
	projectiles.forEach(proj => {
		proj.pos.add(proj.speed);
	});
	if (projectiles.length)
		console.log(projectiles);
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

	if (keyState[KEY_I]) {
		console.info("keypress I");
		// projectiles.push(new Projectile(new Vector(p.pos.x, p.pos.y - 30), new Vector(0, -30), "bullet"));
		keyPress(KEY_I);
	}
	if (keyState[KEY_J]) {
		console.info("keypress J");
		// projectiles.push(new Projectile(new Vector(p.pos.x - 30, p.pos.y), new Vector(-30, 0), "bullet"));
		keyPress(KEY_J);
	}
	if (keyState[KEY_K]) {
		console.info("keypress K");
		// projectiles.push(new Projectile(new Vector(p.pos.x, p.pos.y + 30), new Vector(0, 30), "bullet"));
		keyPress(KEY_K);
	}
	if (keyState[KEY_L]) {
		console.info("keypress L");
		// projectiles.push(new Projectile(new Vector(p.pos.x + 30, p.pos.y), new Vector(30, 0), "bullet"));
		keyPress(KEY_L);
	}
	if (keyState[KEY_I] || keyState[KEY_J] || keyState[KEY_K] || keyState[KEY_L]) {
		fire(shootKeys);
	}
}

function fire(keys) {
	var v = new Vector(0, 0);

	keys.forEach(key => {
		v.add(fireDirection(key));
	});
	if (!(v.x == 0 && v.y == 0)) {
		projectiles.push(new Projectile(new Vector(p.pos.x + 30, p.pos.y), v, "bullet"));

	}
	shootKeys = [];

}

function fireDirection(key) {
	if (key === KEY_I) {
		return new Vector(0, -30);
	}
	if (key === KEY_J) {
		return new Vector(-30, 0);
	}
	if (key === KEY_K) {
		return new Vector(0, 30);
	}
	if (key === KEY_L) {
		return new Vector(30, 0);
	}
}

function keyPress(key) {
	if (isKeyDown(key) && !shootKeys.includes(key)) {
		if (shootKeys.length > 1) {
			shootKeys.pop();
		}
		shootKeys.push(key);
	}

	console.log(shootKeys);
}

function isOnScreen(object) {
	if (object.pos.x < -100 || object.pos.y < -100 || object.pos.x > CANVAS_WIDTH + 100 || object.pos.y > CANVAS_HEIGHT + 100) {
		return false;
	}
	return true;
}

function isKeyDown(key) {
	return keyState[key];
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
