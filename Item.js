class Item {
	constructor(name) {
		this.name = name;
		this.owned = true;
		this.sprite = null;
	}
}

Item.prototype.drop = function (pos, facing) {
	this.owned = false;
	this.pos = new Vector(pos.x, pos.y);
	this.direction = facing;
	this.dropTime = new Date();
	this.sprite = this.makeSprite(this.pos.x, this.pos.y, this.direction);
};

Item.prototype.isOwned = function () {
	return this.owned;
};

Item.prototype.makeSprite = function () {
	return createSprite(this.pos.x, this.pos.y, 10, 10);
};

Item.prototype.pickup = function (player) {
	var d = new Date();
	if (this.dropTime - d < -1000) {
		this.owned = true;
		this.sprite.remove();
		player.items.push(this);
		return true;
	}
	return false;
};
