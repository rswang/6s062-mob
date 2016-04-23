var express = require('express');
var router = express.Router();
var Entry = require('../models/Entry');
var RoomSensor = require('../models/RoomSensor');
var SensorValue = require('../models/SensorValue');
var io = require('../io');

/* GET home page. */
router.get('/', function(req, res, next) {
  RoomSensor.find({}, function(err, sensors) {
    if (err) {
      res.status(500).send(err);
    }
    res.render('sensors', {title: '6.S062 Sensors', sensors: sensors});
  })
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  var data = req.body.message;
  console.log(data);
  RoomSensor.registerValue(data, function(err, results) {
    if (err) {
      res.status(500).send(err);
    } else {
      results.sensorValues.forEach(function(sensorValue) {
        io.emit("reading", sensorValue);
      });
      io.emit("message", results.entry);
      io.emit("roomsensorupdate", results.sensor);
    res.status(200).send("Success");
    }
  });
});

router.get('/readings', function(req, res) {
  SensorValue.find({}).sort({date: -1}).exec(function(err, sensorValues) {
    if (err) {
      res.status(500).send(err);
    }
    res.render('readings', {title: '6.S062 Sensor Readings', sensorValues: sensorValues});
  })
})

router.get('/logs', function(req, res) {
  Entry.find({}).sort({date: 1}).exec(function(err, entries) {
    if (err) {
      res.status(500).send(err);
    }
    res.render('logs', {title: '6.S062 Sensor Logs', entries: entries});
  })
})

module.exports = router;
