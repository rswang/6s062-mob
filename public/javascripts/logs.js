socket.on('message', function(entry) {
    // Append log message to DOM
    var message = $('<li>[' + moment(entry.date).format('MM/DD hh:mm:ss A') + '] ' + entry.data + '</li>');
    $('#entries-container').append(message);
});