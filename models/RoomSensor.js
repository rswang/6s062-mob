var mongoose = require('mongoose');
var SensorValue = require('./SensorValue');
var Entry = require('./Entry');
var async = require('async');

var RoomSensorSchema = mongoose.Schema({
  sensorID: {type: String},
  temperature: {type: Number},
  humidity: {type: Number},
  lastMotionTime: {type: Date, default: new Date()}
});

var validTypes = ['M', 'H', 'T'];
var gatewayName = "GATEWAY1";

RoomSensorSchema.statics.registerValue = function(data, callback) {
  var that = this;
  Entry.create({
    data: data,
  }, function(err, entry) {
    if (err) {
      callback(err);
      return;
    }
    if (entry.length < 32) {
      callback({
        message: "Entry is not formatted correctly: expected 32-byte data"
      });
      return;
    }
    var gatewayId = data.substring(0, 8);
    console.log(gatewayId)
    console.log(gatewayName)
    if (gatewayId != gatewayName) {
      callback({
        message: "Error: this gateway is not registered on the site"
      });
      return;
    }
    var sensorID = data.substring(8, 16);
    that.find({sensorID: sensorID}, function(err, roomSensors) {
      if (err) {
        callback({
          message: "Error occurred during sensor lookup."
        });
        return;
      }
      if (roomSensors.length == 0) {
        RoomSensor.create({sensorID: sensorID}, function(err, doc) {
          if (err) {
            callback(err);
            return;
          }
          RoomSensor.updateStatus(doc, data.substring(16), entry, callback);
		});
      } else {
        RoomSensor.updateStatus(roomSensors[0], data.substring(16), entry, callback);
      }
    });
  });
}

RoomSensorSchema.statics.updateStatus = function(sensor, data, entry, callback) {
  var value1 = data.substring(0,8);
  var value2 = data.substring(8,16);
  async.map([value1, value2], function(value, done) {
    var type = value.substring(0, 1);
    if (validTypes.indexOf(type) == -1) {
      done(null);
      return;
    }
    var reading = value.substring(1, 8);

    SensorValue.create({
      sensorID: sensor.sensorID,
      type: type,
      value: parseFloat(reading),
      date: entry.date,
    }, done);
  }, function(err, sensorValues) {
    if (err) {
      callback(err);
      return;
    }
    sensorValues.forEach(function(sensorValue) {
      if (sensorValue != null) {
        if (sensorValue.type == "M") {
          sensor.lastMotionTime = sensorValue.date;
        } else if (sensorValue.type == "T") {
          sensor.temperature = sensorValue.value;
        } else if (sensorValue.type == "H") {
          sensor.humidity = sensorValue.value;
        } else {
            callback({
                message: "Invalid sensor type",
            });
        }
      }
    });
    sensor.save();
    callback(null, {
        sensor: sensor,
        sensorValues: sensorValues,
        entry: entry,
    });
  });
};

var RoomSensor = mongoose.model('RoomSensor', RoomSensorSchema);

module.exports = RoomSensor;
