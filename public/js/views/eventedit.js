define(['underscore', 'backbone', 'text!templates/eventedit.dust', 'events_bus'], 
	function(_, Backbone, EventEditTemplate, events_bus) {
  var EventView = Backbone.View.extend({
      //el: $("#event-edit-dialog"),
      tagName: 'div',
      className: 'event-edit-dialog',
      initialize: function() {
        console.log("Edit Event View - El = \n");
        console.log(this.el);
      	var compiled = dust.compile(EventEditTemplate, "eventedit_tmpl");
      	dust.loadSource(compiled);
        this.getTimes();
        this.render();
      },
      events: {
        'click #delete-event-btn' : 'deleteEvent',
        'click #done-editing-btn' : 'doneEditing'
      },
      render: function() {
      	var dustContext = this.model.toJSON();
	      var self = this;
	      dust.render("eventedit_tmpl", dustContext, function(err, out){
	        if (err) {
	          console.log(err);
	        } else {
            self.$el.html(out);
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
        this.remove();
      },
      doneEditing: function () {
        console.log("doneEditing event");
        events_bus.trigger('doneEditing');
        this.model.editing = false;
        this.remove();
      }
  });
  return EventView;
});