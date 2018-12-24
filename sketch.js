p5.disableFriendlyErrors = true;
var CANVAS_HEIGHT = 800;
var CANVAS_WIDTH = 1440;
var keyState = {};
var p;
var shootKeys = [];
var walking = false;
var projectiles = [];
var walkToggle = false;
var item;
var itemsSprites = [];
var itemSprite;
var items = [];
var walls;
var projectileSprites = [];
var itemsOnGround = [];

function setup() {
	// createCanvas must be the first statement
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	stroke(0); // Set line drawing color to white
	frameRate(60);
	p = new Player(new Vector(100, 100), 5); // creating the player object
	// ps = createSprite(p.pos.x, p.pos.y, 30, 30); // creating the player sprite
	p.makeSprite();
	items.push(new HealthPack(200, 200, 20));
}
// The statements in draw() are executed until the
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again.
function draw() {

	// keyboard event listeners
	window.addEventListener('keydown', function (e) {
		keyState[e.keyCode || e.which] = true;
	}, true);
	window.addEventListener('keyup', function (e) {
		keyState[e.keyCode || e.which] = false;
	}, true);

	background(255); // Set the background to white
	drawGui(p);
	inputLoop();
	detectItemPickup();
	drawSprites();
	projectileCollision();
}

function detectItemPickup() {
	for (let i = 0; i < items.length; i++) {
		const it = items[i];
		if (it.sprite.overlap(p.sprite)) {
			if (p.items.length == 0) {
				p.currentItemIndex = 0;
			}
			console.log("collide");
			it.collisionAction(p);
		}

	}
}

function projectileCollision() {
	var i = 0;
	projectiles.forEach(pr => {
		if (pr.sprite.collide(p.sprite)) {
			p.health -= projectiles[i].damage;
			pr.sprite.remove();
		}
		i++;
	});
}

function drawGui(p) {
	textSize(32);
	var i = 0;
	p.items.forEach(item => {
		fill(0);
		stroke(0);
		if (p.currentItemIndex == i) {
			stroke(83, 66, 244);
			fill(83, 66, 244);
		}
		text(item.name, 10 + i * 200, height - 50);
		i++;
	});
	var fps = frameRate();
	fill(0);
	stroke(0);
	textSize(18);
	text(fps.toFixed(0), 10, height - 10);
	text("Health: " + p.health, 10, height - 100);
	if (p.getItemInHand() instanceof ProjectileWeapon)
		text("Bullets: " + p.getItemInHand().getAmmo(), 120, height - 100);
}

function inputLoop() {
	p.sprite.position.x = p.pos.x;
	p.sprite.position.y = p.pos.y;
	p.updateItemSprite();

	if (keyState[KEY_W]) {
		if (p.pos.y > 0)
			p.pos.y -= p.speed;
		p.facing = 0;
	}
	if (keyState[KEY_A]) {
		if (p.pos.x > 0)
			p.pos.x -= p.speed;
		p.facing = 3;
	}
	if (keyState[KEY_S]) {
		if (p.pos.y < CANVAS_HEIGHT)
			p.pos.y += p.speed;
		p.facing = 2;
	}
	if (keyState[KEY_D]) {
		if (p.pos.x < CANVAS_WIDTH)
			p.pos.x += p.speed;
		p.facing = 1;
	}
	if (keyState[KEY_W] || keyState[KEY_A] || keyState[KEY_S] || keyState[KEY_D]) {
		walking = true;
	}

	if (keyState[KEY_I]) {
		keyPress(KEY_I);
	}
	if (keyState[KEY_J]) {
		keyPress(KEY_J);
	}
	if (keyState[KEY_K]) {
		keyPress(KEY_K);
	}
	if (keyState[KEY_L]) {
		keyPress(KEY_L);
	}
	if (keyState[KEY_I] || keyState[KEY_J] || keyState[KEY_K] || keyState[KEY_L]) {
		fire(shootKeys);
	}
	if (keyState[KEY_Q]) {
		p.prevItem();
		keyState[KEY_Q] = false;
	}
	if (keyState[KEY_E]) {
		p.nextItem();
		keyState[KEY_E] = false;
	}
	if (keyState[KEY_C]) {
		if (p.items.length != 0) {
			var h = p.getItemInHand();
			if (h) {
				if (p.items.length == 1) {
					p.currentItemIndex = 0;
				}
				p.dropItem(p.pos);
				items.push(h);
			}
		}
		keyState[KEY_C] = false;
	}
}

function fire(keys) {
	if (p.getItemInHand() instanceof ProjectileWeapon) {
		if (p.getItemInHand().getAmmo() > 0) {
			var d = new Date();
			if (p.getItemInHand().lastUse - d < -p.getItemInHand().rateOfFire) {
				var v = new Vector(0, 0);

				keys.forEach(key => {
					v.add(fireDirection(key));
				});
				if (!(v.x == 0 && v.y == 0)) {
					p.getItemInHand().lastUse = new Date();
					p.getItemInHand().ammo--;
					var projectile = createSprite(p.pos.x + 30, p.pos.y, 5, 5);
					projectile.shapeColor = 0;
					projectile.velocity.x = v.x;
					projectile.velocity.y = v.y;
					// projectileSprites.push(projectile);
					projectiles.push(new Projectile(p.pos, v, p.getItemInHand().damage, projectile));
				}
			}
		}
	}
	shootKeys = [];
}

var KEY_W = 87;
var KEY_A = 65;
var KEY_S = 83;
var KEY_D = 68;

var KEY_I = 73;
var KEY_J = 74;
var KEY_K = 75;
var KEY_L = 76;

var KEY_Q = 81;
var KEY_E = 69;

var KEY_C = 67;

var KEY_SPACE = 32;

function fireDirection(key) {
	if (key === KEY_I) {
		return new Vector(0, -p.getItemInHand().speed);
	}
	if (key === KEY_J) {
		return new Vector(-p.getItemInHand().speed, 0);
	}
	if (key === KEY_K) {
		return new Vector(0, p.getItemInHand().speed);
	}
	if (key === KEY_L) {
		return new Vector(p.getItemInHand().speed, 0);
	}
}

function keyPress(key) {
	if (isKeyDown(key) && !shootKeys.includes(key)) {
		if (shootKeys.length > 1) {
			shootKeys.pop();
		}
		shootKeys.push(key);
	}
}

function isKeyDown(key) {
	return keyState[key];
}
