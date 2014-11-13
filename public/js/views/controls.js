// Inputs and buttons to create/edit/delete and show details of events. 
// Would be better to create a new view for an event when it is clicked to allow editing/show details, then remove() the view

define(['backbone','text!templates/controls.dust', 'events_bus'], 
	function(Backbone, ControlsTemplate, events_bus) {
  var ControlsView = Backbone.View.extend({
      el: '#controls',
      initialize: function() {
      	var compiled = dust.compile(ControlsTemplate, "ctrl_tmpl");
      	dust.loadSource(compiled);
        $("#done-editing-btn").hide();
        $("#delete-event-btn").hide();
      },
      events: {
        "click #create-event-btn" : 'createEvent',
        "click #delete-event-btn" : 'deleteEvent',
        "click #done-editing-btn" : 'doneEditing'
      },
      doneEditing: function() {
        events_bus.trigger('doneEditing');
      },
      createEvent: function() {
        // add in validation to check if all fields are filled out 
        this.collection.create(this.newAttributes());
      },
      // need validation
      newAttributes: function() {
          // this is a bit of a hack...store current mm/yyyy in global var?
        var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        var currMonth = $("#header").val().split(' ')[0];
        var currMonth = monthNames.indexOf(currMonth);

        return {
          title: $("#ev-title").val().trim(),
          time: $('#ev-beg-time').val().trim() + " - " + $("#ev-end-time").val().trim(),
          day: $("#ev-day").val().trim(),
          year: $("#header").val().split(' ')[1],
          month: currMonth,
          id: '',
          address: $("#ev-address").val().trim()
        };
      },
      render: function() {
      	var dustContext = {
	        // don't need any model instance data here yet...can add later
      	};
	      var self = this;
	      dust.render("ctrl_tmpl", dustContext, function(err, out){
	        if (err) {
	          console.log(err);
	        } else {
	          self.$el.html(out);
	        }
	      });
      }
  });
  return ControlsView;
});