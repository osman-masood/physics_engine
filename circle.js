var Circle = Shape.extend({

	// Unique params: radius
	init: function(params) {
		params.type = "Circle";
		params.awakeDistance = params.radius;
		this._super(params);
		this.radius = params.radius;
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
	
	isCollision: function(shape) {
		var collision = false;
		if (shape.type === "Circle") {
			// If distance between two circles is less or equal to the sum of their radii, collision happened
			collision = distance(this.posX, this.posY, shape.posX, shape.posY) <= (this.radius + shape.radius);
		}
		return collision;
	},
	
	doCollision: function(shape) {
		this._super(shape);
	}
	
});