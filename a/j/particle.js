var Particle = function(c, x, y, size, col, xVel, yVel) {
    this.c = c;
    this.ctx = this.c.getContext('2d');
    this.x = x;
    this.y = y;
	this.size = size;
    this.col = col || "rgba(255, 255, 255, 0.5)";
	this.xVel = xVel;
	this.yVel = yVel * -1;
    
    return this;
};

Particle.prototype = {
    render: function() {
        this.ctx.fillStyle = this.col;
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.size, this.size);
        this.ctx.closePath();
        this.ctx.fill();
    },
	
	translate: function(xVel, yVel) {
		this.xVel = xVel;
		this.yVel = yVel;
		this.x += this.xVel;
        this.y += this.yVel;
	}
};

var ParticleCluster = function(canvas, x, y, size, col) {
	this.canvas = canvas;
	this.context = canvas.getContext('2d');
	this.originX = x;
	this.originY = y;
	this.colour = col || NEF.tools.rgbaString(255, 255, 255, 1);
	this.particleSize = size || 1;
	this.gravity = 0.08;
	this.drag = 0.999999;
	this.bounceDecay = 0.6;
	this.limit = 400;
	this.count = 0;
	this.particles = new Array(this.limit);
	
	return this;
};

ParticleCluster.prototype = {
	render: function() {
		this.count = this.count > this.limit ? 0 : this.count;
		
		this.particles[this.count++] = new Particle(
            this.canvas,
            this.originX,
            this.originY,
            this.particleSize,
            this.colour,
			NEF.random.getRandomArbitrary(-3, 3),
			NEF.random.getRandomArbitrary(4, 0)
        );
        
        for (var i in this.particles) {
            this.particles[i].render();
			
			var yVel = (this.particles[i].yVel + this.gravity) * this.drag,
				xVel = this.particles[i].xVel * this.drag,
				x = this.particles[i].x,
				y = this.particles[i].y;

	        if (x > this.canvas.width || x < 0) {
	            xVel *= -this.bounceDecay;
	        }

	        if (y > this.canvas.height || y < 0) {
	            yVel *= -this.bounceDecay;
	        }
			
			this.particles[i].translate(xVel, yVel);
        }
	}
};