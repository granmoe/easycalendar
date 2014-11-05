define([
  'jquery',
  'backbone',
  'collections/todos',
  'views/event',
  'text!templates/stats.html'
  ], function($, Dust, Backbone, Todos, TodoView, statsTemplate){

  // initialize basic app config
  var id_counter = 1;
  Backbone.sync = function(method, model) {
    console.log("I've been passed " + method + " with " + JSON.stringify(model));
    if (method === 'create') {
      model.set('id', id_counter++);
    }
  };

  var CalendarView = Backbone.View.extend({

    // bind to existing div from html skeleton
    initialize: this.render();
    
    el: $('#calendar'),
    render: function() {
      this.$el.html('This is a test');
    }
    // Our template for the line of statistics at the bottom of the app.
    //statsTemplate: Dust.template(statsTemplate),

    // ...events, initialize() etc. can be seen in the complete file

    // What data needs to be passed when the app is refreshed?
    // render: function() {
    //   var done = Todos.done().length;
    //   this.$('#todo-stats').html(this.statsTemplate({
    //     total:      Todos.length,
    //     done:       Todos.done().length,
    //     remaining:  Todos.remaining().length
    //   }));
    // };
});