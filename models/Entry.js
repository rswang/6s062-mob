var mongoose = require('mongoose');

var entrySchema = mongoose.Schema({
    data: {type: String},
    date: {type: Date, default: new Date()}
});

var Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;