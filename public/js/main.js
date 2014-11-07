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
  ['jquery','backbone', 'dust', 'collections/events', 'views/calendar','views/controls'], 
	function($, Backbone, dust, EventsCollection, CalendarView, ControlsView){
    // Override Backbone.sync with ReSTful API
    var id_counter = 1;
    Backbone.sync = function(method, model) {
      console.log("I've been passed " + method + " with " + JSON.stringify(model));
      if (method === 'create') {
        model.set('id', id_counter++);
      }
    };
    var calendarView = new CalendarView();
    var controlsView = new ControlsView();
    controlsView.render();
    calendarView.render();
    console.log("Started from main.js by require :)");
});

// what other dependencies are needed? Calendar and Controls

// init the two main views of the app: calendar and controls
  // get initial sample data for calendar from file
  //    do this within events collection logic
  //    within views, listen to collection/model events and render

    // var calendarView = new CalendarView({
    //   collection: EventsCollection // returns new Events collection
    // });