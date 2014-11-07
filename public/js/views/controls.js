define(['backbone'], function(Backbone) {
  var ControlsView = Backbone.View.extend({
      el: '#controls',
      initialize: function() {
      },
      render: function() {
      	this.$el.html("From the app view");
      }
  });
  return ControlsView;
});