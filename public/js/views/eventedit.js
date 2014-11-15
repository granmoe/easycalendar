define(['underscore', 'backbone', 'text!templates/eventedit.dust', 'events_bus'], 
	function(_, Backbone, EventEditTemplate, events_bus) {
  var EventView = Backbone.View.extend({
      el: $("#event-edit-dialog"),
      initialize: function() {
      	var compiled = dust.compile(EventEditTemplate, "eventedit_tmpl");
      	dust.loadSource(compiled);
        this.getTimes();
        this.render();
      },
      events: {
        'click #delete-event-btn' : 'deleteEvent',
        'click #done-editing-btn' : 'doneEditing',
        'click #save-changes-btn' : 'saveChanges'
      },
      // this looks familiar...could consolidate the create and edit views / re-work the UI
      newAttributes: function() {
        // this is a bit of a hack...store current mm/yyyy in global var?
        var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        var currMonth = $("#header h1").text().split(' ')[0];
        var currMonth = monthNames.indexOf(currMonth);

        return {
          title: $("#ev-edit-title").val().trim(),
          time: $('#ev-edit-beg-time').val().trim() + " - " + $("#ev-edit-end-time").val().trim(),
          day: $("#ev-edit-day").val().trim(),
          year: $("#header h1").text().split(' ')[1], // this is a little bit of a hack as well
          month: currMonth,
          id: '',
          address: $("#ev-address").val().trim()
        };
      },
      render: function() {
      	var dustContext = this.model.toJSON();
        dustContext.begtime = this.begTime;
        dustContext.endtime = this.endTime;
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
      // need to unattach listeners every time view is cleared, otherwise it continues listening to each model
      // could probably refactor/consolidate the repeated logic here
      doneEditing: function () {
        this.undelegateEvents();
        events_bus.trigger('doneEditing');
        this.$el.empty();
      },
      saveChanges: function() {
        this.undelegateEvents();
        this.model.set(this.newAttributes());
        events_bus.trigger('doneEditing');
        this.$el.empty();
      },
      deleteEvent: function() {
        this.undelegateEvents();
        this.model.destroy();
        this.$el.empty();
      }
  });
  return EventView;
});