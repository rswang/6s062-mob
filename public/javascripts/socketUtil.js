// Socket code for logging page.
var socket = io.connect('http://54.165.195.244:3000');
socket.on('connection', function (data) {
	console.log("Socket connected.");
	socket.emit('ack', { status: 'Success!' });
});

socket.on('message', function(entry) {
	// Append log message to DOM
	var message = $('<li>[' + moment(entry.date).format('MM/DD hh:mm:ss A') + '] ' + entry.data + '</li>');
	$('#entries-container').append(message);
});

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
        template = "log-temperature";
        break;
    }
    prependToElement("#readings-container", template, sensorValue);
});
socket.on('roomsensorupdate', function(sensor) {
  console.log(sensor);
});
