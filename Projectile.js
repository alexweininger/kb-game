class Projectile {
	constructor(pos, speed, type) {
		this.pos = pos;
		this.speed = speed;
		this.type = type;
	}
}

Projectile.prototype.draw = function () {
	ellipse(this.pos.x, this.pos.y, 10, 10);
}
