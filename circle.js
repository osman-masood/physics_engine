var Circle = Shape.extend({

	init: function(posX, posY, velX, velY, mass, moves, radius) {
		this._super("Circle", posX, posY, velX, velY, mass, moves, radius); // awaken distance is radius
		this.radius = radius;
	},
	
	isNearShape: function(shape) {
		return this._super(shape);
	},
	
	updatePosition: function() {
		this._super();
	},
	
	draw: function(context) {
		this._super(context);
		
		context.beginPath();
		context.arc(this.posX, this.posY, this.radius, 0, 360, false);
		context.stroke();
		context.closePath();
	},
	
	handleCollision: function(shape) {
		var collision = false;
		if (shape.type === "Circle") {
			// If distance between two circles is less or equal to the sum of their radii, collision happened
			collision = distance(this.posX, this.posY, shape.posX, shape.posY) <= (this.radius + shape.radius);
		}
		if (collision) this._super(shape);
	},
	
});