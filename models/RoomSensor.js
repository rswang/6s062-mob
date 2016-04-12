var mongoose = require('mongoose');

var RoomSensorSchema = mongoose.Schema({
	sensorID: {type: String},
	lastMotionTime: {type: Date, default: new Date()}
});

RoomSensorSchema.statics.updateStatus = function updateStatus (data, callback) {
	if (data.length > 4 && data.indexOf("ping") == 0) {
		var sensorID = data.substring(4);
		console.log(sensorID);
		this.find({sensorID: sensorID}, function(err, sensors) {
			if (err) {
				callback(err, null);
			} else {
				if (sensors.length == 0) {
					// new sensor
					RoomSensor.create({sensorID: sensorID}, function(err, doc) {
						callback(err, doc);
					});
				} else {
					var sensor = sensors[0];
					sensor.lastMotionTime = new Date();
					sensor.save();
					callback(null, sensor);
				}
			}
		});
	} else {
		callback("Error: data formatted incorrectly", null);
	}
};

var RoomSensor = mongoose.model('RoomSensor', RoomSensorSchema);

module.exports = RoomSensor;
