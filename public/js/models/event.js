define([
  'backbone'
  ], function(Backbone){

	var EventModel = Backbone.Model.extend({
		defaults: {
			id: '',
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