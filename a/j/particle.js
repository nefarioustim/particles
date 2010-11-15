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
    render: function(mode) {
		if (mode) {
			var old = this.ctx.globalCompositeOperation;
			this.ctx.globalCompositeOperation = mode;
		}
        this.ctx.fillStyle = this.col;
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.size, this.size);
        this.ctx.closePath();
        this.ctx.fill();
		if (mode && old) {
			this.ctx.globalCompositeOperation = old;
		}
    },
	
	translate: function(xVel, yVel) {
		this.xVel = xVel;
		this.yVel = yVel;
		this.x += this.xVel;
        this.y += this.yVel;
	}
};

var ParticleCluster = function(canvas, limit, x, y, size, col, xVel, yVel, gravity, bounce, drag) {
	this.canvas = canvas;
	this.context = canvas.getContext('2d');
	this.limit = limit || 500;
	this.originX = x;
	this.originY = y;
	this.colour = col || NEF.tools.rgbaString(255, 255, 255, 1);
	this.xVel = xVel || [2, -2];
	this.yVel = yVel || [2, -2];
	this.particleSize = size || 1;
	this.gravity = gravity || 0.08;
	this.drag = drag || 0.999999;
	this.bounceDecay = bounce || 0.6;
	this.count = 0;
	this.particles = new Array(this.limit);
	
	return this;
};

ParticleCluster.prototype = {
	render: function(mode) {
		this.count = this.count > this.limit ? 0 : this.count;
		
		this.particles[this.count++] = new Particle(
            this.canvas,
            this.originX,
            this.originY,
            this.particleSize,
            this.colour,
			NEF.random.getRandomArbitrary(this.xVel[0], this.xVel[1]),
			NEF.random.getRandomArbitrary(this.yVel[0], this.yVel[1])
        );
        
        for (var i in this.particles) {
            this.particles[i].render(mode);
			
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