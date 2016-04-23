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
})();