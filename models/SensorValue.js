var mongoose = require('mongoose');

var SensorValueSchema = mongoose.Schema({
  sensorID: {type: String},
  type: {type: String, enum: ['M', 'H', 'T']}, // M, H, T
  value: {type: String},
  date: {type: Date, default: new Date()}
});

var SensorValue = mongoose.model('SensorValue', SensorValueSchema);

module.exports = SensorValue;
