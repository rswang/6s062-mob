$(document).ready(function() { 
  readingsByType = _.groupBy(readings, function(r) {
    return r.type;
  });

  var ReadingGraph = function(selector, dataReadings) {
    var that = Object.create(ReadingGraph.prototype);
    
    var xData = [];
    var yData = [];
    var data = [];
    // example date: 2016-05-08T20:52:01.042Z
    // formatted date: %Y-%m-%dT%H:%M:%S.%LZ
    var formatDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ");
    var n = 0;

    if (dataReadings) {
      n = dataReadings.length;

      xData = dataReadings.map(function(d, index) {
        return d3.time.hour.offset(formatDate.parse(d.date),-4);
      });
      yData = dataReadings.map(function(d, index) {
        return +d.value;
      });
      data = dataReadings.map(function(d, index) {
        return {
          date: xData[index],
          value: yData[index]
        };
      });

      if (n > 100) {
        xData = xData.slice(n-100);
        yData = yData.slice(n-100);
        data = data.slice(n-100);
      }
    }

    var margin = {top: 6, right: 40, bottom: 20, left: 40},
      width = 600 - margin.right,
      height = 270 - margin.top - margin.bottom;

    var x = d3.time.scale()
      .domain([d3.min(xData), d3.max(xData)])
      .range([0, width]);

    var y = d3.scale.linear()
      .domain([0, d3.max(yData)])
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var line = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) {return y(d.value); });

    var graph = d3.select(selector).append("svg:svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("svg:g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var axis = graph.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height) + ")")
      .call(x.axis = d3.svg.axis().scale(x).orient("bottom"));

    graph.append("svg:g")
      .attr("class", "y axis")
      .attr("transform", "translate(0,0)")
      .call(yAxis);

    graph.append("svg:path").attr("d", line(data))
      .attr("class","line");

    that.addReading = function(reading) {
      reading.date = formatDate.parse(reading.date);
      reading.value = +reading.value;
      data.push(reading);
      xData.push(reading.date);
      yData.push(reading.value);

      x.domain([d3.min(xData), d3.max(xData)]);
      y.domain([0, d3.max(yData)]);

      // redraw the line
      graph.select(".line").attr("d", line(data));

      // slide axis and line
      axis.call(x.axis);

      // pop oldest data point
      if (data.length > 100) {
        data.shift();
      }
    }

    return that;
  }

  temperatureGraph = ReadingGraph("#temperature-graph", readingsByType["T"]);
  humidityGraph = ReadingGraph("#humidity-graph", readingsByType["H"]);
  motionGraph = ReadingGraph("#motion-graph", readingsByType["M"]);

//   socket.on('reading', function(sensorValue) {
//       // Append readings to DOM
//       var template = "";
//       switch (sensorValue.type) {
//         case "M":
//           motionGraph.addReading(sensorValue);
//           break;
//         case "H":
//           humidityGraph.addReading(sensorValue);
//           break;
//         case "T":
//           temperatureGraph.addReading(sensorValue);
//           break;
//       }
//   });

});
