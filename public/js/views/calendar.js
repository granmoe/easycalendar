define([
  'dust',
  'backbone',
  'collections/events',
  'text!templates/calendar.dust',
  'utilities/datehelper'
  ], function(dust, Backbone, Events, CalendarTemplate, DateHelper){

  var CalendarView = Backbone.View.extend({
    initialize: function(){
      var compiled = dust.compile(CalendarTemplate, "tmpl");
      dust.loadSource(compiled);
      // set to today, updated when events collection loaded
      var currentDate = new Date(); 
      this.datehelper = new DateHelper(currentDate);
    },
    el: '#calendar',
    render: function() {
      var dustContext = { // just a test...
        'currMonthDays' : this.datehelper.currDays,
        'prevMonthDays' : this.DateHelper.prevDays,
        'nextMonthDays' : this.DateHelper.nextDays
      };
      var self = this;
      dust.render("tmpl", dustContext, function(err, out){
        if (err) {
          console.log(err);
        } else {
          self.$el.html(out);
        }
      });
    } // render
  });
  return CalendarView;
});

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