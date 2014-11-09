define(function(){

	/* Set date by year and month, class will then calculate and store
			an array of the dates to place in calendar for previous, next
			and current month [29, 30, 31]
	*/
	
	// TODO: add validation and test for limit of args

	function DateHelper(year,month){
		this.setDate(year,month);
	};
	DateHelper.prototype = {
		constructor: DateHelper,
		setDate:function(year, month){
			var mon, prevMon, nextMon, date, days, daysLeft, currDaysInMo, prevDaysInMo, nextDaysInMo, monthStartDay;
			var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
			this.prevMonth = new Date(year,month);
			this.currMonth = new Date(year,month);
			this.nextMonth = new Date(year,month);
			this.year = this.currMonth.getFullYear();
			date = new Date(year,month);
			monthStartDay = date.getDay();
			mon = date.getMonth();
			prevMon = mon - 1;
			nextMon = mon + 1;
			if (prevMon < 0) {
				prevMon = 11;
				this.prevMonth.setYear(date.getFullYear() - 1);
			};
			this.prevMonth.setMonth(prevMon);
			if (nextMon > 11) {
				nextMon = 0;
				this.nextMonth.setYear(date.getFullYear() + 1);
			};
			this.nextMonth.setMonth(nextMon);
			// store month names
			this.prevMonthName = monthNames[this.prevMonth.getMonth()];
			this.currMonthName = monthNames[this.currMonth.getMonth()];
			this.nextMonthName = monthNames[this.nextMonth.getMonth()];
			currDaysInMo = this.daysInMonth(this.currMonth.getFullYear(), this.currMonth.getMonth());
			prevDaysInMo = this.daysInMonth(this.prevMonth.getFullYear(), this.prevMonth.getMonth());
			nextDaysInMo = this.daysInMonth(this.nextMonth.getFullYear(), this.nextMonth.getMonth());
			var dayOfWeek = this.currMonth.getDay();
			// build prevDays array
			days = [];
			for (i = 0; i < dayOfWeek; i++) {
				days.push(prevDaysInMo - dayOfWeek + i + 1);
			}
			this.prevDays = days;
			// build currDays array
			days = [];
			for (i = 1; i <= currDaysInMo; i++) {
				days.push(i);
			}
			this.currDays = days;
			// build nextDays array
			days = [];
			daysLeft = 35 - (this.prevDays.length) - currDaysInMo;
			// 31 day months that start on a Sat will need six weeks displayed
			if (daysLeft < 0) { 
				daysLeft = 7 + daysLeft;
			}
			for (i = 1; i <= daysLeft; i++) {
				days.push(i);
			}
			this.nextDays = days;
		},
		daysInMonth:function(year, month) { 
			// setting to day 0 returns last day of previous month
			return new Date(year, month + 1, 0).getDate();
		},
		setToNextMonth:function(){ // just a convenience method, calls this.setDate
			var nextMon, nextYear;
			nextMon = this.currMonth.getMonth() + 1;
			nextYear = this.currMonth.getFullYear();
			if (nextMon > 11) {
				nextMon = 0;
				nextYear++;
			}
			this.setDate(nextYear, nextMon);
		},
		setToPrevMonth:function(){ // another convenience method
			var prevMon, prevYear;
			prevMon = this.currMonth.getMonth() - 1;
			prevYear = this.currMonth.getFullYear();
			if (prevMon < 0) {
				prevMon = 11;
				prevYear--;
			}
			this.setDate(prevYear, prevMon);
		}
	};
	return DateHelper;
});