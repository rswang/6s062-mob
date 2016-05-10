var mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
    sensor: {type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    type: {type: String},
});

var Event = mongoose.model('Event', EventSchema);

module.exports = Event;
