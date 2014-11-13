define(['underscore', 'backbone', 'text!templates/event.dust', 'views/eventedit', 'events_bus'], 
	function(_, Backbone, EventTemplate, EventEditView, events_bus) {
  var EventView = Backbone.View.extend({
      // el passed into constructor in calendar view as '#day_' + day number
      initialize: function() {
      	var compiled = dust.compile(EventTemplate, "event_tmpl");
      	dust.loadSource(compiled);
        this.getTimes();
        this.listenTo(this.model,'change',this.render());
        this.listenTo(events_bus, 'doneEditing', this.doneEditing); // TODO: ReST API on backend to save changes
        this.listenTo(events_bus, 'deleteEvent', this.deleteEvent);
        this.on('change:time', this.getTimes);
      },
      events: {
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
      getTimes: function() {
        if (!this.model.get('time')) return; // undefined or ''
        var parts = this.model.get('time').split('-');
        this.begTime = parts[0];
        this.endTime = parts[1];
      },
      deleteEvent: function() {
        this.model.destroy();
      },
      editEvent: function () {
        console.log("editevent from event model");
        this.$el.addClass('editing');
        var eventeditview = new EventEditView({ model: this.model });
      },
      doneEditing: function () {
        this.$el.removeClass('editing');
      },
      showDetails: function() {
        $("#ev-title").val(this.model.get('title'));
        $("#ev-day").val(this.model.get('day'));
        $("#ev-beg-time").val(this.begTime);
        $("#ev-end-time").val(this.endTime);
        $("#ev-address").val(this.model.get('address'));
      },
      clearDetails: function() {
        $("#ev-title").val('');
        $("#ev-day").val('');
        $("#ev-beg-time").val('');
        $("#ev-end-time").val('');
        $("#ev-address").val('');
      }
  });
  return EventView;
});