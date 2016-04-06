// Socket code for logging page.
var socket = io.connect('http://54.165.195.244:3000');
socket.on('connection', function (data) {
	console.log("Socket connected.");
	socket.emit('ack', { status: 'Success!' });
});
socket.on('message', function(data) {
	// Append log message to DOM
	var message = $('<li>' + data + '</li>');
	$('#entries-container').append(message);
});
