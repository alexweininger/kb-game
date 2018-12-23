class Projectile {
	constructor(pos, speed, damage, sprite) {
		this.pos = pos;
		this.speed = speed;
		this.damage = damage;
		this.sprite = sprite;
	}
}

Projectile.prototype.draw = function () {
	ellipse(this.pos.x, this.pos.y, 10, 10);
}
