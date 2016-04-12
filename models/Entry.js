var mongoose = require('mongoose');

var EntrySchema = mongoose.Schema({
    data: {type: String},
    date: {type: Date, default: new Date()}
});

var Entry = mongoose.model('Entry', EntrySchema);

module.exports = Entry;
