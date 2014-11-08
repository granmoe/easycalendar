	function DateHelper(year,month){
		// date must be a Date object
		// TODO: add validation and test range of dates
		this.setDate(year,month);
	}
	DateHelper.prototype = {
		constructor: DateHelper,
		setDate:function(year,month){
			var date, prevYear, nextYear, mon, prevMon, nextMon;
			date = new Date(year,month);
			console.dir("date object info: \n\n" + date);
			mon = date.getMonth();
			prevMon = mon - 1;
			nextMon = mon + 1;
			if (prevMon < 0) {
				prevMon = 11;
				prevYear = date.getYear() - 1;
			}
			if (nextMon > 11) {
				nextMon--;
				nextYear = date.getYear() + 1;
			}
			this.currMonth = date;
			this.prevMonth = date.setMonth(prevMon);
			this.nextMonth = date.setMonth(nextMon);
			this.currDays = this.daysInMonth(date.getMonth(), date.getYear());
			this.prevDays = this.daysInMonth(this.prevMonth.getMonth(), this.prevMonth.getYear());
			this.nextDays = this.daysInMonth(this.nextMonth.getMonth(), this.nextMonth.getYear());
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