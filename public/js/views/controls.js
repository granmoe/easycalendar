define(['backbone','text!templates/controls.dust'], 
	function(Backbone,ControlsTemplate) {
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
      },
      newAttributes: function() {
        return {
          title: $("#ev-title").val().trim(),
          time: '1:00p - 3:30p', // PLACEHOLDER
          day: '1',             // PLACEHOLDER
          year: '2014',        // PLACEHOLDER
          month: '12',        // PLACEHOLDER
          id: '5',
          // time: $("#ev-beg-time").val().trim + end time  add in am/pm (a/p);
          // ev-end-time
          address: $("#ev-address").val().trim()
        };
      },
      render: function() {
      	var dustContext = {
	        // 'key' : 'value'
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