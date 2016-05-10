$(document).ready(function() {

    var colors = Please.make_color({
        colors_returned: events.length
    });

    var calendarEvents = events.map(function(sensorEvents, i) {
        var color = colors[i];
        return sensorEvents.map(function(e) {
            return {
                title: e.sensorID,
                color: color,
                start: e.startDate,
                end: e.endDate,
            }
        });
    })

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        eventLimit: true,
        events: _.flatten(calendarEvents)
        // put your options and callbacks here
    })

});