var canvasController = function(){
    var id = 'canvas',
        c = document.getElementById(id),
        ctx = c.getContext('2d'),
        cw = c.width,
        cminw = c.offsetLeft,
        cmaxw = cminw + cw,
        ch = c.height,
        cminh = c.offsetTop,
        cmaxh = cminh + ch,
        mousex,
        mousey,
        refreshRate = 10,
        limit = 500,
        count = 0,
        particles = new Array(limit);
        
    return o = {
        init: function() {
            $(document).mousemove(o.updateMouseCoords);
            return setInterval(o.refresh, refreshRate);
        },
        
        updateMouseCoords: function(e) {
            if (e.pageX > cminw && e.pageX < cmaxw) {
                mousex = e.pageX - cminw;
            }
            
            if (e.pageY > cminh && e.pageY < cmaxh) {
                mousey = e.pageY - cminh;
            }
        },
        
        refresh: function() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
            ctx.fillRect(0, 0, cw, ch);
            // ctx.clearRect(0, 0, cw, ch);
            
            if (count > limit) {
                count = 0;
            }
            
            particles[count++] = new Particle(
                c,
                // cw/2,
                // ch/2,
                mousex,
                mousey,
                NEF.random.getRandomArbitrary(3, -3),
                NEF.random.getRandomArbitrary(3, 2),
                [
                    "rgba(",
                    NEF.random.getRandomInt(255, 125),
                    ", ",
                    NEF.random.getRandomInt(255, 125),
                    ", ",
                    NEF.random.getRandomInt(255, 125),
                    ", 0.75)"
                ].join('')
            );
            
            for (var i in particles) {
                var p = particles[i];
                
                p.render();
                
                if (p.y > c.ch) {
                    delete particles[i];
                }
            }
        }
    };
}();

var inter = canvasController.init();