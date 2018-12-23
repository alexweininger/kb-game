
class Magnum extends ProjectileWeapon {
	constructor() {
		super(800, 15, "Magnum", 7, function () {
			ellipse(this.pos.x, this.pos.y, 5, 5);
		});
	}
}

Magnum.prototype.getSprite = function(x, y, facing) {
	var s;
	if (facing == 0) {
		s = createSprite(x, y - 20, 10, 10);
	}
	if (facing == 1) {
		s = createSprite(x + 20, y, 10, 10);
	}
	if (facing == 2) {
		s = createSprite(x, y + 20, 10, 10);
	}
	if (facing == 3) {
		s = createSprite(x - 20, y, 10, 10);
	}
	s.shapeColor = 'LightGrey';
	return s;
}
