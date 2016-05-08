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
  lastMotionTime: {type: Date},
  lastSeen: {type: Date},
  notes: {type: String, default: 'N/A'},
});

var validTypes = ['M', 'H', 'T'];
var gatewayName = "GATEWAY1";

/**
 * Method called when the server receives a new reading from the gateway.
 * The data is the message from the gateway. It should be in the format:
 * GATEWAY1SENSOR_X<Data>
 * Data can be motion data or DHT data.
 **/
RoomSensorSchema.statics.registerReading = function(data, callback) {
  var that = this;
  // Create log entry
  Entry.create({
    data: data,
    date: new Date()
  }, function(err, entry) {
    if (err) {
      callback(err);
      return;
    }
    if (entry.length < 32) {
      callback({
        message: "Entry is not formatted correctly: expected 32-byte data payload"
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
        // Create new sensor if this sensor does not exist.
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

/**
 * Updates the status of a sensor in the database.
 * This method handles motion data and DHT data.
 * @param sensor - the sensor that should be updated.
 * @param data - the data payload from the gateway message. This data payload
 *                does NOT include the gateway ID and sensor ID.
 * @param entry - the log entry that was created when the data was received.
 *                we use this entry as a date reference to enforce time consistency
 *                within our records.
 * DATA FORMATS:
 * Motion data: 'M1' -> indicates motion
 * DHT data: 'T70.00H60.00' -> indicates temp of 70.00 and humidity of 60.00
 **/
RoomSensorSchema.statics.updateStatus = function(sensor, data, entry, callback) {
  var parseValueData = function(data) {
    // Remove whitespace at the end of the data payload
    data = data.trim();

    // This type is either 'M' or 'T'.
    // 'M' indicates motion data.
    // 'T' indicates DHT data.
    var type = data.substring(0,1);
    var values = [];

    if (type == 'M' && data.length > 1) {
      motionReading = data.substring(1,2);
      // Sensed motion
      values.push({
        sensorID: sensor.sensorID,
        type: type,
        value: motionReading,
        date: entry.date
      });
    } else if (type == 'T') {
      // First parse into temp and humidity data
      var n = data.indexOf('H');
      if (n != -1) { // If there's no H data, the entry is malformed.
        var tempReading = data.substring(1,n);
        var humidityReading = data.substring(n+1);
        // Temp data
        values.push({
          sensorID: sensor.sensorID,
          type: type,
          value: tempReading,
          date: entry.date
        });
        // Humidity data
        values.push({
          sensorID: sensor.sensorID,
          type: 'H',
          value: humidityReading,
          date: entry.date
        });
      }
    }
    return values;
  }

  SensorValue.create(parseValueData(data), function(err, sensorValues) {
    if (err) {
      callback(err);
      return;
    }
    sensorValues = _.compact(sensorValues);
    // Update sensor based on reading values
    sensorValues.forEach(function(sensorValue) {
      if (sensorValue != null) {
        if (sensorValue.type == "M") {
          if (sensorValue.value == "1") {
            sensor.lastMotionTime = sensorValue.date;
          }
        } else if (sensorValue.type == "T") {
          sensor.temperature = sensorValue.value;
        } else if (sensorValue.type == "H") {
          sensor.humidity = sensorValue.value;
        } else {
            callback({
                message: "Invalid sensor type",
            });
            return;
        }
      }
    });
    sensor.lastSeen = entry.date
    sensor.save();
    callback(null, {
        sensor: sensor,
        sensorValues: sensorValues,
        entry: entry,
    });
    return;
  });
};

var RoomSensor = mongoose.model('RoomSensor', RoomSensorSchema);

module.exports = RoomSensor;
