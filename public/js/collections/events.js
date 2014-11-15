define([
  'backbone', 
  'models/event'
  ], function(Backbone, Event){

	var EventsCollection = Backbone.Collection.extend({
    model: Event,
    url: '/api/events',
    month: '',
    year: '',
  });
  return new EventsCollection();
});