require.config({
  baseUrl:'/js/',
  paths: {
    jquery: 'libs/jquery-min',
    underscore: 'libs/underscore',
    backbone: 'libs/backbone',
    text: 'libs/text',
    dust: 'libs/dust-min',
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

require(['jquery','backbone', 'views/app'], 
	function($, Backbone, AppView){
	// get initial sample data from file
  //var calendar_view = new CalendarView(); // pass data here as collection
  var appview = new AppView();
  console.log("Started from main.js by require :)");
});