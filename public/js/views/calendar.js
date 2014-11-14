// Most of the app logic is here
// Re-renders and fetches month's events whenever the month is changed

define([
  'underscore',
  'dust',
  'backbone',
  'collections/events',
  'text!templates/calendar.dust',
  'utilities/datehelper',
  'views/event',
  'events_bus'
  ], function(_,dust, Backbone, Events, CalendarTemplate, DateHelper, EventView,events_bus){

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
      // render calendar first, then check for data in database, 
      // if data then change to appropriate month and re-render calendar, then create event views
      this.render().callFetch(); 
      
      // re-render based on initial data fetched since month/year must be dependent on this per project specs
      this.listenTo(this.collection, 'firstFetch', this.setDate);
      this.listenTo(events_bus, 'test', this.test);
      this.listenTo(this.collection, 'add', this.createEventView);
    },

    test: function() {
      console.log("TESTETSTETESTESTESTESTET");
    },

    // fetch the full month's data when calendar is initially loaded or changed to diff month
    callFetch: function(year,month){
      if (year && month) {
      // code to get data for specific months
      } else {
      // app start or page refreshed
        this.collection.fetch({success: function(coll, resp, opts){
            coll.trigger('firstFetch');
          }
        });
      }
    },
    prevMonth: function(){
      this.datehelper.setToPrevMonth();
      this.render(); //.callFetch(this.datehelper.year, this.datehelper.month);
    },
    nextMonth: function(){
      this.datehelper.setToNextMonth();
      this.render(); //.callFetch(this.datehelper.year, this.datehelper.month);
    },
    setDate: function() {
      // update the calendar year/month and re-render
      var year = this.collection.first().get('year');
      var month = this.collection.first().get('month') - 1;
      this.datehelper.setDate(year, month);
      this.render();
      var self = this;
      if (this.collection.length) {  // render any events that are in collection
        this.collection.each(function(ev) {
          self.createEventView(ev);
        });
      }
    },
    createEventView: function(ev) {
      var elem = "#day_" + ev.get('day');
      console.log("elem: " + elem);
      var view = new EventView({model: ev});
      view.render();
      $(elem).append(view.el); // why does this remove other content in the elem? Look at Backbone source
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