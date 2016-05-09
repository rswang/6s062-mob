var mongoose = require('mongoose');
var async = require('async');

var SensorValueSchema = mongoose.Schema({
  sensorID: {type: String},
  type: {type: String, enum: ['M', 'H', 'T']}, // M, H, T
  value: {type: String},
  date: {type: Date}
});

SensorValueSchema.statics.createWithAggregation = function(sensor, values, callback) {
  var that = this;
  that.create(values, function(err, sensorValues) {
    if (err) {
      callback(err);
      return;
    }
    // aggregation step
    async.each(sensorValues, function(value, done) {
      if (value.type == 'M') {
        // If motion was just sensed and was also sensed recently,
        // we assume that motion took place in the entire interim
        // time period.
        // We define "recently" as a 1 minute period of time.
        if (value.value == "1") {
          var d = new Date();
          d.setMinutes(d.getMinutes() - 1);
          that.find({sensorID: sensor.sensorID, type: value.type,
            date: {$gte: d}}).exec(function(err, foundValues) {
            var motion = false;
            // Motion values that are 0 that we should delete
            var valuesToDelete = [];
            var last = foundValues.length - 1;
            foundValues.forEach(function(val, index) {
              // If motion was also detected in the past minute, then
              // we should delete all intermediate values.
              if (motion && index != last) {
                valuesToDelete.push(val);
              } else if (val.value == "1") {
                motion = true;
              }
            });
            async.each(valuesToDelete, function(value, delDone) {
              that.remove({_id: value._id}, function(err) {
                delDone(err);
              });
            }, function(err) {
              if (err) {
                done(err);
                return;
              }
            });
          });
        }
        done();
      } else {
        that.find({sensorID: sensor.sensorID, type: value.type})
        .sort({date:-1}).limit(3).exec(function(err, foundValues) {
          if (err) {
            done(err);
            return;
          }
          // only try to aggregate if there are >=3 readings of a type
          if (foundValues.length >= 3 &&
              foundValues[0].value == foundValues[1].value &&
              foundValues[1].value == foundValues[2].value) {
            that.remove({_id: foundValues[1]._id}, function(err) {
              if (err) {
                done(err);
              }
            });
          }
          done();
          return;
        });
      }
    }, function(err) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, sensorValues);
      return;
    });
  });
};

var SensorValue = mongoose.model('SensorValue', SensorValueSchema);

module.exports = SensorValue;
