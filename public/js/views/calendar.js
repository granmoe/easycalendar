define([
  'dust',
  'backbone',
  'collections/events',
  'text!templates/calendar.dust',
  'utilities/datehelper'
  ], function(dust, Backbone, Events, CalendarTemplate, DateHelper){

  var CalendarView = Backbone.View.extend({
    initialize: function(){
      console.log("CalendarView initialized.");
      var compiled = dust.compile(CalendarTemplate, "tmpl");
      dust.loadSource(compiled);
    },
//    template: dust.loadSource(CalendarTemplate),
    el: '#calendar',
    render: function() {
      var dustContext = {
        "events": [
          {
              "month": "12",
              "year": "2014",
              "id": "1",
              "title": "Node.js Training - Day 1",
              "time": "9:00a - 4:00p",
              "day": "11",
              "address": "7601 Penn Ave S, Richfield, MN"
          },
          {
              "month": "12",
              "year": "2014",
              "id": "2",
              "title": "Node.js Training - Day 2",
              "time": "9:00a - 4:00p",
              "day": "12",
              "address": "7601 Penn Ave S, Richfield, MN"
          },
          {
              "month": "12",
              "year": "2014",
              "id": "3",
              "title": "Node.js Training - Day 3",
              "time": "9:00a - 4:00p",
              "day": "13",
              "address": "7601 Penn Ave S, Richfield, MN"
          }
        ]
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