$(document).ready(function() {
  socket.on('reading', function(sensorValue) {
      // Append readings to DOM
      var template = "";
      switch (sensorValue.type) {
        case "M":
          humidityGraph.addReading(sensorValue);
          break;
        case "H":
          motionGraph.addReading(sensorValue);
          break;
        case "T":
          temperatureGraph.addReading(sensorValue);
          break;
      }
  });  
})
