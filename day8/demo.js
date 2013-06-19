var data = [{date:20111001}, {date:20111002}, {date:20111003}, {date:20111004}]
//
//var outer_width= 400;
//var outer_height= 400;
//
//var margin = {top:20, right:20, bottom:20,left:20}
//
//var chart_height= outer_height - margin.top - margin.bottom
//var chart_width= outer_width - margin.left - margin.right
//
//var y_scale= d3.time.scale()
//                .domain(data).range([chart_height,0]);
//
//var chart = d3.select(".chart-container").append("svg")
//    .attr("class","chart")
//    .attr('height', outer_height)
//    .attr('width', outer_width)
//    .append('g')
//    .attr('transform', 'translate(' +margin.left +','+margin.top+ ')')
//
//chart.selectAll('dateline').data(y_scale.ticks(4))
//    .enter().append('line')
//    .attr('class','dateline')
//    .attr('x1', 0)
//    .attr('x2', chart_width)
//    .attr('y1', function(d){return y_scale(d)})
//    .attr('y2', function(d){return y_scale(d)})
//
//chart.selectAll('.y-scale-label').data(y_scale.ticks(4))
//    .enter().append('text')
//    .attr('class', 'y-scale-label')
//    .attr('x',0)
//    .attr('y', y_scale)
//    .attr('dx',-margin.left)
//    .attr('dy',0)
//    .text(String)

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale()
    .range([0, width]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date)
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);



