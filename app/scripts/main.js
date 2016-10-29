/*globals $:false, d3:false */
'use strict';

(function() {

    var containers = [{
        container: '#svg-container-1',
        bardataInput: '#bar-data-1',
        linedataInput: '#line-data-1',
        bardataEl: 'data/data-small-1.json',
        linedataEl: 'data/data-line-small-1.json',
        button: '#executer-1',
    },{
        container: '#svg-container-2',
        bardataInput: '#bar-data-2',
        linedataInput: '#line-data-2',
        bardataEl: 'data/data-small-2.json',
        linedataEl: 'data/data-line-small-2.json',
        button: '#executer-2',
    },{
        container: '#svg-container-3',
        bardataInput: '#bar-data-3',
        linedataInput: '#line-data-3',
        bardataEl: 'data/data-small-3.json',
        linedataEl: 'data/data-line-small-3.json',
        button: '#executer-3',
    }];

    function draw(obj) {
        d3.json(obj.bardataEl, function(barData) {
            obj.bardata = barData;
            $(obj.bardataInput).text(JSON.stringify(obj.bardata));
            d3.json(obj.linedataEl, function(lineData) {
                obj.linedata = lineData;
                $(obj.linedataInput).text(JSON.stringify(obj.linedata));
                render();
            });
        });
        function render() {
            obj.bardata = JSON.parse($(obj.bardataInput).val());
            obj.linedata = JSON.parse($(obj.linedataInput).val());
            createLineBarGraph(obj.container, obj.bardata, obj.linedata);
        }

        $(obj.button).on('click', render);
    }
    containers.forEach(draw);

}).call(null);

