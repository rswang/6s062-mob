$(document).ready(function() {
  socket.on('reading', function(sensorValue) {
      // Append readings to DOM
      var template = "";
      switch (sensorValue.type) {
        case "M":
          template = "log-motion";
          break;
        case "H":
          template = "log-humidity";
          break;
        case "T":
          template = "log-motion";
          break;
      }
      prependToElement("#readings-container", template, sensorValue)
  });  
})
