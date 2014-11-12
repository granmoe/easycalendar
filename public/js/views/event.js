define(['underscore', 'backbone','text!templates/event.dust'], 
	function(_, Backbone,DayTemplate) {
  var EventView = Backbone.View.extend({
      // passed el into constructor in calendar view
      // el: '#day_' + day number
      initialize: function() {
      	var compiled = dust.compile(DayTemplate, "event_tmpl");
      	dust.loadSource(compiled);
        _.bindAll(this, 'render'); // which one of this or the next line ???
//        this.listenTo(this.model,'change',this.render());
      },
      events: {  // should these get attached to model when view is instantiated from calendarview??
        'click' : 'editEvent',
        'mouseover' : 'showDetails',
        'mouseout' : 'clearDetails'
      },
      render: function() {
      	var dustContext = this.model.toJSON();
	      var self = this;
	      dust.render("event_tmpl", dustContext, function(err, out){
	        if (err) {
	          console.log(err);
	        } else {
	          self.el.innerHTML = out; // this may overwrite content that already exists in the element
                                    // even though we're using append in the parent view
            return self;
	        }
	      });
      },
      editEvent: function () {
        console.log("event view edit method")
        this.$el.addClass('editing');
      },
      doneEditing: function () {
        this.$el.removeClass('editing');
      },
      showDetails: function() {
        $("#ev-title").val(this.model.get('title'));
        $("#ev-beg-time").val(this.model.get('time'));
        $("#ev-end-time").val(this.model.get('time'));
        $("#ev-address").val(this.model.get('address'));
      },
      clearDetails: function() {
        $("#ev-title").val('');
        $("#ev-beg-time").val('');
        $("#ev-end-time").val('');
        $("#ev-address").val('');
      }
  });
  return EventView;
});
// will need to render the whole day again for each change to an event....
// could change to single event views, append each event to its appropriate day