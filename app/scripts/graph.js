/*globals d3:false */
'use strict';

function createLineBarGraph(container, barData, lineData) {
    if (!barData) {
        barData = $(container).data('bar');
    }
    if (!lineData) {
        lineData = $(container).data('line');
    }
    $(container).empty();

    function getWidthHeight(element) {
        var node = element.node();
        return {
            width: node.offsetWidth - 2 , // For border with 1 px width
            height: node.offsetHeight - 2 // Fox border with 1 px width
        };
    }

    var margin = {
        top: 5, right: 5, bottom: 5, left: 5
    };
    var whObj = getWidthHeight(d3.select(container));
    var width = whObj.width - margin.left - margin.right,
        height = whObj.height - margin.top - margin.bottom;

    var barX = d3.scale.ordinal()
        .rangeRoundBands([margin.left, width], 0.1);

    var barY = d3.scale.linear()
        .range([height, margin.top]);

    var svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    // ------------
    // Bar Creation
    // ------------

    var barXDomain = barData.map(function(d, i) { return i; });
    //barXDomain.push(barData.length);

    barX.domain(barXDomain);
    //barY.domain(d3.extent(barData, function(d){ return +d ; }));
    barY.domain(d3.extent([1, -1]));

    svg.selectAll('.bar')
        .data(barData)
        .enter().append('rect')
        .attr('class', function(d) { return 'bar bar--' + (d.value < 0 ? 'negative' : 'positive'); })
        .attr('x', function(d, i) { return barX(i); })
        .attr('y', function(d) { return barY(Math.max(0, d.value)); })
        .attr('height', function(d) { return Math.abs(barY(d.value) - barY(0)); })
        .attr('width', function() { return barX.rangeBand(); })
        .style('fill', function(d) {
            return d.color ? d.color : '';
        });

    // ------------
    // Line Creation
    // ------------

    var lineX = d3.scale.ordinal()
        .rangeRoundBands([margin.left, width], 0.1);

    var lineY = d3.scale.linear()
        .range([height-margin.top, margin.top]);

    var line = d3.svg.line()
        .x(function(d, i) { return lineX(i); })
        .y(function(d) { return lineY(d); });

    var values = lineData.data;
    var lineXDomain = values.map(function(d, i) { return i; });
    //lineXDomain.push(values.length);

    lineX.domain(lineXDomain);
    //var max = Math.max(Math.abs(d3.min(values)), Math.abs(d3.max(values)));
    //lineY.domain(d3.extent([-1*max, max]));
    lineY.domain(d3.extent(values));

    var linePath = svg.append('path')
        .datum(values)
        .attr('class', 'line')
        .attr('d', line)
        .attr('transform', 'translate(' + (barX.rangeBand()/2) + ', 0)');
    if (lineData.color) {
        linePath.style('stroke', lineData.color);
    }
    if (lineData.width) {
        linePath.style('stroke-width', lineData.width);
    }
}

