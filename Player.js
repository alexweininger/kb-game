class Player {
	constructor(pos, speed) {
		this.pos = pos;
		this.speed = speed;
		this.items = [];
		this.currentItemIndex = 0;
		this.items.push(new Magnum());
		this.items.push(new Ak47());
		this.facing = 0;
		this.health = 100;
		this.sprite = null;
		this.itemSprite = null;
	}

	static create(pos) {
		return new Player(pos.plus(new Vector(0, -0.5)),
			new Vector(0, 0));
	}
}

Player.prototype.makeSprite = function () {
	this.sprite = createSprite(this.pos.x, this.pos.y, 30, 30);
	if (this.getItemInHand() != null)
		this.itemSprite = this.getItemInHand().makeSprite(this.pos.x, this.pos.y, this.facing);
};

Player.prototype.updateItemSprite = function () {
	this.itemSprite.remove();
	if (this.getItemInHand() != null)
	this.itemSprite = this.getItemInHand().makeSprite(this.pos.x, this.pos.y, this.facing);
}

// updates the item held sprite
Player.prototype.updateItemSpritePosition = function () {
	if (this.facing == 0) {
		this.itemSprite.position.x = this.pos.x;
		this.itemSprite.position.y = this.pos.y - 30;
	}
	if (this.facing == 1) {
		this.itemSprite.position.x = this.pos.x + 30;
		this.itemSprite.position.y = this.pos.y;
	}
	if (this.facing == 2) {
		this.itemSprite.position.x = this.pos.x;
		this.itemSprite.position.y = this.pos.y + 30;
	}
	if (this.facing == 3) {
		this.itemSprite.position.x = this.pos.x - 30;
		this.itemSprite.position.y = this.pos.y;
	}
}

// drop the item in hand
Player.prototype.dropItem = function () {
	this.getItemInHand().drop(this.pos, this.facing);
	this.items = this.items.filter(function (item) {
		return item.owned;
	});
	if (this.items.length == 0) {
		currentItemIndex = -1;
	}
	if (this.currentItemIndex == this.items.length) {
		this.prevItem();
	}
};

// returns the item currently held by the player
Player.prototype.getItemInHand = function () {

	if (this.currentItemIndex == -1) {
		return null;
	}
	return this.items[this.currentItemIndex];
};

// function to change the item in hand to the previous item
Player.prototype.nextItem = function () {
	if (this.currentItemIndex == this.items.length - 1) {
		this.currentItemIndex = 0;
	} else {
		this.currentItemIndex++;
	}
	this.updateItemSprite();

};

// function to change item in hand to the next item
Player.prototype.prevItem = function () {
	if (this.currentItemIndex == 0) {
		this.currentItemIndex = this.items.length - 1;
	} else {
		this.currentItemIndex--;
	}

	this.updateItemSprite();
};

Player.prototype.size = new Vector(0.8, 1.5);
