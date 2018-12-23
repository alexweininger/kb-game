class ProjectileWeapon extends Item {
	constructor(rof, speed, name, ammo) {
		super(name);
		this.rateOfFire = rof;
		this.speed = speed;
		this.lastUse = -1;
		this.ammo = ammo;
	}
}

ProjectileWeapon.prototype.getAmmo = function() {
	return this.ammo;
}

ProjectileWeapon.prototype.getProjectile = function (pos, speed, type) {
	return new Projectile(pos, speed, type);
};

ProjectileWeapon.prototype.moveOverAction = function (player) {
	player.items.push(this);
};
