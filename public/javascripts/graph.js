$(document).ready(function() {
  readingsByType = _.groupBy(readings, function(r) {
    return r.type;
  });

  var ReadingGraph = function(selector, dataReadings) {
    var that = Object.create(ReadingGraph.prototype);

    var n = dataReadings.length,
        data = dataReadings.map(function(d, index) {
          return {
            date: new Date(d.date),
            value: d.value,
          }
        });

    var margin = {top: 6, right: 0, bottom: 20, left: 40},
        width = 800 - margin.right,
        height = 320 - margin.top - margin.bottom;

    var x = d3.time.scale()
        .domain([d3.min(data, function(d) {return d.date}), d3.max(data, function(d) {return d.date})])
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([0, d3.max(data, function(d) {return d.value})])
        .range([height, 0]);

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d, i) { return x(d.date); })
        .y(function(d, i) { return y(d.value); });

    var svg = d3.select(selector).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("margin-left", -margin.left + "px")
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("defs").append("clipPath")
        .attr("id", "clip")
      .append("rect")
        .attr("width", width)
        .attr("height", height);

    var axis = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(x.axis = d3.svg.axis().scale(x).orient("bottom"));

    var yaxis = svg.append("g")
        .attr("class", "y axis")
      .attr("transform", "translate(0,0)")
      .call(d3.svg.axis()
        .orient("left")
        .scale(y));

    var path = svg.append("g")
        .attr("clip-path", "url(#clip)")
      .append("path")
        .datum(data, function(d) { return d.value;})
        .attr("class", "line");

    that.addReading = function(reading) {
      reading.date = new Date(reading.date);
      data.push(reading);

      x.domain([d3.min(data, function(d) {return d.date}), d3.max(data, function(d) {return d.date})]);
      y.domain([0, d3.max(data, function(d) {return d.value})]);

      // redraw the line
      svg.select(".line")
          .attr("d", line)
          .attr("transform", null);

      // slide axis and line
      axis.call(x.axis);
      path.transition()
          .attr("transform", "translate(" + x(data[1].date) + ")");

      // pop oldest data point
      data.shift();
    }

    // initialize graph
    var i = 0;
    for (var i = 0; i < dataReadings.length; i++) {
        that.addReading(dataReadings[i]);
    }

    return that;
  }

  temperatureGraph = ReadingGraph("#temperature-graph", readingsByType["T"]);
  humidityGraph = ReadingGraph("#humidity-graph", readingsByType["H"]);
  motionGraph = ReadingGraph("#motion-graph", readingsByType["M"]);
});