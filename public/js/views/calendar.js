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
      this.datehelper = new DateHelper(currentDate.getYear(),currentDate.getMonth());
    },
    el: '#calendar',
    render: function() {
      var dustContext = {
        'currMonthDays' : this.dateHelper.currDays,
        'prevMonthDays' : this.dateHelper.prevDays,
        'nextMonthDays' : this.dateHelper.nextDays
      };
      var self = this;
      dust.render("tmpl", dustContext, function(err, out){
        if (err) {
          console.log(err);
        } else {
          self.$el.html(out);
        }
      });
    }
  });
  return CalendarView;
});