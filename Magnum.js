class Magnum extends ProjectileWeapon {
	constructor() {
		super(800, 15, "Magnum", 7);
		this.damage = 20;
		this.ammo = 7;
	}
}

Magnum.prototype.getProjectile = function (pos, speed, damage) {
	return new Projectile(pos, speed, this.damage);
}

Magnum.prototype.makeSprite = function(x, y, facing) {
	var s;
	if (facing == 0) {
		s = createSprite(x, y - 30, 10, 10);
	}
	if (facing == 1) {
		s = createSprite(x + 30, y, 10, 10);
	}
	if (facing == 2) {
		s = createSprite(x, y + 30, 10, 10);
	}
	if (facing == 3) {
		s = createSprite(x - 30, y, 10, 10);
	}
	s.shapeColor = 'LightGrey';
	return s;
}
