
var XXX_I18n_UnitConverter =
{
	////////////////////
	// Length / Distance
	////////////////////
	
	/*
	Canonical form: centimeter
	
	1 in = 2.54 cm
	
	thou/mil/point [0.001 in]
	inch (in/") [2.54 cm] 
	foot (ft/') [12 in]
	yard (yd) [36 in]
	furlong (fur) [7920 in]
	mile (mi) [63360 in]
	
	millimeter (mm) [0.1 cm]
	decimeter (dm) [10 cm]
	centimeter (cm) [1 cm]
	meter (m) [100 cm]
	kilometer (km) [100000 cm]
	
	
	cm are decimal
	inch are fraction 1/4 11/ 3/4
	
	*/
	
	centimeterToThou: function (centimeter)
	{
		return this.centimeterToInch(centimeter) * 1000; 	
	},
	centimeterToMil: function (centimeter)
	{
		return this.centimeterToThou(centimeter); 	
	},
	centimeterToPoint: function (centimeter)
	{
		return this.centimeterToThou(centimeter); 	
	},	
	centimeterToInch: function (centimeter)
	{
		return centimeter / 2.54;
	},
	centimeterToFoot: function (centimeter)
	{
		return this.centimeterToInch(centimeter) / 12; 	
	},
	centimeterToYard: function (centimeter)
	{
		return this.centimeterToInch(centimeter) / 36; 
	},
	centimeterToFurlong: function (centimeter)
	{
		return this.centimeterToInch(centimeter) / 7920;
	},
	centimeterToMile: function (centimeter)
	{
		return this.centimeterToInch(centimeter) / 63360;
	},
	
	thouToCentimer: function (thou)
	{
		return this.inchToCentimeter(thou / 1000);
	},
	milToCentimer: function (mil)
	{
		return this.thouToCentimer(mil);
	},
	pointToCentimer: function (point)
	{
		return this.thouToCentimer(point);
	},
	inchToCentimeter: function (inch)
	{
		return inch * 2.54;
	},
	footToCentimeter: function (foot)
	{
		return this.inchToCentimeter(foot * 12);
	},
	yardToCentimeter: function (yard)
	{
		return this.inchToCentimeter(yard * 36);
	},
	furlongToCentimeter: function (furlong)
	{
		return this.inchToCentimeter(furlong * 7920);
	},
	mileToCentimeter: function (mile)
	{
		return this.inchToCentimeter(mile * 63360);
	},
	
	centimeterToMillimeter: function (centimeter)
	{
		return centimeter * 10;
	},
	centimeterToDecimeter: function (centimeter)
	{
		return centimeter / 10;
	},
	centimeterToMeter: function (centimeter)
	{
		return centimeter / 100;
	},
	centimeterToKilometer: function (centimeter)
	{
		return centimeter / 100000;
	},
	
	millimeterToCentimeter: function (millimeter)
	{
		return millimeter / 10;
	},
	decimeterToCentimeter: function (decimeter)
	{
		return decimeter * 10;
	},
	meterToCentimeter: function (meter)
	{
		return meter * 100;
	},
	kilometerToCentimeter: function (kilometer)
	{
		return kilometer * 100000;
	},
	
	////////////////////
	// Mass / Weight
	////////////////////
	
	/*
	Canonical form: kilogram
	
	pounds (Avoirdupois)
	
	1 kilogram = 2.20462262 pounds
	1 pound = 0.45359237 kilograms
		
	ounce (oz) [1/16 lb]
	pound (lb) [0.45359237 kg]
	stone (st) [14 lb]
	
	gram (g) [0.001 kg]
	
	kilogram (kg) [1 kg]
	*/	
	
	kilogramToPound: function (kilogram)
	{
		return kilogram * 2.20462262;
	},
	kilogramToOunce: function (kilogram)
	{
		return this.kilogramToPound(kilogram) * 16;
	},
	kilogramToStone: function (kilogram)
	{
		return this.kilogramToPound(kilogram) / 14;
	},
	
	poundToKilogram: function (pound)
	{
		return pound * 0.45359237;
	},
	ounceToKilogram: function (ounce)
	{
		return this.poundToKilogram(ounce / 16);
	},
	stoneToKilogram: function (stone)
	{
		return this.poundToKilogram(stone * 14);
	},
	
	kilogramToGram: function (kilogram)
	{
		return kilogram * 1000;	
	},
	
	gramToKilogram: function (gram)
	{
		return gram / 1000;	
	},
	
	////////////////////
	// Time
	////////////////////
	
	/*
	Canonical form: second
	
	second (s) [1 s]
	
	microsecond (us) [0.000.001 s]
	millisecond (ms) [0.001 s]
	minute (m) [60 s]
	hour (h) [3600 s]
	day (d) [86400 s]
	week (w) [604800 s] (7 days)
	month (m) [2678400 s] (31 days)
	quarter (q) [7948800 s] (31 + 30 + 31 = 92 days)
	year (y) [31536000 s] (365 days)
	lustrum [157680000 s] (5 years)
	decade [315360000 s] (10 years)
	century [3153600000 s] (100 years)
	millenium [31536000000 s] (1000 years)
	*/
	
	secondToMicrosecond: function (second)
	{
		return second * 1000000;
	},	
	secondToMillisecond: function (second)
	{
		return second * 1000;
	},	
	secondToMinute: function (second)
	{
		return second / 60;
	},	
	secondToHour: function (second)
	{
		return second / 3600;
	},	
	secondToDay: function (second)
	{
		return second / 86400;
	},
	secondToWeek: function (second)
	{
		return second / 604800;
	},
	secondToMonth: function (second)
	{
		return second / 2678400;
	},
	secondToQuarter: function (second)
	{
		return second / 7948800;
	},
	secondToYear: function (second)
	{
		return second / 31536000;
	},
	secondToLustrum: function (second)
	{
		return second / 157680000;
	},
	secondToDecade: function (second)
	{
		return second / 315360000;
	},
	secondToCentury: function (second)
	{
		return second / 3153600000;
	},
	secondToMillenium: function (second)
	{
		return second / 31536000000;
	},
	
	microsecondToSecond: function (microsecond)
	{
		return microsecond / 1000000;
	},
	millisecondToSecond: function (millisecond)
	{
		return millisecond / 1000;
	},
	minuteToSecond: function (minute)
	{
		return minute * 60;
	},
	hourToSecond: function (hour)
	{
		return hour * 3600;
	},
	dayToSecond: function (day)
	{
		return day * 86400;
	},
	weekToSecond: function (week)
	{
		return week * 604800;
	},
	monthToSecond: function (month)
	{
		return month * 2678400;
	},
	quarterToSecond: function (quarter)
	{
		return quarter * 7948800;
	},
	yearToSecond: function (year)
	{
		return year * 31536000;
	},
	lustrumToSecond: function (lustrum)
	{
		return lustrum * 157680000;
	},
	decadeToSecond: function (decade)
	{
		return decade * 315360000;
	},
	centuryToSecond: function (century)
	{
		return century * 3153600000;
	},
	milleniumToSecond: function (millenium)
	{
		return millenium * 31536000000;
	},
	
	////////////////////
	// Bit & Byte (Storage & Transfer)
	////////////////////
	
	/*
	Canonical form: byte
		
	kilo (k) [1000]
	mega (M) [1000000]
	giga (G) [1000000000]
	tera (T) [1000000000000]
	peta (P) [1000000000000000]
	exa (E) [1000000000000000000]
	zetta (Z) [1000000000000000000000]
	yotta (Y) [1000000000000000000000000]
	
	kibi (Ki) [1024]
	mebi (Mi) [1048576]
	gibi (Gi) [1073741824]
	tebi (Ti) [1099511627776]
	pebi (Pi) [1125899906842624]
	exbi (Ei) [1152921504606846976]
	zebi (Zi) [1180591620717411303424]
	yobi (Yi) [1208925819614629174706176]
	
	bit (b) [1]
	byte (B) [8]
	
	*/
	
	bitToKilobit: function (bit)
	{
		return bit / 1000;
	},
	bitToMegabit: function (bit)
	{
		return bit / 1000000;
	},
	bitToGigabit: function (bit)
	{
		return bit / 1000000000;
	},
	bitToTerabit: function (bit)
	{
		return bit / 1000000000000;
	},
	bitToPetabit: function (bit)
	{
		return bit / 1000000000000000;
	},
	bitToExabit: function (bit)
	{
		return bit / 1000000000000000000;
	},
	bitToZettabit: function (bit)
	{
		return bit / 1000000000000000000000;
	},
	bitToYottabit: function (bit)
	{
		return bit / 1000000000000000000000000;
	},
	
	bitToKibibit: function (bit)
	{
		return bit / 1024;
	},
	bitToMebibit: function (bit)
	{
		return bit / 1048576;
	},
	bitToGibibit: function (bit)
	{
		return bit / 1073741824;
	},
	bitToTebibit: function (bit)
	{
		return bit / 1099511627776;
	},
	bitToPebibit: function (bit)
	{
		return bit / 1125899906842624;
	},
	bitToExbibit: function (bit)
	{
		return bit / 1152921504606846976;
	},
	bitToZebibit: function (bit)
	{
		return bit / 1180591620717411303424;
	},
	bitToYobibit: function (bit)
	{
		return bit / 1208925819614629174706176;
	},
		
	kilobitToBit: function (kilobit)
	{
		return kilobit * 1000;
	},
	megabitToBit: function (megabit)
	{
		return megabit * 1000000;
	},
	gigabitToBit: function (gigabit)
	{
		return gigabit * 1000000000;
	},
	terabitToBit: function (terabit)
	{
		return terabit * 1000000000000;
	},
	petabitToBit: function (petabit)
	{
		return petabit * 1000000000000000;
	},
	exabitToBit: function (exabit)
	{
		return exabit * 1000000000000000000;
	},
	zettabitToBit: function (zettabit)
	{
		return zettabit * 1000000000000000000000;
	},
	yottabitToBit: function (yottabit)
	{
		return yottabit * 1000000000000000000000000;
	},
	
	kibibitToBit: function (kibibit)
	{
		return kibibit * 1024;
	},
	mebibitToBit: function (mebibit)
	{
		return mebibit * 1048576;
	},
	gibibitToBit: function (gibibit)
	{
		return gibibit * 1073741824;
	},
	tebibitToBit: function (tebibit)
	{
		return tebibit * 1099511627776;
	},
	pebibitToBit: function (pebibit)
	{
		return pebibit * 1125899906842624;
	},
	exbibitToBit: function (exbibit)
	{
		return exbibit * 1152921504606846976;
	},
	zebibitToBit: function (zebibit)
	{
		return zebibit * 1180591620717411303424;
	},
	yobibitToBit: function (yobibit)
	{
		return yobibit * 1208925819614629174706176;
	},
		
	//  byte is js reserved word
	byteToKilobyte: function (bytes)
	{
		return bytes / 1000;
	},
	byteToMegabyte: function (bytes)
	{
		return bytes / 1000000;
	},
	byteToGigabyte: function (bytes)
	{
		return bytes / 1000000000;
	},
	byteToTerabyte: function (bytes)
	{
		return bytes / 1000000000000;
	},
	byteToPetabyte: function (bytes)
	{
		return bytes / 1000000000000000;
	},
	byteToExabyte: function (bytes)
	{
		return bytes / 1000000000000000000;
	},
	byteToZettabyte: function (bytes)
	{
		return bytes / 1000000000000000000000;
	},
	byteToYottabyte: function (bytes)
	{
		return bytes / 1000000000000000000000000;
	},
	
	byteToKibibyte: function (bytes)
	{
		return bytes / 1024;
	},
	byteToMebibyte: function (bytes)
	{
		return bytes / 1048576;
	},
	byteToGibibyte: function (bytes)
	{
		return bytes / 1073741824;
	},
	byteToTebibyte: function (bytes)
	{
		return bytes / 1099511627776;
	},
	byteToPebibyte: function (bytes)
	{
		return bytes / 1125899906842624;
	},
	byteToExbibyte: function (bytes)
	{
		return bytes / 1152921504606846976;
	},
	byteToZebibyte: function (bytes)
	{
		return bytes / 1180591620717411303424;
	},
	byteToYobibyte: function (bytes)
	{
		return bytes / 1208925819614629174706176;
	},
	
		
	kilobyteToByte: function (kilobyte)
	{
		return kilobyte * 1000;
	},
	megabyteToByte: function (megabyte)
	{
		return megabyte * 1000000;
	},
	gigabyteToByte: function (gigabyte)
	{
		return gigabyte * 1000000000;
	},
	terabyteToByte: function (terabyte)
	{
		return terabyte * 1000000000000;
	},
	petabyteToByte: function (petabyte)
	{
		return petabyte * 1000000000000000;
	},
	exabyteToByte: function (exabyte)
	{
		return exabyte * 1000000000000000000;
	},
	zettabyteToByte: function (zettabyte)
	{
		return zettabyte * 1000000000000000000000;
	},
	yottabyteToByte: function (yottabyte)
	{
		return yottabyte * 1000000000000000000000000;
	},
	
	kibibyteToByte: function (kibibyte)
	{
		return kibibyte * 1024;
	},
	mebibyteToByte: function (mebibyte)
	{
		return mebibyte * 1048576;
	},
	gibibyteToByte: function (gibibyte)
	{
		return gibibyte * 1073741824;
	},
	tebibyteToByte: function (tebibyte)
	{
		return tebibyte * 1099511627776;
	},
	pebibyteToByte: function (pebibyte)
	{
		return pebibyte * 1125899906842624;
	},
	exbibyteToByte: function (exbibyte)
	{
		return exbibyte * 1152921504606846976;
	},
	zebibyteToByte: function (zebibyte)
	{
		return zebibyte * 1180591620717411303424;
	},
	yobibyteToByte: function (yobibyte)
	{
		return yobibyte * 1208925819614629174706176;
	},
	
	
	
	bitToByte: function (bit)
	{
		return bit / 8;
	},
	
	byteToBit: function (bytes)
	{
		return bytes * 8;
	},
		
	////////////////////
	// Currency
	////////////////////
	
	/*
	Canonical form: credit
	
	credit (cr) [1 cr]
	
	euro (eur) [1000 cr]
	*/
	
	creditToEuro: function (credit)
	{
		return credit / 1000;
	},
	creditToCurrency: function (credit, currency_code)
	{
		if (!currency_code)
		{
			currency_code = XXX_I18n_Localization.get('currency', 'currency_code');
		}
		
		return this.creditToEuro(credit) * XXX_I18n_Currency.get(currency_code);
	},
	
	euroToCredit: function (euro)
	{
		return euro * 1000;
	},
	currencyToCredit: function (currency, currency_code)
	{
		if (!currency_code)
		{
			currency_code = XXX_I18n_Localization.get('currency', 'currency_code');
		}
		
		return this.euroToCredit(currency / XXX_I18n_Currency.get(currency_code));
	},
	
	////////////////////
	// Temperature
	////////////////////
	
	/*
	Canonical form: celsius
	
	celsius (C) [1 c]
	
	fahrenheit (F)
	kelvin (K)
	*/
		
	celsiusToFahrenheit: function (celsius)
	{
		return (212 - 32) / 100 * celsius + 32;
	},
	celsiusToKelvin: function (celsius)
	{
		return celsius + 273;
	},
	
	fahrenheitToCelsius: function (fahrenheit)
	{
		return 100 / (212 - 32) * (fahrenheit - 32);
	},
	kelvinToCelsius: function (kelvin)
	{
		return kelvin - 273;
	},
		
	////////////////////
	// Coordinates
	////////////////////
		
	degreeCoordinateToDegreeMinuteSecondCoordinate: function (degreeCoordinate)
	{
		var result =
		{
			degree: 0,
			minute: 0,
			second: 0
		};
		
		var isPositive = degreeCoordinate >= 0;
		
		degreeCoordinate = XXX_Math.absolute(degreeCoordinate);
		
		result.degree = XXX_Number.floor(degreeCoordinate);
		
		degreeCoordinate -= result.degree;
		degreeCoordinate *= 60;		
		result.minute = XXX_Number.floor(degreeCoordinate);
		
		degreeCoordinate -= result.minute;		
		degreeCoordinate *= 60;		
		result.second = degreeCoordinate;
		
		if (!isPositive)
		{
			result.degree *= -1;
		}
		
		return result;
	},
	
	degreeCoordinateToDegreeMinuteCoordinate: function (degreeCoordinate)
	{
		var result =
		{
			degree: 0,
			minute: 0
		};
		
		var isPositive = degreeCoordinate >= 0;
		
		degreeCoordinate = XXX_Math.absolute(degreeCoordinate);
		
		result.degree = XXX_Number.floor(degreeCoordinate);
				
		degreeCoordinate -= result.degree;
		degreeCoordinate *= 60;
		result.minute = degreeCoordinate;
		
		if (!isPositive)
		{
			result.degree *= -1;
		}
		
		return result;
	},
	
	degreeMinuteSecondCoordinateToDegreeCoordinate: function (degreeMinuteSecondCoordinate)
	{
		var result = degreeMinuteSecondCoordinate.degree;
		
		degreeMinuteSecondCoordinate.minute += degreeMinuteSecondCoordinate.second / 60;
		
		if (result >= 0)
		{
			result += degreeMinuteSecondCoordinate.minute / 60;
		}
		else
		{
			result -= degreeMinuteSecondCoordinate.minute / 60;
		}
		
		return result;
	},
	
	degreeMinuteCoordinateToDegreeCoordinate: function (degreeMinuteCoordinate)
	{
		result = degreeMinuteSecondCoordinate.degree;
				
		if (result >= 0)
		{
			result += degreeMinuteSecondCoordinate.minute / 60;
		}
		else
		{
			result -= degreeMinuteSecondCoordinate.minute / 60;
		}
		
		return result;
	},
	
	////////////////////
	// Decimal / Fraction
	////////////////////
	
	decimalToFraction: function (decimal, allowedDenominators)
	{
		var result = false;
		
		if (!XXX_Type.isArray(allowedDenominators))
		{
			allowedDenominators = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
		}
		
		allowedDenominatorsTotal = XXX_Array.getFirstLevelItemTotal(allowedDenominators);
		
		if (allowedDenominatorsTotal)
		{
			var maximumDelta = 1 / allowedDenominators[allowedDenominatorsTotal - 1];
			
			for (var i = 0, iEnd = allowedDenominatorsTotal; i < iEnd; ++i)
			{
				var allowedDenominator = allowedDenominators[i];
				
				var allowedNumeratorDecimal = 1 / allowedDenominator;
				
				var closestNumeratorDecimalFloor = XXX_Number.floor(decimal / allowedNumeratorDecimal) * allowedNumeratorDecimal;
				var closestNumeratorDecimalCeil = XXX_Number.ceil(decimal / allowedNumeratorDecimal) * allowedNumeratorDecimal;
				
				var floorDelta = decimal - closestNumeratorDecimalFloor;
				var ceilDelta = closestNumeratorDecimalCeil- decimal;
				
				var floorNumerator = closestNumeratorDecimalFloor / allowedNumeratorDecimal;
				var ceilNumerator = closestNumeratorDecimalCeil / allowedNumeratorDecimal;
				
				if (floorDelta <= ceilDelta)
				{
					if (floorDelta <= maximumDelta)
					{
						result =
						{
							numerator: floorNumerator,
							denominator: allowedDenominator
						};	
						
						break;
					}
					else if (ceilDelta <= maximumDelta)
					{
						result =
						{
							numerator: ceilNumerator,
							denominator: allowedDenominator
						};
						
						break;
					}
				}
				else
				{
					if (ceilDelta <= maximumDelta)
					{
						result =
						{
							numerator: ceilNumerator,
							denominator: allowedDenominator
						};
						
						break;
					}
					else if (floorDelta <= maximumDelta)
					{
						result =
						{
							numerator: floorNumerator,
							denominator: allowedDenominator
						};	
						
						break;
					}
				}
			}
		}
		
		return result;
	},
	
	fractionToDecimal: function (fraction)
	{
		return (1 / fraction.denominator) * fraction.numerator;
	},
	
	////////////////////
	// Angle
	////////////////////
	
	angleToHour: function (angle, minute)
	{
		angle -= ((minute / 60) * 30);
	
		if (angle < 0)
		{
			angle += 360;
		}
		else if (angle > 360)
		{
			angle -= 360;
		}
		
		var hour = XXX_Number.ceil((angle / 360) * 12);
		
		hour %= 12;
		
		return hour;
	},
	
	angleToMinute: function (angle)
	{
		var minute = XXX_Number.ceil((angle / 360) * 60);
		
		minute %= 60;
		
		return minute;
	},
	
	hourToAngle: function (hour, minute)
	{
		var hour = (XXX_Math.pi() * hour / 6 + XXX_Math.pi() * minute / 360 - (XXX_Math.pi() / 2));
	
		if (hour < 0)
		{
			hour = 180 + (180 - (((hour / XXX_Math.pi()) * 180) * -1));
		}
		else
		{
			hour = (hour / XXX_Math.pi()) * 180;
		}
		
		hour += 90;
		
		hour %= 360;
		
		return hour;
	},
	
	minuteToAngle: function (minute)
	{
		var minute = (XXX_Math.pi() * minute / 30 - (XXX_Math.pi() / 2));
		
		if (minute < 0)
		{
			minute = 180 + (180 - (((minute / XXX_Math.pi()) * 180) * -1));
		}
		else
		{
			minute = (minute / XXX_Math.pi()) * 180;
		}
		
		minute += 90;
		
		minute %= 360;
		
		return minute;
	}
	
};




