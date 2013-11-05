define([
	"cldr",
	"globalize/datetime/parse",
	"json!fixtures/cldr/main/en/ca-gregorian.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"json!fixtures/cldr/supplemental/timeData.json",
	"json!fixtures/cldr/supplemental/weekData.json"
], function( Cldr, parse, enCaGregorian, likelySubtags, timeData, weekData ) {

	var cldr,
		date1 = new Date( 0, 0 ),
		date2 = new Date( 0, 0 );

	Cldr.load( enCaGregorian );
	Cldr.load( likelySubtags );
	Cldr.load( timeData );
	Cldr.load( weekData );

	cldr = new Cldr( "en" );
	date1.setFullYear( 4 );
	date2.setFullYear( -4 );

	module( "Datetime Parse" );

	/**
	 *  Era
	 */

	test( "should tokenize era (G|GG|GGG)", function() {
		deepEqual( parse( "AD 4", "G y", cldr ), date1, "" );
		deepEqual( parse( "BC 5", "G y", cldr ), date2, "" );
		deepEqual( parse( "AD 4", "GG y", cldr ), date1, "" );
		deepEqual( parse( "BC 5", "GG y", cldr ), date2, "" );
		deepEqual( parse( "AD 4", "GGG y", cldr ), date1, "" );
		deepEqual( parse( "BC 5", "GGG y", cldr ), date2, "" );
	});

	test( "should tokenize era (GGGG)", function() {
		deepEqual( parse( "Anno Domini 4", "GGGG y", cldr ), date1, "" );
		deepEqual( parse( "Before Christ 5", "GGGG y", cldr ), date2, "" );
	});

	test( "should tokenize era (GGGGG)", function() {
		deepEqual( parse( "A 4", "GGGGG y", cldr ), date1, "" );
		deepEqual( parse( "B 5", "GGGGG y", cldr ), date2, "" );
	});

	/**
	 *  Year
	 */

	test( "should tokenize year (y) with no padding", function() {
		deepEqual( parse( "1982", "y", cldr ), [{
			type: "y",
			lexeme: "1982"
		}], "" );
	});

	test( "should tokenize year (yy) with padding, and limit 2 digits", function() {
		deepEqual( parse( "82", "yy", cldr ), [{
			type: "yy",
			lexeme: "82"
		}], "" );
	});

	test( "should tokenize year (yyy+) with padding", function() {
		deepEqual( parse( "1982", "yyy", cldr ), [{
			type: "yyy",
			lexeme: "1982"
		}], "" );
		deepEqual( parse( "01982", "yyyyy", cldr ), [{
			type: "yyyyy",
			lexeme: "01982"
		}], "" );
	});

	test( "should tokenize year in \"week of year\" (Y) with no padding", function() {
		deepEqual( parse( "1982", "Y", cldr ), [{
			type: "Y",
			lexeme: "1982"
		}], "" );
	});

	test( "should tokenize year in \"week of year\" (YY) with padding, and limit 2 digits", function() {
		deepEqual( parse( "82", "YY", cldr ), [{
			type: "YY",
			lexeme: "82"
		}], "" );
	});

	test( "should tokenize year in \"week of year\" (YYY+) with padding", function() {
		deepEqual( parse( "1982", "YYY", cldr ), [{
			type: "YYY",
			lexeme: "1982"
		}], "" );
		deepEqual( parse( "01982", "YYYYY", cldr ), [{
			type: "YYYYY",
			lexeme: "01982"
		}], "" );
	});

	/**
	 *  Quarter
	 */

	test( "should tokenize quarter (Q|q) with no padding", function() {
		deepEqual( parse( "1", "Q", cldr ), [{
			type: "Q",
			lexeme: "1"
		}], "" );
		deepEqual( parse( "1", "q", cldr ), [{
			type: "q",
			lexeme: "1"
		}], "" );
	});

	test( "should tokenize quarter (QQ|qq) with padding", function() {
		deepEqual( parse( "01", "QQ", cldr ), [{
			type: "QQ",
			lexeme: "01"
		}], "" );
		deepEqual( parse( "01", "qq", cldr ), [{
			type: "qq",
			lexeme: "01"
		}], "" );
	});

	test( "should tokenize quarter (QQQ|qqq)", function() {
		deepEqual( parse( "Q1", "QQQ", cldr ), [{
			type: "QQQ",
			lexeme: "Q1",
			value: "1"
		}], "" );
		deepEqual( parse( "Q1", "qqq", cldr ), [{
			type: "qqq",
			lexeme: "Q1",
			value: "1"
		}], "" );
	});

	test( "should tokenize quarter (QQQQ|qqqq) with padding", function() {
		deepEqual( parse( "1st quarter", "QQQQ", cldr ), [{
			type: "QQQQ",
			lexeme: "1st quarter",
			value: "1"
		}], "" );
		deepEqual( parse( "1st quarter", "qqqq", cldr ), [{
			type: "qqqq",
			lexeme: "1st quarter",
			value: "1"
		}], "" );
	});

	/**
	 *  Month
	 */

	test( "should tokenize month (M|L) with no padding", function() {
		deepEqual( parse( "1", "M", cldr ), [{
			type: "M",
			lexeme: "1"
		}], "" );
		deepEqual( parse( "1", "L", cldr ), [{
			type: "L",
			lexeme: "1"
		}], "" );
	});

	test( "should tokenize month (MM|LL) with padding", function() {
		deepEqual( parse( "01", "MM", cldr ), [{
			type: "MM",
			lexeme: "01"
		}], "" );
		deepEqual( parse( "01", "LL", cldr ), [{
			type: "LL",
			lexeme: "01"
		}], "" );
	});

	test( "should tokenize month (MMM|LLL)", function() {
		deepEqual( parse( "Jan", "MMM", cldr ), [{
			type: "MMM",
			lexeme: "Jan",
			value: "1"
		}], "" );
		deepEqual( parse( "Jan", "LLL", cldr ), [{
			type: "LLL",
			lexeme: "Jan",
			value: "1"
		}], "" );
	});

	test( "should tokenize month (MMMM|LLLL)", function() {
		deepEqual( parse( "January", "MMMM", cldr ), [{
			type: "MMMM",
			lexeme: "January",
			value: "1"
		}], "" );
		deepEqual( parse( "January", "LLLL", cldr ), [{
			type: "LLLL",
			lexeme: "January",
			value: "1"
		}], "" );
	});

	test( "should tokenize month (MMMMM|LLLLL)", function() {
		deepEqual( parse( "J", "MMMMM", cldr ), [{
			type: "MMMMM",
			lexeme: "J",
			value: "1"
		}], "" );
		deepEqual( parse( "J", "LLLLL", cldr ), [{
			type: "LLLLL",
			lexeme: "J",
			value: "1"
		}], "" );
	});

	/**
	 *  Week
	 */

	test( "should tokenize week of year (w) with no padding", function() {
		deepEqual( parse( "1", "w", cldr ), [{
			type: "w",
			lexeme: "1"
		}], "" );
	});

	test( "should tokenize week of year (ww) with padding", function() {
		deepEqual( parse( "01", "ww", cldr ), [{
			type: "ww",
			lexeme: "01"
		}], "" );
	});

	test( "should tokenize week of month (W)", function() {
		deepEqual( parse( "1", "W", cldr ), [{
			type: "W",
			lexeme: "1"
		}], "" );
	});

	/**
	 *  Day
	 */

	test( "should tokenize day (d) with no padding", function() {
		deepEqual( parse( "2", "d", cldr ), [{
			type: "d",
			lexeme: "2"
		}], "" );
	});

	test( "should tokenize day (dd) with padding", function() {
		deepEqual( parse( "02", "dd", cldr ), [{
			type: "dd",
			lexeme: "02"
		}], "" );
	});

	test( "should tokenize day of year (D) with no padding", function() {
		deepEqual( parse( "2", "D", cldr ), [{
			type: "D",
			lexeme: "2"
		}], "" );
	});

	test( "should tokenize day of year (DD|DDD) with padding", function() {
		deepEqual( parse( "02", "DD", cldr ), [{
			type: "DD",
			lexeme: "02"
		}], "" );
		deepEqual( parse( "002", "DDD", cldr ), [{
			type: "DDD",
			lexeme: "002"
		}], "" );
	});

	test( "should tokenize day of week in month (F)", function() {
		deepEqual( parse( "1", "F", cldr ), [{
			type: "F",
			lexeme: "1"
		}], "" );
	});

	/**
	 *  Week day
	 */

	test( "should tokenize local day of week (e|c) with no padding", function() {
		deepEqual( parse( "7", "e", cldr ), [{
			type: "e",
			lexeme: "7"
		}], "" );
		deepEqual( parse( "7", "c", cldr ), [{
			type: "c",
			lexeme: "7"
		}], "" );
	});

	test( "should tokenize local day of week (ee|cc) with padding", function() {
		deepEqual( parse( "07", "ee", cldr ), [{
			type: "ee",
			lexeme: "07"
		}], "" );
		deepEqual( parse( "07", "cc", cldr ), [{
			type: "cc",
			lexeme: "07"
		}], "" );
	});

	test( "should tokenize local day of week (E|EE|EEE|eee|ccc)", function() {
		deepEqual( parse( "Sat", "E", cldr ), [{
			type: "E",
			lexeme: "Sat",
			value: "sat"
		}], "" );
		deepEqual( parse( "Sat", "EE", cldr ), [{
			type: "EE",
			lexeme: "Sat",
			value: "sat"
		}], "" );
		deepEqual( parse( "Sat", "EEE", cldr ), [{
			type: "EEE",
			lexeme: "Sat",
			value: "sat"
		}], "" );
		deepEqual( parse( "Sat", "eee", cldr ), [{
			type: "eee",
			lexeme: "Sat",
			value: "sat"
		}], "" );
		deepEqual( parse( "Sat", "ccc", cldr ), [{
			type: "ccc",
			lexeme: "Sat",
			value: "sat"
		}], "" );
	});

	test( "should tokenize local day of week (EEEE|eeee|cccc)", function() {
		deepEqual( parse( "Saturday", "EEEE", cldr ), [{
			type: "EEEE",
			lexeme: "Saturday",
			value: "sat"
		}], "" );
		deepEqual( parse( "Saturday", "eeee", cldr ), [{
			type: "eeee",
			lexeme: "Saturday",
			value: "sat"
		}], "" );
		deepEqual( parse( "Saturday", "cccc", cldr ), [{
			type: "cccc",
			lexeme: "Saturday",
			value: "sat"
		}], "" );
	});

	test( "should tokenize local day of week (EEEEE|eeeee|ccccc)", function() {
		// OBS: note the abbreviated S would matche sun or sat. But, only the first is returned.
		deepEqual( parse( "S", "EEEEE", cldr ), [{
			type: "EEEEE",
			lexeme: "S",
			value: "sun"
		}], "" );
		deepEqual( parse( "S", "eeeee", cldr ), [{
			type: "eeeee",
			lexeme: "S",
			value: "sun"
		}], "" );
		deepEqual( parse( "S", "ccccc", cldr ), [{
			type: "ccccc",
			lexeme: "S",
			value: "sun"
		}], "" );
	});

	test( "should tokenize local day of week (EEEEEE|eeeeee|cccccc)", function() {
		deepEqual( parse( "Sa", "EEEEEE", cldr ), [{
			type: "EEEEEE",
			lexeme: "Sa",
			value: "sat"
		}], "" );
		deepEqual( parse( "Sa", "eeeeee", cldr ), [{
			type: "eeeeee",
			lexeme: "Sa",
			value: "sat"
		}], "" );
		deepEqual( parse( "Sa", "cccccc", cldr ), [{
			type: "cccccc",
			lexeme: "Sa",
			value: "sat"
		}], "" );
	});

	/**
	 *  Period
	 */

	test( "should tokenize period (a)", function() {
		deepEqual( parse( "AM", "a", cldr ), [{
			type: "a",
			lexeme: "AM",
			value: "am"
		}], "" );
	});

	/**
	 *  Hour
	 */

	test( "should tokenize hour (h) using 12-hour-cycle [1-12] with no padding", function() {
		deepEqual( parse( "9", "h", cldr ), [{
			type: "h",
			lexeme: "9"
		}], "" );
	});

	test( "should tokenize hour (hh) using 12-hour-cycle [1-12] with padding", function() {
		deepEqual( parse( "09", "hh", cldr ), [{
			type: "hh",
			lexeme: "09"
		}], "" );
	});

	test( "should tokenize hour (H) using 24-hour-cycle [0-23] with no padding", function() {
		deepEqual( parse( "9", "H", cldr ), [{
			type: "H",
			lexeme: "9"
		}], "" );
	});

	test( "should tokenize hour (HH) using 24-hour-cycle [0-23] with padding", function() {
		deepEqual( parse( "09", "HH", cldr ), [{
			type: "HH",
			lexeme: "09"
		}], "" );
	});

	test( "should tokenize hour (K) using 12-hour-cycle [0-11] with no padding", function() {
		deepEqual( parse( "9", "K", cldr ), [{
			type: "K",
			lexeme: "9"
		}], "" );
	});

	test( "should tokenize hour (KK) using 12-hour-cycle [0-11] with padding", function() {
		deepEqual( parse( "09", "KK", cldr ), [{
			type: "KK",
			lexeme: "09"
		}], "" );
	});

	test( "should tokenize hour (k) using 24-hour-cycle [1-24] with no padding", function() {
		deepEqual( parse( "9", "k", cldr ), [{
			type: "k",
			lexeme: "9"
		}], "" );
	});

	test( "should tokenize hour (kk) using 24-hour-cycle [1-24] with padding", function() {
		deepEqual( parse( "09", "kk", cldr ), [{
			type: "kk",
			lexeme: "09"
		}], "" );
	});

	test( "should tokenize hour (j) using preferred hour format for the locale (h, H, K, or k) with no padding", function() {
		deepEqual( parse( "9", "j", cldr ), [{
			type: "j",
			lexeme: "9"
		}], "" );
	});

	test( "should tokenize hour (jj) using preferred hour format for the locale (h, H, K, or k) with padding", function() {
		deepEqual( parse( "09", "jj", cldr ), [{
			type: "jj",
			lexeme: "09"
		}], "" );
	});

	/**
	 *  Minute
	 */

	test( "should tokenize minute (m) with no padding", function() {
		deepEqual( parse( "5", "m", cldr ), [{
			type: "m",
			lexeme: "5"
		}], "" );
	});

	test( "should tokenize minute (mm) with padding", function() {
		deepEqual( parse( "05", "mm", cldr ), [{
			type: "mm",
			lexeme: "05"
		}], "" );
	});

	/**
	 *  Second
	 */

	test( "should tokenize second (s) with no padding", function() {
		deepEqual( parse( "59", "s", cldr ), [{
			type: "s",
			lexeme: "59"
		}], "" );
	});

	test( "should tokenize second (ss) with padding", function() {
		deepEqual( parse( "59", "ss", cldr ), [{
			type: "ss",
			lexeme: "59"
		}], "" );
	});

	test( "should tokenize various milliseconds (S+)", function() {
		deepEqual( parse( "4", "S", cldr ), [{
			type: "S",
			lexeme: "4"
		}], "" );
		deepEqual( parse( "37", "SS", cldr ), [{
			type: "SS",
			lexeme: "37"
		}], "" );
		deepEqual( parse( "369", "SSS", cldr ), [{
			type: "SSS",
			lexeme: "369"
		}], "" );
		deepEqual( parse( "3690", "SSSS", cldr ), [{
			type: "SSSS",
			lexeme: "3690"
		}], "" );
		deepEqual( parse( "36900", "SSSSS", cldr ), [{
			type: "SSSSS",
			lexeme: "36900"
		}], "" );
	});

	test( "should tokenize various milliseconds (A+)", function() {
		deepEqual( parse( "633074", "A", cldr ), [{
			type: "A",
			lexeme: "633074"
		}], "" );
		deepEqual( parse( "6330737", "AA", cldr ), [{
			type: "AA",
			lexeme: "6330737"
		}], "" );
		deepEqual( parse( "63307369", "AAA", cldr ), [{
			type: "AAA",
			lexeme: "63307369"
		}], "" );
		deepEqual( parse( "633073690", "AAAA", cldr ), [{
			type: "AAAA",
			lexeme: "633073690"
		}], "" );
		deepEqual( parse( "6330736900", "AAAAA", cldr ), [{
			type: "AAAAA",
			lexeme: "6330736900"
		}], "" );
	});

	/**
	 *  Zone
	 */

	// TODO all

});
