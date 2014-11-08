// NEED TO COPY THIS CODE INTO MAIN datehelper.js FILE WHEN DONE!!!!!!!!!!!!!!!

function DateHelper(year,month){
	// TODO: add validation and test range of dates

	/* Set date by year and month, class will then calculate and store
			an array of the dates to place in calendar for previous, next
			and current month [29, 30, 31]
	*/
	this.setDate(year,month);
};
DateHelper.prototype = {
	constructor: DateHelper,
	setDate:function(year, month){
		var mon, prevMon, nextMon, date, days, daysLeft, currDaysInMo, prevDaysInMo, nextDaysInMo, monthStartDay;
		this.prevMonth = new Date(year,month);
		this.currMonth = new Date(year,month);
		this.nextMonth = new Date(year,month);
		date = new Date(year,month);
		monthStartDay = date.getDay();
		console.log("date object info: \n\n" + this.nextMonth + "\n");
		mon = date.getMonth();
		prevMon = mon - 1;
		nextMon = mon + 1;
		if (prevMon < 0) {
			prevMon = 11;
			this.prevMonth.setYear(date.getYear() - 1);
		};
		this.prevMonth.setMonth(prevMon);
		if (nextMon > 11) {
			nextMon = 0;
			this.nextMonth.setYear(date.getYear() + 1);
		};
		this.nextMonth.setMonth(nextMon);
		console.log("prev, curr, next: " + "\n" + this.prevMonth + "\n" + this.currMonth + "\n" + this.nextMonth);
		currDaysInMo = this.daysInMonth(this.currMonth.getYear(), this.currMonth.getMonth());
		prevDaysInMo = this.daysInMonth(this.prevMonth.getYear(), this.prevMonth.getMonth());
		nextDaysInMo = this.daysInMonth(this.nextMonth.getYear(), this.nextMonth.getMonth());
		var dayOfWeek = this.currMonth.getDay();
		// build prevDays array
		days = [];
		for (i = 1; i <= dayOfWeek; i++) {
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
		daysLeft = 35 - (this.prevDays.length) - currDaysInMo;
		console.log("daysLeft: \n" + daysLeft);
	},
	daysInMonth:function(year, month) {
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
		} else {
			this.currMonth.setMonth(prevMon);		
			init(this.currMonth);
		}
	}
};