// TODO: Validation. time/day should be strict

define(['backbone','text!templates/controls.dust', 'models/event'], 
	function(Backbone, ControlsTemplate, CalEvent) {
  var ControlsView = Backbone.View.extend({
      el: '#controls',
      initialize: function() {
      	var compiled = dust.compile(ControlsTemplate, "ctrl_tmpl");
      	dust.loadSource(compiled);
      },
      events: {
        "click #create-event-btn" : 'createEvent'
      },
      createEvent: function() {
        // add in validation to check if all fields are filled out
        this.collection.create(this.newAttributes());
        this.render(); // change this to just clear value of inputs?
      },
      // need validation
      newAttributes: function() {
          // this is a bit of a hack...store current mm/yyyy in global var?
        var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        var currMonth = $("#header h1").text().split(' ')[0];
        currMonth = monthNames.indexOf(currMonth);

        return {
          title: $("#ev-title").val().trim(),
          time: $('#ev-beg-time').val().trim() + " - " + $("#ev-end-time").val().trim(),
          day: $("#ev-day").val().trim(),
          year: $("#header h1").text().split(' ')[1],
          month: currMonth,
          id: '',
          address: $("#ev-address").val().trim()
        };
      },
      render: function() {
      	var dustContext = {
	        // don't need any model instance data here yet...can add later if needed
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