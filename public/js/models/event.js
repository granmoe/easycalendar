define([
  'backbone'
  ], function(Backbone){

	var EventModel = Backbone.Model.extend({
		initialize: function() {
			this.editing = false;
		},
		defaults: {
			id: '',
			month: '',
			year: '',
			title: '',
			time: '',
			day: '',
			address: ''
		},
		toggleEdit: function() {
			this.editing = !this.editing;
		}
  });
  return EventModel;
});