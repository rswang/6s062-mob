$(document).ready(function() {

    // var colors = Please.make_color({
    //     colors_returned: events.length
    // });

var colors = randomColor({luminosity: 'dark', count: events.length});

    var calendarEvents = events.map(function(sensorEvents, i) {
        var color = colors[i];
        var convertDate = function(date) {
          return new Date(date);
        }
        return sensorEvents.map(function(e, j) {
            return {
                title: e.sensorID + " " + j,
                color: color,
                start: convertDate(e.startDate),
                end: convertDate(e.endDate),
            }
        });
    })

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultView: 'agendaWeek',
        eventLimit: true,
        events: _.flatten(calendarEvents)
        // put your options and callbacks here
    })

});
