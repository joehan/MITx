var data = [[1,2],[2,3],[3,4]]

var outer_width= 300;
var outer_height= 300;

var margins = {top:20, right:20, bottom:20,left:20}

var chart_height= outer_height - margin.top - margin.bottom
var chart_width= outer_width = margin.left - margin.right

var chart = d3.select(".chart-container").append("svg")
    .attr("class","chart")
    .attr('height', outer_height)
    .attr('width', outer_width)
    .append('g')
    .attr('transform', 'translate(' +margin.left +','+margin.top+ ')')