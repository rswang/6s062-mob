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
      that.find({sensorID: sensor.sensorID, type: value.type})
        .sort({date:-1}).limit(3).exec(function(err, foundValues) {
          if (err) {
            done(err);
            return;
          }
          // only try to aggregate if there are >=3 readings of a type
          if (foundValues.length >= 3) {
            var deleted = false;
            if (value.type == 'M') {
              // If motion was just sensed and was also sensed recently,
              // we assume that motion took place in the entire interim
              // time period.
              // We define "recently" as a 1 minute period of time.
              if (foundValues[0].value == "1" && foundValues[2].value == "1"
                  && Math.abs(foundValues[2].date.getTime() - foundValues[0].date.getTime()) < 60000) {
                that.remove({_id: foundValues[1]._id}, function(err) {
                  deleted = true;
                  if (err) {
                    done(err);
                  }
                });
              }
            }
            if (!deleted && foundValues[0].value == foundValues[1].value &&
                foundValues[1].value == foundValues[2].value) {
              that.remove({_id: foundValues[1]._id}, function(err) {
                if (err) {
                  done(err);
                }
              });
            }
          }
          done();
          return;
      });
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
