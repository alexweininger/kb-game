class Ak47 extends ProjectileWeapon {
	constructor() {
		super(180, 16, "Ak-47", 30);
		this.damage = 10;
		this.ammo = 30;
	}
}

Ak47.prototype.getProjectile = function (pos, speed, damage) {
	return new Projectile(pos, speed, this.damage);
}

Ak47.prototype.getSprite = function (x, y, facing) {
	var s;
	if (facing == 0) {
		s = createSprite(x, y - 30, 10, 20);
	}
	if (facing == 1) {
		s = createSprite(x + 30, y, 20, 10);
	}
	if (facing == 2) {
		s = createSprite(x, y + 30, 10, 20);
	}
	if (facing == 3) {
		s = createSprite(x - 30, y, 20, 10);
	}
	s.shapeColor = 'Black';
	return s;
}
