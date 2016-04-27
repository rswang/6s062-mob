var mongoose = require('mongoose');
var SensorValue = require('./SensorValue');
var Entry = require('./Entry');
var async = require('async');
var _ = require('lodash');
var moment = require('moment');

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
  var parseValueData = function(data) {
    data = data.trim();
    var newSensorValues = [];
    var type = data.substring(0,1);
    var sensorConfigurations = {
      "H": {
        valueSize: 5,
        sendInterval: 3*60*1000,
      },
      "T": {
        valueSize: 5,
        sendInterval: 3*60*1000,
      },
      "M": {
        valueSize: 1,
        sendInterval: 45*1000,
      },
    }
    var config = sensorConfigurations[type];
    var startIndex = 1;
    var endIndex = startIndex + config.valueSize;
    var numValues = (data.length - 1) / config.valueSize; 
    for (var i = 0; i < numValues; i++) {
      var time = moment(entry.date).subtract((numValues - i - 1) * config.sendInterval, 'milliseconds');
      newSensorValues.push({
        sensorID: sensor.sensorID,
        type: type,
        value: parseFloat(data.substring(startIndex + i * config.valueSize, startIndex + (i+1) * config.valueSize)),
        date: moment(entry.date).subtract((numValues - i - 1) * config.sendInterval, 'milliseconds'),
      })
    }
    return newSensorValues;
  }

  SensorValue.create(parseValueData(data), function(err, sensorValues) {
    if (err) {
      callback(err);
      return;
    }
    sensorValues = _.compact(sensorValues);
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
