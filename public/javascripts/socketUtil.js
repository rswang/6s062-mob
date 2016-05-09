// Socket code for logging page.
var socket = io.connect('http://54.152.120.248:3000');
socket.on('connection', function (data) {
	console.log("Socket connected.");
	socket.emit('ack', { status: 'Success!' });
});
