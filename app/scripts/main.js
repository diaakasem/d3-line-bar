/*globals $:false, d3:false */
'use strict';

(function() {

    var containers = [
        '.svg-container',
        '.svg-container2',
        '.svg-container3'
    ];

    function draw() {
        var barData = JSON.parse($('#bar-data').val());
        var lineData = JSON.parse($('#line-data').val());
        console.log(barData);
        console.log(lineData);
        containers.forEach(function(container) {
            createLineBarGraph(container, barData, lineData);
        });
    }

    d3.json('data/data-small.json', function(barData) {
        $('#bar-data').text(JSON.stringify(barData))
        d3.json('data/data-line-small.json', function(lineData) {
            $('#line-data').text(JSON.stringify(lineData));
            draw();
            $('#executer').on('click', draw);
        });
    });



}).call(null);

