// Most of the app logic is here
// Re-renders and fetches month's events whenever the month is changed

define([
  'underscore',
  'dust',
  'backbone',
  'collections/events',
  'text!templates/calendar.dust',
  'utilities/datehelper',
  'views/event'
  ], function(_,dust, Backbone, Events, CalendarTemplate, DateHelper, EventView){

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
      this.datehelper = new DateHelper(currentDate.getFullYear(),currentDate.getMonth());
      // Events collection passed into constructor in main.js
      this.listenTo(this.collection, 'fetched', this.createEventViews);
      // fetch the full month's data when calendar is initially loaded or changed to diff month
      // only fetch events and render them after calendar has been rendered; 
      this.render().callFetch(); 
    },
    callFetch: function(year,month){
      if (year && month) {
      // call fetch for a specific year and month
      // put some code here
      } else {
      // app start or page refreshed
        this.collection.fetch({success: function(coll, resp, opts){
            coll.trigger('fetched');
          }
        });
      }
    },
    prevMonth: function(){
      this.datehelper.setToPrevMonth();
      this.render();
    },
    nextMonth: function(){
      this.datehelper.setToNextMonth();
      this.render();
    },
    createEventViews: function() {
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // TODO: Make this handle a single model, then it can be used when we create a single event
      // iterate over the collection and pass in one model at a time on initial fetch
      // (assume the collection is sorted by day and then time...or do this after fetch)
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!      
    // should only happen after calendar itself renders, put calendar render call in init
      var daysThisMo = this.datehelper.currDays.length;
      var dayEvents, elem, ev, view;
      console.log("createDayViews \n");
      console.log(JSON.stringify(this.collection.toJSON()));
      for (i = 1; i <= daysThisMo; i++) {
        console.log("i: " + i);
        dayEvents = this.collection.where({day: i.toString()}); // check for events on each day
        elem = "#day_" + i;
        if (dayEvents.length) {
          for (j = 0; j < dayEvents.length; j++) {
            console.log("  j: " + j + ", event: ");
            console.log(dayEvents[j]);
            ev = dayEvents[j];
            view = new EventView({model: ev, el: elem});
            view.render();
            this.$(elem).append(view.el);
          }
        }
      } // for (i ...
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
      return this; // make chainable so we can call callFetch() after
    }
  });
  return CalendarView;
});

    // // If you hit return in the main input field, create new **Todo** model,
    // // persisting it to *localStorage*.
    // createOnEnter: function(e) {
    //   if (e.keyCode != 13) return;
    //   this.collection.create(this.newAttributes());
    //   this.input.val('');
    // },*/