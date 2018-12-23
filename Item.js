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

Item.prototype.drop = function () {
	this.owned = false;
};

Item.prototype.isOwned = function () {
	return this.owned;
};

Item.prototype.getSprite = function () {
	return createSprite(this.pos.x, this.pos.y, 10, 10);
}

Item.prototype.constructor = Item;
