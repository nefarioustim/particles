var NEF = window.NEF || {};

NEF.tools = function() {
    return {
        //----------------------------------------
        rgbaString: function(r, g, b, a) {
        //----------------------------------------
            return [
                "rgba(",
                parseInt(r, 10),
                ", ",
                parseInt(g, 10),
                ", ",
                parseInt(b, 10),
                ", ",
                parseFloat(a),
                ")"
            ].join('');
        }
    };
}();