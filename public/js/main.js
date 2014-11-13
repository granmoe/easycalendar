require.config({
  baseUrl:'/js/',
  paths: {
    jquery: 'libs/jquery-min',
    underscore: 'libs/underscore',
    backbone: 'libs/backbone',
    text: 'libs/text',
    dust: 'libs/dust-full',
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    dust: {
      exports: 'dust'
    }
  }
});

require(
  ['underscore', 'jquery','backbone', 'dust', 'collections/events', 'views/calendar','views/controls','events_bus'], 
	function(_, $, Backbone, dust, EventsCollection, CalendarView, ControlsView, Events_Bus){
    // the events bus is a shared object that different views can trigger events on and listen to

    // Override Backbone.sync with ReSTful API
    // var id_counter = 1;
    // Backbone.sync = function(method, model) {
      
    //   // console.log("I've been passed " + method + " with " + JSON.stringify(model));
    //   // if (method === 'create') {
    //   //   model.set('id', id_counter++);
    //   // }
    // };
    // init the views
    var calendarView = new CalendarView({collection: EventsCollection});
    var controlsView = new ControlsView({collection: EventsCollection});
    controlsView.render();
    // calendarview has to be rendered in itself, dependent on data
});