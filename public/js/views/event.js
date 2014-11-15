define(['underscore', 'backbone', 'text!templates/event.dust', 'views/eventedit', 'events_bus'], 
	function(_, Backbone, EventTemplate, EventEditView, events_bus) {
  var EventView = Backbone.View.extend({
      tagName: 'li',
      className: 'calendar-event',
      initialize: function() {
      	var compiled = dust.compile(EventTemplate, "event_tmpl");
      	dust.loadSource(compiled);
        this.getTimes();
        this.listenTo(this.model,'change',this.render);
        this.listenTo(this.model,'destroy',this.remove); // override
        this.listenTo(events_bus, 'doneEditing', this.doneEditing);
        this.on('change:time', this.getTimes);
      },
      events: {
        'click' : 'editEvent',
        'mouseover' : 'showDetails',
        'mouseout' : 'clearDetails'
      },
      remove: function() {
        this.$el.empty();
        this.undelegateEvents(); // otherwise the controlsview still listens to this el
      },
      render: function() {
      	var dustContext = this.model.toJSON();
	      var self = this;
	      dust.render("event_tmpl", dustContext, function(err, out){
	        if (err) {
	          console.log(err);
	        } else {
	          self.el.innerHTML = out;
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
        this.$el.addClass('editing');
        var eventeditview = new EventEditView({ model: this.model });
      },
      doneEditing: function () {
        this.$el.removeClass('editing');
      },
      showDetails: function() {
        $("#create-event-btn").prop('disabled', true);
        $("#ev-title").val(this.model.get('title'));
        $("#ev-day").val(this.model.get('day'));
        $("#ev-beg-time").val(this.begTime);
        $("#ev-end-time").val(this.endTime);
        $("#ev-address").val(this.model.get('address'));
      },
      clearDetails: function() {
        $("#create-event-btn").prop('disabled', false);
        $("#ev-title").val('');
        $("#ev-day").val('');
        $("#ev-beg-time").val('');
        $("#ev-end-time").val('');
        $("#ev-address").val('');
      }
  });
  return EventView;
});