var Particle3D = function(c, x, y, z, size, col, xVel, yVel, zVel) {
    this.c = c;
    this.ctx = this.c.getContext('2d');
    this.x = x;
    this.y = y;
	this.z = z;
    this.size = size;
    this.col = col || "rgba(255, 255, 255, 1)";
    this.xVel = xVel || 0;
    this.yVel = yVel * -1 || 0;
	this.zVel = zVel || 0;
	this.x2d = 0;
	this.y2d = 0;
    
    return this;
};

Particle3D.prototype = {
    render: function(fov, mode) {
		var fov = (fov !== undefined) ? fov : 350,
			scale = fov/(fov + this.z);
			this.x2d = this.x * scale;
			this.y2d = this.y * scale;
		
		if (scale < 0) return;
			
        if (mode) {
            var old = this.ctx.globalCompositeOperation;
            this.ctx.globalCompositeOperation = mode;
        }

        this.ctx.fillStyle = this.col;
        this.ctx.beginPath();
		this.ctx.arc(this.x2d, this.y2d, this.size, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();

        if (mode && old) {
            this.ctx.globalCompositeOperation = old;
        }
    },

	rotate: function(axis, angle) {
		var toRadians = Math.PI / 180,
			angleR = angle * toRadians,
			cosR = Math.cos(angleR),
			sinR = Math.sin(angleR),
			tempx = this.x,
			tempy = this.y,
			tempz = this.z;
		
		switch(axis) {
			case 'Y':
				this.x = (tempx * cosR) + (tempz * sinR);
				this.z = (tempx * -sinR) + (tempz * cosR);
				break;
			case 'X':
				this.y = (tempy * cosR) + (tempz * sinR);
				this.z = (tempy * -sinR) + (tempz * cosR);
				break;
			case 'Z':
				this.y = (tempy * cosR) + (tempx * sinR);
				this.x = (tempy * -sinR) + (tempx * cosR);
				break;
		}
	},
    
    translate: function(xVel, yVel, zVel) {
        this.xVel = xVel;
        this.yVel = yVel;
		this.zVel = zVel;
        this.x += this.xVel;
        this.y += this.yVel;
		this.z += this.zVel;
    }
};