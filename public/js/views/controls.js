define(['backbone','text!templates/controls.dust'], 
	function(Backbone,ControlsTemplate) {
  var ControlsView = Backbone.View.extend({
      el: '#controls',
      initialize: function() {
      	var compiled = dust.compile(ControlsTemplate, "ctrl_tmpl");
      	dust.loadSource(compiled);
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