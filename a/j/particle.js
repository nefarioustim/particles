var Particle = function(c, x, y, xVel, yVel, col) {
    this.c = canvas;
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
            size = 2;
        
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