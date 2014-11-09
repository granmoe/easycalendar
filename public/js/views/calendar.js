define([
  'dust',
  'backbone',
  'collections/events',
  'text!templates/calendar.dust',
  'utilities/datehelper'
  ], function(dust, Backbone, Events, CalendarTemplate, DateHelper){

  var CalendarView = Backbone.View.extend({
    el: '#calendar',
    events: {
      'click #prev-btn': 'prevMonth',
      'click #next-btn': 'nextMonth'
    },
    initialize: function(){
      var compiled = dust.compile(CalendarTemplate, "tmpl");
      dust.loadSource(compiled);
      // set to today, updated when events collection loaded
      var currentDate = new Date(); 
      this.datehelper = new DateHelper(currentDate.getFullYear(),currentDate.getMonth());
    },
    prevMonth: function(){
      this.datehelper.setToPrevMonth();
      this.render();
    },
    nextMonth: function(){
      this.datehelper.setToNextMonth();
      this.render();
    },
    render: function() {
      console.dir(this.datehelper);
      var dustContext = {
        'year': this.datehelper.year,
        'monthName' : this.datehelper.currMonthName,
        'currMonthDays' : this.datehelper.currDays,
        'prevMonthDays' : this.datehelper.prevDays,
        'nextMonthDays' : this.datehelper.nextDays
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

/*    // Generate the attributes for a new Todo item.
    newAttributes: function() {
      return {
        content: this.input.val(),
        order:   this.collection.nextOrder(),
        done:    false
      };
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      this.collection.create(this.newAttributes());
      this.input.val('');
    },*/