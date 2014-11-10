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
      var compiled = dust.compile(CalendarTemplate, "cal_tmpl");
      dust.loadSource(compiled);
      // set to today, updated when events collection loaded
      var currentDate = new Date(); 
      this.listenTo(this.collection, 'fetched', this.createDayViews);
      this.datehelper = new DateHelper(currentDate.getFullYear(),currentDate.getMonth());
      this.collection.fetch({success: function(coll, resp, opts){
          console.log(JSON.stringify(coll.toJSON()));
          coll.trigger('fetched');
        }
      });
    },
    prevMonth: function(){
      this.datehelper.setToPrevMonth();
      this.render();
    },
    nextMonth: function(){
      this.datehelper.setToNextMonth();
      this.render();
    },
    createDayViews: function() { // collect events for each day
      var daysThisMo = this.datehelper.currDays.length;
      var results;
      console.log("createDayViews \n");
      console.log(JSON.stringify(this.collection.toJSON()));
      for (i = 0; i < daysThisMo; i++) {
        results = this.collection.where({ day: "11" });
        var dayCollection = new Backbone.Collection(results);
        console.log("i = " + i);
        console.log(JSON.stringify(dayCollection.toJSON));
        // create day view that will attach to the appropriate ol element
      }
    },
    render: function() {
      var dustContext = {
        'year': this.datehelper.year,
        'monthName' : this.datehelper.currMonthName,
        'currMonthDays' : this.datehelper.currDays,
        'prevMonthDays' : this.datehelper.prevDays,
        'nextMonthDays' : this.datehelper.nextDays
      };
      var self = this;
      dust.render("cal_tmpl", dustContext, function(err, out){
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