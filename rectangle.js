var Rectangle = Shape.extend({

	// unique params: width, height
	init: function(params) {
		params.type = "Rectangle";
		params.awakeDistance = distance(0, 0, params.width / 2, params.height / 2);
		this._super(params);
		this.width = params.width;
		this.height = params.height;
	},
	
	updatePosition: function() {
		this._super();
	},
	
	isNearShape: function(shape) {
		return this._super(shape);
	},
	
	draw: function(context) {
		var rightX, bottomY, leftX, topY;

		this._super(context);
		
		rightX = this.posX + this.width / 2;
		bottomY = this.posY + this.height / 2;
		leftX = this.posX - this.width / 2;
		topY = this.posY - this.height / 2;

		context.beginPath();
		context.moveTo(leftX, topY);
		context.lineTo(rightX, topY);
		context.lineTo(rightX, bottomY);
		context.lineTo(leftX, bottomY);
		context.lineTo(leftX, topY);
		context.stroke();
		context.closePath();
	},
	
	isCollision: function(shape) {
		var collision = false;
		if (shape.type === "Rectangle") {
			collision = this.isRectangleCollision(shape);
		}
		return collision;
	},
	
	doCollision: function(shape) {
		this._super(shape);
	},
	
  // If collision, return collision details
  isRectangleCollision: function(rectangle) {
    var r1_leftX = this.posX - this.width / 2;
    var r1_topY = this.posY - this.height / 2;
    var r1_rightX = this.posX + this.width / 2;
    var r1_bottomY = this.posY + this.height / 2;
    var r2_leftX = rectangle.posX - rectangle.width / 2;
    var r2_topY = rectangle.posY - rectangle.height / 2;
    var r2_rightX = rectangle.posX + rectangle.width / 2;
    var r2_bottomY = rectangle.posY + rectangle.height / 2;
    var not_colliding = true;
    // If both at same angle
    if (this.angle === 0.0 && rectangle.angle === 0.0) {
      not_colliding = r1_leftX > r2_rightX ||
                      r1_topY > r2_bottomY ||
                      r1_rightX < r2_leftX ||
                      r1_bottomY < r2_topY;
      
      return !not_colliding;
    }
    // If at different angles
    else {
      /* TODO: do this */
    }
  }

	// Uses current angle to get coordinates of the 4 edges
	getEdgeCoordinates: function() {
		
	}
	
});