$(document).ready(function() {

    var sensorsById = _.keyBy(roomsensors, 'sensorID');

    _.values(roomsensors).forEach(function(s) {
        appendToElement("#sensors-container", "roomsensor-collection", s);
    });

    $(document).on("click", ".roomsensor-edit", function(e) {
        var sensorId = $(this).parents(".roomsensor").data("sensor-id");
        replaceElement("#sensor-" + sensorId, "roomsensor-edit", sensorsById[sensorId]);
    });

    $(document).on("click", ".roomsensor-save", function(e) {
        var sensorId = $(this).parents(".roomsensor").data("sensor-id");
        var formData = $("#edit-form-" + sensorId).serialize();
        $.ajax({
            method: "PUT",
            url: "/sensors/" + sensorsById[sensorId]._id,
            data: formData,
            success: function(data) {
                sensorsById[sensorId] = data;
                replaceElement("#sensor-" + sensorId, "roomsensor-collection", sensorsById[sensorId]);
            }
        })
    });

    $(document).on("click", ".roomsensor-cancel", function(e) {
        var sensorId = $(this).parents(".roomsensor").data("sensor-id");
        replaceElement("#sensor-" + sensorId, "roomsensor-collection", sensorsById[sensorId]);
    });

    socket.on('roomsensorupdate', function(sensor) {
        sensorsById[sensor.sensorID] = sensor;
        if ($("#sensor-" + sensor.sensorID).hasClass("editing")) {
          replaceElement("#sensor-" + sensor.sensorID, "roomsensor-edit", sensor);
        } else {
          replaceElement("#sensor-" + sensor.sensorID, "roomsensor-collection", sensor);
        }
    });

})
