module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; var desp = Object.getOwnPropertyDescriptor(m.exports, k); if(desp && desp.configurable) Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1573989022837, function(require, module, exports) {

module.exports = {
	Generator: require('./src/jsCalendar'),
	addLabels: require('./src/addLabels')
}

}, function(modId) {var map = {"./src/jsCalendar":1573989022838,"./src/addLabels":1573989022839}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573989022838, function(require, module, exports) {
// calendar with 8 column x 7 rows

var oneDay = 1000 * 60 * 60 * 24;

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getYear(year, month, weekNr){
	if (month === 0 && weekNr > 50) return year - 1;
	else if(month === 11 && weekNr < 10) return year + 1;
	else return year;
}

function getDateInfo(y, m, d, iso) {
	if (m > 11){
		m = 0;
		y++;
	}
    var currentDay = new Date(y, m, d);
    if (iso) currentDay.setDate(currentDay.getDate() + 4 - (currentDay.getDay() || 7));
    var year = iso ? currentDay.getFullYear() : y;
    var firstOfJanuary = new Date(year, 0, 1);
    var numberOfDays = 1 + Math.round((currentDay - firstOfJanuary) / oneDay);

    if (!iso) numberOfDays += firstOfJanuary.getDay();
	var w = Math.ceil(numberOfDays / 7);
    if (!iso) {
		var initialDay = new Date(y, m, d);
        var beginOfNextYear = new Date(y + 1, 0, 1);
        var startDayOfNextYear = beginOfNextYear.getDay();
        if (initialDay.getTime() >= beginOfNextYear.getTime() - (oneDay * startDayOfNextYear)) w = 1;
    }
	return w;
}

function getMonthCalender(year, month, iteratorFns){

	// config passed by binding
	var lang = this.lang || 'en';
	var onlyDays = this.onlyDays;
	var weekStart = typeof this.weekStart === 'undefined' ? 1 : this.weekStart;
	var iso = weekStart === 1;
	var cells = [];
	var monthStartDate = new Date(year, month, 1);	// make a date object
	var dayOfWeek = monthStartDate.getDay() || (iso ? 7 : 0);	// month week day for day 1
	var currentDay = weekStart - dayOfWeek; 		// starting position of first day in the week
	var weekNr = getDateInfo(year, month, 1, iso);	// get week number of month start
	var maxDays = daysInMonth(year, month);			// total days in current month
	var lastMonthMaxDays = daysInMonth(year, month - 1);
	var currentMonth, day, dayBefore;
	var currentYear = getYear(year, month, weekNr);

	var returnObject = {
		month: month,
		year: year,
		daysInMonth: maxDays
	};

	for (var i = 0; i < 7; i++){					// 7 rows in the calendar
		dayBefore = currentDay;
		for (var j = 0; j < 8; j++){				// 8 columns: week nr + 7 days p/ week
			if (i > 0 && j > 0) currentDay++;		// not first row, not week nr column

			if (currentDay > maxDays || currentDay < 1){ // day belongs to sibling month
				// calculate day in sibling month
				day = currentDay > maxDays ? currentDay - maxDays : lastMonthMaxDays + currentDay;
				currentMonth = currentDay > maxDays ? month + 1 : month - 1;
			} else {
				day = currentDay;
				currentMonth = month;
			}

			var type = (function(){
				if (j === 0) return 'weekLabel';
				else if (i === 0) return 'dayLabel';
				else if (currentDay < 1) return 'prevMonth';
				else if (currentDay > maxDays) return 'nextMonth';
				else return 'monthDay';
			})();
			var isDay = dayBefore !== currentDay && i > 0;

			var dayData = {
				desc: isDay ? day : weekNr,
				week: weekNr,
				type: type,
				format: iso ? 'ISO 8601' : 'US',
				date: isDay ? new Date(Date.UTC(year, currentMonth, day)) : false,
				year: currentYear,
				index: cells.length
			};

			if (iteratorFns){
				if (typeof iteratorFns === "function") dayData = iteratorFns.call(returnObject, dayData, lang);
				else iteratorFns.forEach(function(fn){
					dayData = fn.call(returnObject, dayData, lang);
				});
			}
			if (onlyDays && isDay) cells.push(dayData);	// add only days
			else if (!onlyDays) cells.push(dayData);	// add also week numbers and labels
		}
		if (i > 0) weekNr = getDateInfo(year, currentMonth, day + 1, iso);
		currentYear = getYear(year, month, weekNr);
	}

	returnObject.cells = cells;
	return returnObject;
}

module.exports = function (config){
	return getMonthCalender.bind(config);
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573989022839, function(require, module, exports) {
// calendar with 8 column x 7 rows

var labels = require('./labels');

function isIterable(variable){
	if (variable == null) return false;
	if (variable.constructor === Array) return true;
	if (variable.constructor === Object) return true;
	return false;
}

function merge(_new, _old){
    for (var prop in _new){
        if (!_old[prop]) _old[prop] = _new[prop];
        else if (isIterable(_new[prop])) merge(_new[prop], _old[prop]);
    }
}

function addLabels(dayObject, lang){
	var cssClass = [labels.classes[dayObject.type]];

	if (dayObject.class) dayObject.class = (typeof dayObject.class == 'string' ? [dayObject.class] : dayObject.class).concat(cssClass);
	else dayObject.class = cssClass;

	if (dayObject.type.indexOf('Label') > 0){
		if (dayObject.index == 0 && labels.weekPlaceholder) dayObject.desc = labels.weekPlaceholder;
		else if (dayObject.index < 8) dayObject.desc = labels.columnNames[lang][dayObject.index];
		else if (dayObject.index % 8 == 0) dayObject.desc = dayObject.week;
	}

	if (dayObject.date) dayObject.monthName = labels.monthNames[lang][dayObject.date.getMonth()];
	if (!this.monthName) this.monthName = labels.monthNames[lang][this.month];
	if (!this.labels) this.labels = {
		monthNames: labels.monthNames[lang],
		columnNames: labels.columnNames[lang],
		classes: labels.classes
	}

	return dayObject;
}
addLabels.setLabels = function(newOptions){
	merge(newOptions, labels);
};

module.exports = addLabels;

}, function(modId) { var map = {"./labels":1573989022840}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573989022840, function(require, module, exports) {

module.exports = {
	weekPlaceholder: '',
	columnNames: {
		en: {
			0: 'w',
			1: 'monday',
			2: 'tuesday',
			3: 'wednesday',
			4: 'thursday',
			5: 'friday',
			6: 'saturday',
			7: 'sunday'
		},
		sv: {
			0: 'v',
			1: 'måndag',
			2: 'tisdag',
			3: 'onsdag',
			4: 'torsdag',
			5: 'fredag',
			6: 'lördag',
			7: 'söndag'
		},
		pt: {
			0: 's',
			1: 'segunda',
			2: 'terça',
			3: 'quarta',
			4: 'quinta',
			5: 'sexta',
			6: 'sábado',
			7: 'domingo'
		}
	},
	monthNames: {
		en: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		],
		sv: [
			"januari",
			"februari",
			"mars",
			"april",
			"maj",
			"juni",
			"juli",
			"augusti",
			"september",
			"oktober",
			"november",
			"december"
		],
		pt: [
			"Janeiro",
			"Fevereiro",
			"Março",
			"Abril",
			"Maio",
			"Junho",
			"Julho",
			"Agosto",
			"Setembro",
			"Outubro",
			"Novembro",
			"Dezembro"
		]
	},
	classes: {
		dayLabel: 'day-of-week',
		weekLabel: 'week-number',
		prevMonth: 'inactive',
		nextMonth: 'inactive',
		monthDay: 'day-in-month'
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1573989022837);
})()
//# sourceMappingURL=index.js.map