/*globals $:false, d3:false */
'use strict';

(function() {

    d3.json("data/data-small.json", function(barData) {
        d3.json("data/data-line-small.json", function(lineData) {
            createLineBarGraph('.svg-container', barData, lineData);
            createLineBarGraph('.svg-container2', barData, lineData);
            createLineBarGraph('.svg-container3', barData, lineData);
        });
    });

}).call(null);

