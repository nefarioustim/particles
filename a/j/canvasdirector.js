var CanvasDirector = function(id, refreshRate) {
		var canvas = document.getElementById(id);
		
		if (canvas && canvas.tagName.toUpperCase() === 'CANVAS') {
			this.id = id;
			this.el = canvas;
			this.context = canvas.getContext('2d');
			this.width = canvas.width;
			this.height = canvas.height;
			this.left = canvas.offsetLeft;
			this.top = canvas.offsetTop;
			this.right = this.left + this.width;
			this.bottom = this.top + this.height;
			this.refreshRate = refreshRate || 10;
			this.fill = NEF.tools.rgbaString(255, 255, 255, 1);
			
			return this;
		} else {
			throw 'ID supplied is not a CANVAS element.';
		}
	};

CanvasDirector.prototype = {
	setFill: function(rgbaString) {
		this.fill = rgbaString;
	},
	
	clear: function() {
		this.context.fillStyle = this.fill;
		this.context.fillRect(0, 0, this.width, this.height);
	},
	
	run: function(frameCallback, initCallback) {
		if (initCallback) {
			initCallback();
		}
		
		return setInterval(function(context, callback){
			context.clear();
			callback();
		}, this.refreshRate, this, frameCallback);
	}
};