var Particle = function(c, x, y, xVel, yVel, col) {
    this.c = c;
    this.ctx = this.c.getContext('2d');
    this.x = x;
    this.y = y;
    this.xVel = xVel || 0;
    this.yVel = yVel * -1 || 0;
    this.col = col || "rgba(255, 255, 255, 0.5)";
    
    return this;
};

Particle.prototype = {
    render: function() {
        var c = this.c,
            ctx = this.ctx,
            drag = 0.999999,
            gravity = 0.08,
            bounceFriction = 0.6,
            size = 3;
        
        ctx.fillStyle = this.col;
        ctx.beginPath();
        ctx.rect(this.x, this.y, size, size);
        ctx.closePath();
        ctx.fill();
        
        this.x += this.xVel;
        this.y += this.yVel;
        this.yVel += gravity;
        this.xVel *= drag;
        this.yVel *= drag;
		
        if (this.x > c.width || this.x < 0) {
            this.xVel *= -bounceFriction;
        }
        
        if (this.y > c.height || this.y < 0) {
            this.yVel *= -bounceFriction;
        }
    }
};

var ParticleCluster = function(canvas, x, y) {
	this.canvas = canvas;
	this.context = canvas.getContext('2d');
	this.originX = x;
	this.originY = y;
	this.size = 3;
	this.gravity = 0.08;
	this.drag = 0.999999;
	this.bounceDecay = 0.6;
	this.limit = 300;
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
            NEF.random.getRandomArbitrary(3, -3),
            NEF.random.getRandomArbitrary(4, 2),
            NEF.tools.rgbaString(
                NEF.random.getRandomInt(255, 125),
                NEF.random.getRandomInt(255, 125),
                NEF.random.getRandomInt(255, 125),
                0.75
            )
        );
        
        for (var i in this.particles) {
            this.particles[i].render();
        }
	}
};