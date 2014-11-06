define(['backbone'], function(Backbone) {
    var AppView = Backbone.View.extend({
        el: '#controls',
        initialize: function() {
        	this.render();
        },
        render: function() {
        	this.$el.html("From the app view");
        }
    });
    return AppView;
});

// define([
//   'jquery',
//   'backbone',
//   'collections/todos',
//   'views/todo',
//   'text!templates/stats.html'
//   ], function($, Dust, Backbone, Todos, TodoView, statsTemplate){

//   // initialize basic app config
// 	var id_counter = 1;
// 	Backbone.sync = function(method, model) {
// 	  console.log("I've been passed " + method + " with " + JSON.stringify(model));
// 	  if (method === 'create') {
// 	  	model.set('id', id_counter++);
// 	  }
// 	};

//   var AppView = Backbone.View.extend({

//     // Instead of generating a new element, bind to the existing skeleton of
//     // the App already present in the HTML.
//     el: $('#calendar'),

//     render: function(){
    	
//     }
//     // Our template for the line of statistics at the bottom of the app.
//     //statsTemplate: Dust.template(statsTemplate),

//     // ...events, initialize() etc. can be seen in the complete file

//     // What data needs to be passed when the app is refreshed?
//     // render: function() {
//     //   var done = Todos.done().length;
//     //   this.$('#todo-stats').html(this.statsTemplate({
//     //     total:      Todos.length,
//     //     done:       Todos.done().length,
//     //     remaining:  Todos.remaining().length
//     //   }));
//     // };

// });