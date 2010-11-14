var NEF = window.NEF || {};

NEF.random = function() {
	return {
		//----------------------------------------
		getRandom: function() {
		//----------------------------------------	
			return Math.random();
		},
	
		//----------------------------------------
		getRandomArbitrary: function(min, max) {
		//----------------------------------------
			return Math.random() * (max - min) + min;
		},
		
		//----------------------------------------
		getRandomInt: function(min, max) {
		//----------------------------------------
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	};
}();