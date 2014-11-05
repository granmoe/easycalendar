require.config({
  baseUrl:'../',
  paths: {
    jquery: 'libs/jquery/jquery-min',
    dust: 'libs/dust/dust-min',
    backbone: 'libs/backbone/backbone-min',
    text: 'libs/require/text'
  }
});

require(['views/calendar', 'collections/events'], 
	function(CalendarView, EventsCollection){
	// get initial sample data from file
  var calendar_view = new CalendarView(); // pass data here as collection

});