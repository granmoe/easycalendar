define([
	'underscore',
  'backbone'
  ], function(_, Backbone){

	var EventModel = Backbone.Model.extend({
		defaults: {
			month: '',
			year: '',
			title: '',
			time: '',
			day: '',
			address: ''
		}
  });
  return EventModel;
});