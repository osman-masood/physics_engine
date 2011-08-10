/* Shape class. Meant to be an abstract class */
var Shape = Class.extend({

	init: function(type, posX, posY, velX, velY, mass, moves, awakeDistance) {
		this.type = type;
		this.posX = posX;
		this.posY = posY;
		this.velX = velX;
		this.velY = velY;
		this.mass = mass;
		this.moves = moves;
		this.awakeDistance = awakeDistance; // An invisible square of side length awakeDistance * 2 is around each Shape. This is to awaken the Shape.
		this.angle = 0.0; // means pointing towards right side. goes clockwise as angle increases since +y points downwards 
	},

	isNearShape: function(shape) {
    var r1_leftX = this.posX - this.awakeDistance;
    var r1_topY = this.posY - this.awakeDistance;
    var r1_rightX = this.posX + this.awakeDistance;
    var r1_bottomY = this.posY + this.awakeDistance;
    var r2_leftX = shape.posX - shape.awakeDistance;
    var r2_topY = shape.posY - shape.awakeDistance;
    var r2_rightX = shape.posX + shape.awakeDistance;
    var r2_bottomY = shape.posY + shape.awakeDistance;
    var not_colliding = true;
    not_colliding = r1_leftX > r2_rightX ||
                    r1_topY > r2_bottomY ||
                    r1_rightX < r2_leftX ||
                    r1_bottomY < r2_topY;
		return ! not_colliding;
	},

	// Updates X/Y positions according to velocity, and updates velocity according to gravity
	updatePosition: function() {
		var boosterForceX = 0, boosterForceY = 0;
		// Return if doesn't move
		if (! this.moves) return;
		
		if (isKeyPressed('left')) {
			boosterForceX = -2;
		}
		if (isKeyPressed('right')) {
			boosterForceX = 2;
		}
		if (isKeyPressed('up')) {
			boosterForceY = -2;
		}
		if (isKeyPressed('down')) {
			boosterForceY = 2;
		}
		// Velocity
		this.velX += (boosterForceX / this.mass);
		this.velY += (boosterForceY / this.mass) + GRAVITY;

		// Position
		this.posX += this.velX;
		this.posY += this.velY;
	},

	// Just draws a small dot at (x, y)
	draw: function(context) {
		var posX = this.posX, posY = this.posY;
		context.beginPath();
		context.moveTo(posX, posY);
		context.lineTo(posX + 1, posY);
		context.lineTo(posX + 1, posY + 1);
		context.lineTo(posX, posY + 1);
		context.lineTo(posX, posY);
		context.stroke();
		context.closePath();
	},

	// Updates x/y velocities of both objects. Only call this when a collision happens.
	handleCollision: function(shape) {
		// Both objects move: Set final linear velocities and positions
		if (this.moves && shape.moves) {
			final_velocities_x = this.finalVelocitiesMovable(this.velX, this.mass, shape.velX, shape.mass, 1.0);
			final_velocities_y = this.finalVelocitiesMovable(this.velY, this.mass, shape.velY, shape.mass, 1.0);
			this.velX = final_velocities_x.v1;
			this.velY = final_velocities_y.v1;
			shape.velX = final_velocities_x.v2;
			shape.velY = final_velocities_y.v2;
		}
		// One object doesn't move
		else if (this.moves && ! shape.moves || shape.moves && ! this.moves) {
			this.velX = this.velX;
			this.velY = (-1) * this.velY;
			shape.velX = 0;
			shape.velY = 0;
		}
	},
	
	// Calculates final velocities of 2 movable objects in 1 direction
  finalVelocitiesMovable: function(v1, m1, v2, m2, restitution_coefficient) {
    var v1_final, v2_final, v2_minus_v1, inv_sum_m1_m2, total_initial_momentum;
    inv_sum_m1_m2 = 1.0 / (m1 + m2);
    total_initial_momentum = v1 * m1 + v2 * m2;
    // Optimization if restitution_coefficient is 0.0 i.e. completely inelastic collision
    if (restitution_coefficient === 0.0) {
      v1_final = total_initial_momentum * inv_sum_m1_m2;
      return { v1 : v1_final, v2 : v1_final };
    }
    // normal calculation
    v2_minus_v1 = v2 - v1;
    v1_final = (restitution_coefficient * m2 * v2_minus_v1 + total_initial_momentum) * inv_sum_m1_m2;
    v2_final = (total_initial_momentum - restitution_coefficient * m1 * v2_minus_v1) * inv_sum_m1_m2;
    return { v1 : v1_final, v2 : v2_final };
  }
  
});