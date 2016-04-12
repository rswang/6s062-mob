var mongoose = require('mongoose');
var RoomSensor = require('./RoomSensor');

var DeploymentSchema = mongoose.Schema({
	gatewayID: {type: String},
	roomSensors: [RoomSensor]
});

var Deployment = mongoose.model('Deployment', DeploymentSchema);

module.exports = Deployment;
