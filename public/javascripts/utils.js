Handlebars.registerPartial('log-humidity', Handlebars.templates['log-humidity']);
Handlebars.registerPartial('log-motion', Handlebars.templates['log-motion']);
Handlebars.registerPartial('log-temperature', Handlebars.templates['log-temperature']);
Handlebars.registerPartial('roomsensor-edit', Handlebars.templates['roomsensor-edit']);
Handlebars.registerPartial('roomsensor-collection', Handlebars.templates['roomsensor-collection']);

Handlebars.registerHelper('formatDate', function(date) {
    return moment(date).format('MM/DD h:mm:ss A');
})

Handlebars.registerHelper('relativeDate', function(date) {
    return moment(date).fromNow();
})


// Append template to specified selector
var appendToElement = function(selector, template, data) {
    data = data || {};
    $(selector).append(Handlebars.templates[template](data));
};

// Append template to specified selector
var prependToElement = function(selector, template, data) {
    data = data || {};
    $(selector).prepend(Handlebars.templates[template](data));
};


// Load template to specified selector
var loadElement = function(selector, template, data) {
    $(selector).html(Handlebars.templates[template](data));
};

var replaceElement = function(selector, template, data) {
    $(selector).replaceWith(Handlebars.templates[template](data));
}