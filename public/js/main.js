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
    // the events bus is a shared object to pass events between views

    // Override Backbone.sync with ReSTful API to load initial data, remaining methods could be written on server side
    Backbone.origSync = Backbone.sync;
    Backbone.customSync = function(method, model, option) {
        // Fallback for old sync method
        if (method == 'read') return Backbone.origSync(method, model, option);
       //console.log(method + ' method called for model: "' + JSON.stringify(model) + '"');
    }
    Backbone.sync = Backbone.customSync;

    // init the views
    var calendarView = new CalendarView({collection: EventsCollection});
    var controlsView = new ControlsView({collection: EventsCollection});
    controlsView.render();
    // calendarview has to be rendered in itself, dependent on data
});