class Item {
	constructor(name) {
		this.name = name;
		this.owned = true;
	}
}

Object.defineProperty(Item.prototype, 'constructor', {
	value: Item,
	enumerable: false, // so that it does not appear in 'for in' loop
	writable: true
});

Item.prototype.drop = function (pos, facing) {
	this.owned = false;
	this.pos = new Vector(pos.x, pos.y);
	this.direction = facing;
	this.dropTime = new Date();
};

Item.prototype.isOwned = function () {
	return this.owned;
};

Item.prototype.getSprite = function () {
	return createSprite(this.pos.x, this.pos.y, 10, 10);
}

Item.prototype.pickup = function () {
	var d = new Date();
	if (this.dropTime - d < -1000) {
		this.owned = true;
		return true;
	}
	return false;
}

Item.prototype.constructor = Item;
