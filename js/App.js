window.App = Ember.Application.create({
		rootElement: '#ember-app'
});

App.Store = DS.Store.extend({
  revision: 12
});

App.Log = DS.Model.extend({
		host: DS.attr('string'),
		date: DS.attr('string'),
		request: DS.attr('string'),
		useragent: DS.attr('string'),
		status: DS.attr('string'),
		size: DS.attr('number'),
		
		path: function() {
			var request = this.get('request');
			return request.substring(request.indexOf("/"), request.lastIndexOf(" "));
		}.property('request'),
		method: function() {
			var request = this.get('request');//TODO(factorize)
			return request.substring(0, request.indexOf(" "));
		}.property('request')
});

App.IndexRoute = Ember.Route.extend({
		model: function() {
			return App.Log.find();
		}
});

Ember.Handlebars.registerBoundHelper('size', function(value, options) {
  var readable = value;
  if (!value)
  	  readable = "";
  else if (value < 1024)
  	  readable += " B";
  else
  	  readable = (readable / 1024).toFixed(2) + " kB";
  return /*new Handlebars.SafeString(*/readable/*)*/;
});

App.Router.map(function() {
  this.route("detail", { path: "/log/:log_id" });
});
