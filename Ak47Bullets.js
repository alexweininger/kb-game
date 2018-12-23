class Ak47Bullets extends Projectile{
	constructor(pos, speed, type) {
		super(pos, speed, type);
	}
}

Ak47Bullets.prototype.draw = function () {
	ellipse(this.pos.x, this.pos.y, 10, 10);
}
