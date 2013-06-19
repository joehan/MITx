var data = [[1,2],[2,3],[3,4]]

var outer_width= 400;
var outer_height= 400;

var margin = {top:20, right:20, bottom:20,left:20}

var chart_height= outer_height - margin.top - margin.bottom
var chart_width= outer_width - margin.left - margin.right

var y_scale= d3.scale.linear()
                .domain([0,14]).range([chart_height,0]);

var chart = d3.select(".chart-container").append("svg")
    .attr("class","chart")
    .attr('height', outer_height)
    .attr('width', outer_width)
    .append('g')
    .attr('transform', 'translate(' +margin.left +','+margin.top+ ')')

chart.selectAll('pHline').data(y_scale.ticks(14))
    .enter().append('line')
    .attr('class','pHline')
    .attr('x1', 0)
    .attr('x2', chart_width)
    .attr('y1', function(d){return chart_height- y_scale(d)})
    .attr('y2', function(d){return chart_height- y_scale(d)})

chart.selectAll('.y-scale-label').data(y_scale.ticks(7))
    .enter().append('text')
    .attr('class', 'y-scale-label')
    .attr('x',0)
    .attr('y', y_scale)
    .attr('dx',-margin.left)
    .attr('dy',0)
    .text(String)


