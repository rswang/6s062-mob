(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['log-humidity'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"collection-item avatar\">\n    <i class=\"material-icons circle purple\">check</i>\n    <span class=\"title\">"
    + alias4(((helper = (helper = helpers.sensorID || (depth0 != null ? depth0.sensorID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sensorID","hash":{},"data":data}) : helper)))
    + "</span>\n    <p>\n        <i>"
    + alias4((helpers.formatDate || (depth0 && depth0.formatDate) || alias2).call(alias1,(depth0 != null ? depth0.date : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</i>\n        <br>\n        <b>Humidity:</b> "
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "%\n    </p>\n</li>";
},"useData":true});
templates['log-motion'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<li class=\"collection-item avatar\">\n    <i class=\"material-icons circle orange\">check</i>\n    <span class=\"title\">"
    + alias3(((helper = (helper = helpers.sensorID || (depth0 != null ? depth0.sensorID : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"sensorID","hash":{},"data":data}) : helper)))
    + "</span>\n    <p>\n        <i>"
    + alias3((helpers.formatDate || (depth0 && depth0.formatDate) || alias2).call(alias1,(depth0 != null ? depth0.date : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</i>\n        <br>\n        Motion detected\n    </p>\n</li>";
},"useData":true});
templates['log-temperature'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"collection-item avatar\">\n    <i class=\"material-icons circle blue\">check</i>\n    <span class=\"title\">"
    + alias4(((helper = (helper = helpers.sensorID || (depth0 != null ? depth0.sensorID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sensorID","hash":{},"data":data}) : helper)))
    + "</span>\n    <p>\n        <i>"
    + alias4((helpers.formatDate || (depth0 && depth0.formatDate) || alias2).call(alias1,(depth0 != null ? depth0.date : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</i>\n        <br>\n        <b>Temperature:</b> "
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "°F\n    </p>\n</li>";
},"useData":true});
templates['roomsensor-collection'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li id=\"sensor-"
    + alias4(((helper = (helper = helpers.sensorID || (depth0 != null ? depth0.sensorID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sensorID","hash":{},"data":data}) : helper)))
    + "\" class=\"collection-item avatar roomsensor\" data-sensor-id="
    + alias4(((helper = (helper = helpers.sensorID || (depth0 != null ? depth0.sensorID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sensorID","hash":{},"data":data}) : helper)))
    + ">\n    <i class=\"material-icons circle green\">location_off</i>\n    <span class=\"title\">"
    + alias4(((helper = (helper = helpers.sensorID || (depth0 != null ? depth0.sensorID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sensorID","hash":{},"data":data}) : helper)))
    + "</span>\n    <p>\n        <i>Last seen "
    + alias4((helpers.relativeDate || (depth0 && depth0.relativeDate) || alias2).call(alias1,(depth0 != null ? depth0.lastSeen : depth0),{"name":"relativeDate","hash":{},"data":data}))
    + "</i>\n        <br/>\n        <b>Status:</b> Person sensed "
    + alias4((helpers.relativeDate || (depth0 && depth0.relativeDate) || alias2).call(alias1,(depth0 != null ? depth0.lastMotionTime : depth0),{"name":"relativeDate","hash":{},"data":data}))
    + "\n        <br/>\n        <b>Temperature:</b> "
    + alias4(((helper = (helper = helpers.temperature || (depth0 != null ? depth0.temperature : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"temperature","hash":{},"data":data}) : helper)))
    + "°F\n        <br/>\n        <b>Humidity:</b> "
    + alias4(((helper = (helper = helpers.humidity || (depth0 != null ? depth0.humidity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"humidity","hash":{},"data":data}) : helper)))
    + "%\n        <br/>\n        <b>Notes:</b>\n        <br/>\n        <div class=\"notes\">\n            "
    + alias4(((helper = (helper = helpers.notes || (depth0 != null ? depth0.notes : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"notes","hash":{},"data":data}) : helper)))
    + "\n        </div>\n    </p>\n    <a class=\"secondary-content roomsensor-edit\"><i class=\"material-icons\">mode_edit</i></a>\n</li>\n";
},"useData":true});
templates['roomsensor-edit'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li id=\"sensor-"
    + alias4(((helper = (helper = helpers.sensorID || (depth0 != null ? depth0.sensorID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sensorID","hash":{},"data":data}) : helper)))
    + "\" class=\"collection-item avatar roomsensor\" data-sensor-id="
    + alias4(((helper = (helper = helpers.sensorID || (depth0 != null ? depth0.sensorID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sensorID","hash":{},"data":data}) : helper)))
    + ">\n    <i class=\"material-icons circle green\">location_off</i>\n    <span class=\"title\">"
    + alias4(((helper = (helper = helpers.sensorID || (depth0 != null ? depth0.sensorID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sensorID","hash":{},"data":data}) : helper)))
    + "</span>\n    <p>\n        <i>Last seen "
    + alias4((helpers.relativeDate || (depth0 && depth0.relativeDate) || alias2).call(alias1,(depth0 != null ? depth0.lastMotionTime : depth0),{"name":"relativeDate","hash":{},"data":data}))
    + "</i>\n        <br/>\n        <b>Temperature:</b> "
    + alias4(((helper = (helper = helpers.temperature || (depth0 != null ? depth0.temperature : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"temperature","hash":{},"data":data}) : helper)))
    + "°F\n        <br/>\n        <b>Humidity:</b> "
    + alias4(((helper = (helper = helpers.humidity || (depth0 != null ? depth0.humidity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"humidity","hash":{},"data":data}) : helper)))
    + "%\n        <br/>\n        <b>Notes:</b>\n        <br/>\n        "
    + alias4(((helper = (helper = helpers.notes || (depth0 != null ? depth0.notes : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"notes","hash":{},"data":data}) : helper)))
    + "\n    </p>\n    <a class=\"secondary-content\">\n      <i class=\"material-icons roomsensor-cancel\">cancel</i>\n      <i class=\"material-icons roomsensor-save\">done</i>\n    </a>\n    <div class=\"row\">\n      <form id=\"edit-form-"
    + alias4(((helper = (helper = helpers.sensorID || (depth0 != null ? depth0.sensorID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sensorID","hash":{},"data":data}) : helper)))
    + "\" class=\"col s12\" role=\"form\">\n        <div class=\"row\">\n          <div class=\"input-field col s12\">\n            <textarea id=\"notes-textarea\" name=\"notes\" length=\"120\" class=\"materialize-textarea\" placeholder="
    + alias4(((helper = (helper = helpers.notes || (depth0 != null ? depth0.notes : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"notes","hash":{},"data":data}) : helper)))
    + "></textarea>\n            <label for=\"notes\">Notes</label>\n          </div>\n        </div>\n      </form>\n    </div>\n</li>\n\n";
},"useData":true});
})();