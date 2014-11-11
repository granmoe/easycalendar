define(['underscore', 'backbone','text!templates/event.dust'], 
	function(_, Backbone,DayTemplate) {
  var EventView = Backbone.View.extend({
      // passed el into constructor in calendar view
      // el: '#day_' + day number
      initialize: function() {
      	var compiled = dust.compile(DayTemplate, "event_tmpl");
      	dust.loadSource(compiled);
        _.bindAll(this, 'render');
      },
      // events: { these should get attached to model when view is instantiated from calendarview

      // }
      render: function() {
      	var dustContext = this.model.toJSON();
	      var self = this;
	      dust.render("event_tmpl", dustContext, function(err, out){
	        if (err) {
	          console.log(err);
	        } else {
	          self.el.innerHTML = out; // this may overwrite content that already exists in the element
                                    // even though we're using append in the parent view
            console.log("Event self:");
            console.log(self);
            return self;
	        }
	      });
        //return this; // to make the object chainable
      }
  });
  return EventView;
});
// will need to render the whole day again for each change to an event....
// could change to single event views, append each event to its appropriate day