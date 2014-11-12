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
      // render calendar first, then check for data in database, 
      // if data then change to appropriate month and re-render calendar, then create event views
      this.render().callFetch(); 
      
      this.listenTo(this.collection, 'fetched', this.setDate);
      this.listenTo(this.collection, 'add', this.createEventView);
      // STILL NEED TO SET MONTH AND YEAR IF COLLECTION FETCHED SUCCESSFULLY
    },
    // fetch the full month's data when calendar is initially loaded or changed to diff month
    callFetch: function(year,month){
      if (year && month) {
      // call fetch for a specific year and month
      //    put some code here
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
      var view = new EventView({model: ev, el: elem});
      view.render();
      $(elem).append(view.el);
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