var data = [{"date":"2012-03-20","total":3},{"date":"2012-03-21","total":8},{"date":"2012-03-22","total":2},{"date":"2012-03-23","total":10},{"date":"2012-03-24","total":3},{"date":"2012-03-25","total":20},{"date":"2012-03-26","total":12}];

var margin = {top: 40, right: 40, bottom: 40, left:40},
    width = 600,
    height = 500;

var x = d3.time.scale()
    .domain([new Date(data[0].date), d3.time.day.offset(new Date(data[data.length - 1].date), 1)])
    .rangeRound([0, width - margin.left - margin.right]);

var y = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.total; })])
    .range([height - margin.top - margin.bottom, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .ticks(d3.time.days, 1)
    .tickFormat(d3.time.format('%a %d'))
    .tickSize(0)
    .tickPadding(8);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .tickPadding(8);

var svg = d3.select('body').append('svg')
    .attr('class', 'chart')
    .attr('width', width)
    .attr('height', height)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

svg.selectAll('.chart')
    .data(data)
  .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', function(d) { return x(new Date(d.date)); })
    .attr('y', function(d) { return height - margin.top - margin.bottom - (height - margin.top - margin.bottom - y(d.total)) })
    .attr('width', 10)
    .attr('height', function(d) { return height - margin.top - margin.bottom - y(d.total) });

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')')
    .call(xAxis);

svg.append('g')
  .attr('class', 'y axis')
  .call(yAxis);