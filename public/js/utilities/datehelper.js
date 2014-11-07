define(function(){
	function DateHelper(date){
		// should add validation and test range of dates
		init(date);
		function init(currDate){
			var mon = currDate.getMonth();
			var prevMon = mon - 1;
			var nextMon = mon + 1;
			if (prevMon < 0) prevMon++;
			if (nextMon > 11) nextMon--;
			this.currMonth = currDate;
			this.prevMonth = currDate.setMonth(prevMon)
			this.nextMonth = currDate.setMonth(nextMon)
			this.currDays = daysInMonth(currDate.getMonth(), currDate.getYear());
			this.prevDays = daysInMonth(this.prevMonth.getMonth(), this.prevMonth.getYear());
			this.nextDays = daysInMonth(this.nextMonth.getMonth(), this.nextMonth.getYear());
		}
		function daysInMonth(month, year) {
  		return new Date(year, month, 0).getDate();
		}
	}
	DateHelper.prototype.nextMonth = function(){
		var nextMon = this.currMonth.getMonth() + 1;
		var nextYear;
		if (nextMon > 11) {
			nextMon--;
			nextYear = this.currMonth.getYear() + 1;
			this.currMonth.setYear(nextYear);
		}
		this.currMonth.setMonth(nextMon);
	}
	DateHelper.prototype.prevMonth = function(){
		var prevMon = this.currMonth.getMonth() - 1;
		var prevYear;
		if (prevMon < 0) {
			prevMon++;
			prevYear = this.currMonth.getYear() - 1;
			this.currMonth.setYear(prevYear);
		}
		this.currMonth.setMonth(prevMon);		
		init(this.currMonth);
	}
	return DateHelper;
});