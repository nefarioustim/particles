var Particle = function(c, x, y, size, weight, col, xVel, yVel) {
    this.c = c;
    this.ctx = this.c.getContext('2d');
    this.x = x;
    this.y = y;
    this.size = size;
	this.weight = (weight < 1) ? weight - NEF.random.getRandomArbitrary(-0.1, 0.1) : 1;
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
		this.ctx.arc(this.x,this.y,this.size,0,Math.PI*2,true);
        this.ctx.closePath();
        this.ctx.fill();
        if (mode && old) {
            this.ctx.globalCompositeOperation = old;
        }
    },
    
    translate: function(xVel, yVel) {
        this.xVel = xVel;
        this.yVel = yVel;

		if (this.weight < 1) {
			var bounceDecay = 1 - this.weight;
			
            if (this.x > this.c.width || this.x < 0) {
                this.xVel *= -bounceDecay;
            }

            if (this.y > this.c.height || this.y < 0) {
                this.yVel *= -bounceDecay;
            }
		}

        this.x += this.xVel;
        this.y += this.yVel;
    }
};

var ParticleCluster = function(canvas, limit, x, y, size, weight, col, xVel, yVel, gravity, drag) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.limit = limit || 500;
    this.originX = x;
    this.originY = y;
	this.weight = weight;
    this.colour = col || NEF.tools.rgbaString(255, 255, 255, 1);
    this.xVel = xVel || [2, -2];
    this.yVel = yVel || [2, -2];
    this.particleSize = size || 1;
    this.gravity = (gravity !== undefined) ? gravity : 0.08;
    this.drag = (drag !== undefined) ? drag : 0.999999;
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
			this.weight,
            this.colour,
            NEF.random.getRandomArbitrary(this.xVel[0], this.xVel[1]),
            NEF.random.getRandomArbitrary(this.yVel[0], this.yVel[1])
        );
        
        for (var i in this.particles) {
            this.particles[i].render(mode);
            
            var yVel = (this.particles[i].yVel + this.gravity) * this.drag,
                xVel = this.particles[i].xVel * this.drag;
            
            this.particles[i].translate(xVel, yVel);
        }
    }
};