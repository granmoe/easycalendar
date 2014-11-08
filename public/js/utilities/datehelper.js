define(function(){
	function DateHelper(date){
		// TODO: add validation and test range of dates
		this.setDate(date);
	}
	DateHelper.prototype = {
		currMonth, prevMonth, nextMonth, currDays, prevDays, nextDays, // xDays vars hold array of day nums
		constructor: DateHelper,
		setDate:function(currDate){
			var prevYear, nextYear;
			var mon = currDate.getMonth();
			var prevMon = mon - 1;
			var nextMon = mon + 1;
			if (prevMon < 0) {
				prevMon = 11;
				prevYear = currDate.getYear() - 1;
			}
			if (nextMon > 11) {
				nextMon--;
				nextYear = currDate.getYear() + 1;
			}
			this.currMonth = currDate;
			this.prevMonth = currDate.setMonth(prevMon)
			this.nextMonth = currDate.setMonth(nextMon)
			this.currDays = daysInMonth(currDate.getMonth(), currDate.getYear());
			this.prevDays = daysInMonth(this.prevMonth.getMonth(), this.prevMonth.getYear());
			this.nextDays = daysInMonth(this.nextMonth.getMonth(), this.nextMonth.getYear());
		},
		daysInMonth:function(month, year) {
  		return new Date(year, month, 0).getDate();
		},
		nextMonth:function(){
			var nextMon = this.currMonth.getMonth() + 1;
			var nextYear;
			if (nextMon > 11) {
				nextMon--;
				nextYear = this.currMonth.getYear() + 1;
				this.currMonth.setYear(nextYear);
			}
				this.currMonth.setMonth(nextMon);
			},
		prevMonth:function(){
			var prevMon = this.currMonth.getMonth() - 1;
			var prevYear;
			if (prevMon < 0) {
				prevMon = 11;
				prevYear = this.currMonth.getYear() - 1;
				this.currMonth.setYear(prevYear);
			}
				this.currMonth.setMonth(prevMon);		
				init(this.currMonth);
			}
	}
	return DateHelper;
});