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
  var data = req.body.message;
  RoomSensor.registerReading(data, function(err, results) {
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

router.put('/sensors/:sensorId', function(req, res) {
  RoomSensor.findByIdAndUpdate(req.params.sensorId, req.body, {new: true}, function(err, sensor) {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(sensor);
  });
})

router.get('/readings', function(req, res) {
  SensorValue.find({}).sort({date: -1}).limit(50).exec(function(err, sensorValues) {
    if (err) {
      res.status(500).send(err);
    }
    res.render('readings', {title: '6.S062 Sensor Readings', sensorValues: sensorValues});
  })
})

router.get('/logs', function(req, res) {
  Entry.aggregate([
    {$sort: {date: -1}},
    {$limit: 20},
    {$sort: {date: 1}}
  ]).exec(function(err, entries) {
    if (err) {
      res.status(500).send(err);
    }
    res.render('logs', {title: '6.S062 Sensor Logs', entries: entries});
  })
})

router.get('/:sensorID', function(req, res) {
  // TODO make this better
  SensorValue.find({sensorID: req.params.sensorID}).sort({date: -1}).limit(1000).exec(function(err, sensorValues) {
    if (err) {
      res.status(500).send(err);
    }
    res.render('graph', {title: '6.S062 Sensor Logs', readings: sensorValues});
  })
})

module.exports = router;
