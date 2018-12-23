class Player {
	constructor(pos, speed) {
		this.pos = pos;
		this.speed = speed;
		this.items = [];
		this.currentItemIndex = 0;
		this.items.push(new Magnum());
		this.items.push(new Ak47());
		this.facing = 0;
	}

	static create(pos) {
		return new Player(pos.plus(new Vector(0, -0.5)),
			new Vector(0, 0));
	}
}

Player.prototype.size = new Vector(0.8, 1.5);
Player.prototype.dropItem = function() {
	this.getItemInHand().drop(this.pos, this.facing);
	this.items = this.items.filter(function(item) {
		return item.owned;
	});
	if (this.items.length == 0) {
		currentItemIndex = -1;
	}
	if (this.currentItemIndex == this.items.length) {
		this.prevItem();
	}
}
Player.prototype.addItem = function (item) {
	if (item instanceof Item) {
		this.items.push(item);
		if (this.items.length = 1) {
			this.currentItemIndex = 0;
		}
	}
};

Player.prototype.getItemInHand = function () {
	if (this.currentItemIndex == -1) {
		return null;
	}
	return this.items[this.currentItemIndex];
};

Player.prototype.nextItem = function () {
	if (this.currentItemIndex == this.items.length - 1) {
		this.currentItemIndex = 0;
	} else {
		this.currentItemIndex++;
	}
};

Player.prototype.prevItem = function () {
	if (this.currentItemIndex == 0) {
		this.currentItemIndex = this.items.length - 1;
	} else {
		this.currentItemIndex--;
	}
};
