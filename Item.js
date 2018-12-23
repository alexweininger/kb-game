class Item {
	constructor(name) {
		this.name = name;
	}
}

Object.defineProperty(Item.prototype, 'constructor', {
	value: Item,
	enumerable: false, // so that it does not appear in 'for in' loop
	writable: true
});

Item.prototype.getSprite = function() {
	return createSprite(this.pos.x, this.pos.y, 10, 10);
}

Item.prototype.constructor = Item;
