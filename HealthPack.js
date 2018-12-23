class HealthPack extends Item {
	constructor(x, y, health) {
		super("Health Pack");
		this.pos = new Vector(x, y);
		this.health = health;
		this.sprite = createSprite(this.pos.x, this.pos.y, 20, 20);
	}
}

HealthPack.prototype.moveOverAction = function (player) {
	player.health += this.health;
};
