
/*

- ordinals

// TODO make the JS methods speed up optimized by generating only the necessary with php		

- byFormat, multiple variables per format as in monthPadded and monthNumber	
- Consecutive units, for example timeSpan, byteSize, 	
- Biggest unit

- Format string with variables:
- Consecutive units
- Biggest unit

*/

var XXX_I18n_Formatter =
{	
	formatNumber2: function (value, minimum, maximum, step, decimals)
	{
		if (XXX_Type.isNumber(maximum))
		{
			if (value > maximum)
			{
				value = maximum;
			}
		}
		if (XXX_Type.isNumber(minimum))
		{
			if (value < minimum)
			{
				value = minimum;
			}
		}
		
		if (XXX_Type.isNumber(step))
		{
			valueRemainder = value % step;
			if (decimals > 0)
			{
				valueRemainder = XXX_Number.round(valueRemainder, decimals);
			}
			
			if (valueRemainder == step)
			{
				valueRemainder = 0;
			}
			
			if (decimals > 0)
			{
				if (valueRemainder / step > 0.5)
				{
					value += step - valueRemainder;
				}
				else
				{
					value -= valueRemainder;
				}
					
				value = XXX_Number.round(value, decimals);
			}
			else
			{
				value -= valueRemainder;
			}
			
			if (value < minimum)
			{
				value = minimum;
			}
		}
		
		if (XXX_Type.isPositiveInteger(decimals) && decimals > 0)
		{
			value = XXX_Number.round(value, decimals);
			
			if (decimals > 0)
			{
				var tempValue = XXX_Type.makeString(value);
				var tempValueParts = XXX_String.splitToArray(tempValue, '.');
				
				var digits = tempValueParts[0];
				
				var decimals = '';
				
				if (XXX_Type.isValue(tempValueParts[1]))
				{
					decimals = tempValueParts[1];
				}
				
				decimals = XXX_String.padRight(decimals, '0', 2);
				
				value = digits + '.' + decimals;
			}
		}
		
		return value;
	},
	
	// Integer
	formatInteger: function (integer, settings)
	{				  
		settings = !XXX_Type.isArray(settings) ? XXX_I18n_Localization.get('number', 'integer') : XXX_Array.merge(XXX_I18n_Localization.get('number', 'integer'), settings);
		
		if (settings.zeroPadding)
		{
			integer = XXX_String.padLeft(integer, '0', settings.zeroPadding);
		}
		
		var integerLength = XXX_String.getCharacterLength(integer);
		
		// Digit grouping
		if (integerLength && (settings.grouping > 0 || XXX_Type.isArray(settings.grouping)))
		{
			var integerGroups = [];			
			var i, iEnd, offset, length, j = 0;
			
			if (XXX_Type.isPositiveInteger(settings.grouping))
			{
				for (i = 0, iEnd = integerLength; i < iEnd; i += settings.grouping)
				{
					offset = i + settings.grouping;
					length = settings.grouping;
					
					if (offset > iEnd)
					{
						length -= offset - iEnd;						
						offset = iEnd;
					}
					
					integerGroups.push(XXX_String.getPart(integer, -offset, length));
				}
			}
			else if (XXX_Type.isArray(settings.grouping))
			{
				for (i = 0, iEnd = XXX_Array.getFirstLevelItemTotal(settings.grouping); i < iEnd; ++i)
				{
					offset = j + settings.grouping[i];
					length = settings.grouping[i];
					
					if (offset > integerLength)
					{
						length -= offset - integerLength;						
						offset = integerLength;
					}
					
					integerGroups.push(XXX_String.getPart(integer, -offset, length));
					
					j += settings.grouping[i];
					
					if (j >= integerLength)
					{
						break;
					}
				}
				
				if (j < integerLength)
				{
					offset = integerLength;
					length = integerLength - j;
					
					integerGroups.push(XXX_String.getPart(integer, -offset, length));
				}
			}
				
			integerGroups = XXX_Array.reverse(integerGroups);			
			integer = XXX_Array.joinValuesToString(integerGroups, settings.groupingSymbol);
		}
		
		return integer;
	},
	
	// Decimal as integer
	formatDecimal: function (decimal, settings)
	{
		settings = !XXX_Type.isArray(settings) ? XXX_I18n_Localization.get('number', 'decimal') : XXX_Array.merge(XXX_I18n_Localization.get('number', 'decimal'), settings);
		
		if (settings.decimalHandling == 'fraction')
		{
			var fraction = XXX_I18n_UnitConverter.decimalToFraction(XXX_Type.makeFloat('0.' + decimal), settings.fractionDenominators);
			
			decimal = XXX_String.replace(XXX_I18n_Localization.get('number', 'formats', 'fraction'), ['%numerator%', '%denominator%'], [fraction.numerator, fraction.denominator]);
		}
		else if (settings.decimalHandling === 0)
		{
			decimal = '';
		}
		else if (settings.decimalHandling > 0)
		{
			if (XXX_String.getCharacterLength(decimal) > settings.decimalHandling)
			{
				decimal = XXX_String.getPart(decimal, 0, settings.decimalHandling);
			}
			else
			{
				decimal = XXX_String.padRight(decimal, '0', settings.decimalHandling);
			}
			
			decimal = settings.decimalSymbol + decimal;
		}
		
		return decimal;
	},
	
	// Number
	formatNumber: function (number, settings)
	{
		settings = !XXX_Type.isArray(settings) ? XXX_I18n_Localization.get('number') : XXX_Array.merge(XXX_I18n_Localization.get('number'), settings);
		
		var result = '';
				
		number = XXX_Type.makeNumber(number);
		
		var isPositive = number >= 0;
		var isZero = XXX_Number.round(number) === 0;
						
		number = XXX_Number.absolute(number);		
		number = XXX_Type.makeString(number);
						
		// Digit splitting and digits after decimal symbol detection
		var parts = XXX_String.splitToArray(number, '.');
		
		var integer, decimal = '';
		
		integer = this.formatInteger(parts[0], settings.integer);
			
		if (XXX_Array.getFirstLevelItemTotal(parts) === 2)
		{
			decimal = this.formatDecimal(parts[1], settings.decimal);
		}
		
		number = (isZero && settings.decimal.decimalHandling == 'fraction') ? decimal : integer + decimal;	
		
		result = XXX_String.replace(settings.formats[isPositive ? 'positive' : 'negative'], ['%number%'], [number]);		
		result = this.cleanFormat(result);
		
		return result;
	},	
	
	formatNumberRounded: function (number)
	{
		return this.formatNumber(number, {decimal: {decimalHandling: 0}});
	},
	
	formatNumberWithDecimals: function (number, decimals)
	{
		return this.formatNumber(number, {decimal: {decimalHandling: decimals}});
	},
	
	formatNumberWithFraction: function (number)
	{
		return this.formatNumber(number, {decimal: {decimalHandling: 'fraction'}});
	},
	
	// Amount in credits
	formatCurrency: function (amount, settings)
	{
		settings = !XXX_Type.isArray(settings) ? XXX_I18n_Localization.get('currency') : XXX_Array.merge(XXX_I18n_Localization.get('currency'), settings);
		
		var result = '';
		
		amount = XXX_Type.makeNumber(amount);
		
		amount = XXX_I18n_UnitConverter.creditToCurrency(amount, settings.currency_code);	
		
		amount = this.formatNumber(amount, settings.number);
		
		var identifier = '';
		
		for (var i = 0, iEnd = XXX_Array.getFirstLevelItemTotal(XXX_I18n_Translation.get('currency', 'currencies')); i < iEnd; ++i)
		{
			var currency = XXX_I18n_Translation.get('currency', 'currencies')[i];
			
			if (currency.code == settings.currency_code)
			{
				identifier = currency[settings.identifierType];
				break;
			}
		}
		
		result = XXX_String.replace(settings.formats.currency, ['%amount%', '%identifier%'], [amount, identifier]);		
		result = this.cleanFormat(result);
		
		return result;
	},
				
	// UNIX time stamp (UTC)
	formatDate: function (timestamp, format, global, settings)
	{
		format = XXX_Default.toOption(format, ['short', 'long', 'picker'], 'short');
		
		settings = !XXX_Type.isArray(settings) ? XXX_I18n_Localization.get('dateTime') : XXX_Array.merge(XXX_I18n_Localization.get('dateTime'), settings);
				
		var result = '';
		
		format = settings.formats['date' + XXX_String.capitalize(format)];
		
		if (format)
		{	
			var tempTimestamp = new XXX_Timestamp(timestamp);
			
			if (!global)
			{
				tempTimestamp.makeLocal();
			}
			
			var parts = tempTimestamp.parse(true);			
							
			var year = parts.year;
			var yearShort = XXX_String.getPart(year, -2, 2);
			var yearShortPadded = XXX_String.padLeft(yearShort, '0', 2);
			
			
			var month = parts.month;
			var monthPadded = XXX_String.padLeft(month, '0', 2);
			var monthName = XXX_I18n_Translation.get('dateTime', 'months', 'names')[month - 1];
			var monthAbbreviation = XXX_I18n_Translation.get('dateTime', 'months', 'abbreviations')[month - 1];
			
			
			var date = parts.date;
			var datePadded = XXX_String.padLeft(date, '0', 2);
			
			var dayOfTheWeek = parts.dayOfTheWeek;
			var dayOfTheWeekPadded = XXX_String.padLeft(dayOfTheWeek, '0', 2);
			var dayOfTheWeekName = XXX_I18n_Translation.get('dateTime', 'daysOfTheWeek', 'names')[dayOfTheWeek - 1];
			var dayOfTheWeekAbbreviation = XXX_I18n_Translation.get('dateTime', 'daysOfTheWeek', 'abbreviations')[dayOfTheWeek - 1];
					
			var weekOfTheYear = parts.weekOfTheYear;
			var weekOfTheYearPadded = XXX_String.padLeft(weekOfTheYear, '0', 2);
			
			result = XXX_String.replace(format, ['%year%', '%yearShort%', '%yearShortPadded%', '%month%', '%monthPadded%', '%monthName%', '%monthAbbreviation%', '%date%', '%datePadded%', '%dayOfTheWeekName%', '%dayOfTheWeekAbbreviation%', '%weekOfTheYear%', '%weekOfTheYearPadded%'], [year, yearShort, yearShortPadded, month, monthPadded, monthName, monthAbbreviation, date, datePadded, dayOfTheWeekName, dayOfTheWeekAbbreviation, weekOfTheYear, weekOfTheYearPadded]);
			result = this.cleanFormat(result);
		}
				
		return result;
	},
	
	////////////////////
	// RFC 2965
	////////////////////
	
	formatRFC2965: function (timestamp)
	{
		var tempDate = new Date();
		tempDate.setTime(timestamp * 1000);
		
		var result = '';
		
		// TODO not fully correct
		result += date.toUTCString();
		
		return result;
	},
	
	// UNIX time stamp (UTC)
	formatTime: function (timestamp, format, global, settings)
	{
		format = XXX_Default.toOption(format, ['short', 'long', 'picker'], 'short');
		
		settings = !XXX_Type.isArray(settings) ? XXX_I18n_Localization.get('dateTime') : XXX_Array.merge(XXX_I18n_Localization.get('dateTime'), settings);
		
		var result = '';
		
		format = settings.formats['time' + XXX_String.capitalize(format)];
		
		if (format)
		{
			var originalTimestamp = timestamp;
			
			var tempTimestamp = new XXX_Timestamp(timestamp);
			
			if (!global)
			{
				tempTimestamp.makeLocal();
			}
			
			var parts = tempTimestamp.parse();
			
			var hour = parts.hour;
			var hourPadded = XXX_String.padLeft(hour, '0', 2);
			var hourShort = parts.hourShort;
			var hourShortPadded = XXX_String.padLeft(hourShort, '0', 2);
			var meridiem = parts.meridiem;
			
			var minute = parts.minute;
			var minutePadded = XXX_String.padLeft(minute, '0', 2);
			
			var second = parts.second;
			var secondPadded = XXX_String.padLeft(second, '0', 2);
			
			var meridiemName = XXX_I18n_Translation.get('dateTime', 'meridiems', 'names')[(meridiem == 'am' ? 0 : 1)];
			var meridiemAbbreviation = XXX_I18n_Translation.get('dateTime', 'meridiems', 'abbreviations')[(meridiem == 'am' ? 0 : 1)];
			
			var isDaylightSavingTime = timestamp.daylightSavingTime;
			
			var daylightSavingTimeName = isDaylightSavingTime ? XXX_I18n_Translation.get('dateTime', 'daylightSavingTime', 'name') : '';
			var daylightSavingTimeAbbreviation = isDaylightSavingTime ? XXX_I18n_Translation.get('dateTime', 'daylightSavingTime', 'abbreviation') : '';
			
			result = XXX_String.replace(format, ['%hour%', '%hourPadded%', '%hourShort%', '%hourShortPadded%', '%minute%', '%minutePadded%', '%second%', '%secondPadded%', '%meridiemName%', '%meridiemAbbreviation%', '%daylightSavingTimeName%', '%daylightSavingTimeAbbreviation%', '%timestamp%'], [hour, hourPadded, hourShort, hourShortPadded, minute, minutePadded, second, secondPadded, meridiemName, meridiemAbbreviation, daylightSavingTimeName, daylightSavingTimeAbbreviation, originalTimestamp]);
			result = this.cleanFormat(result);
		}
				
		return result;
	},
	
	// time span in seconds
	formatTimeSpan: function (timeSpan, formatOptions, settings)
	{
		settings = !XXX_Type.isArray(settings) ? XXX_I18n_Localization.get('timeSpan') : XXX_Array.merge(XXX_I18n_Localization.get('timeSpan'), settings);
		
		if (!XXX_Type.isPositiveInteger(formatOptions))
		{
			formatOptions = settings.formatOptions;
		}
		
		var result = [];
		
		var details = [];
		
		var possibleDetails = {microsecond: 1, millisecond: 2, second: 4, minute: 8, hour: 16, day: 32, week: 64, month: 128, quarter: 256, year: 512, lustrum: 1024, decade: 2048, century: 4096, millenium: 8192};
			
		for (var possibleDetail in possibleDetails)
		{
			var option = possibleDetails[possibleDetail];
			
			if ((option & formatOptions) == option)
			{
				details.push(possibleDetail);
			}
		}
		
		details = XXX_Array.reverse(details);
		
		var tempQuantity = 0;
		
		var remainingSeconds = timeSpan;
		
		for (var i = 0, iEnd = XXX_Array.getFirstLevelItemTotal(details); i < iEnd; ++i)
		{			
			var secondsInTempQuantity = 1;
			
			if (details[i] !== 'second')
			{
				secondsInTempQuantity = XXX_I18n_UnitConverter[details[i] + 'ToSecond'](1);
			}
			
			tempQuantity = 0;
									
			if (remainingSeconds > 0 && remainingSeconds >= secondsInTempQuantity)
			{
				tempQuantity = remainingSeconds;								
				tempQuantity /= secondsInTempQuantity;
				tempQuantity = XXX_Number.floor(tempQuantity);
												
				remainingSeconds -= (tempQuantity * secondsInTempQuantity);
			}
			
			var tempUnit = '';
			
			if (XXX_I18n_Localization.get('timeSpan', 'identifierType') == 'name')
			{
				tempUnit = XXX_I18n_Translation.composeGrammaticalNumberForm(XXX_I18n_Translation.get('dateTime', details[i], settings.identifierType), tempQuantity);
			}
			else
			{
				tempUnit = XXX_I18n_Translation.get('dateTime', details[i], settings.identifierType);
			}
			
			if (!(settings.omitEmptyUnit && tempQuantity === 0))
			{
				result.push(XXX_String.replace(settings.formats.timeSpan, ['%quantity%', '%unit%'], [tempQuantity, tempUnit]));
			}
		}
		
		if (settings.reverseOrder)
		{
			result = XXX_Array.reverse(result);
		}
		
		result = XXX_I18n_Translation.composeSequence(result);		
		result = this.cleanFormat(result);
		
		return result;
	},
		
	formatIndicativeTimeSpan: function (timeSpan, settings)
	{
		var possibleQuantities = [['second', 4], ['minute', 8], ['hour', 16], ['day', 32], ['week', 64], ['month', 128], ['year', 512]];
				
		var formatOptions = 0;
				
		for (var i = 0, iEnd = XXX_Array.getFirstLevelItemTotal(possibleQuantities); i < iEnd; ++i)
		{
			var possibleQuantity = possibleQuantities[i][0];
			
			var secondsInPossibleQuantity = 1;
			
			if (possibleQuantity !== 'second')
			{
				secondsInPossibleQuantity = XXX_I18n_UnitConverter[possibleQuantity + 'ToSecond'](1);
			}
			
			if (secondsInPossibleQuantity > timeSpan)
			{
				if (i > 0)
				{					
					formatOptions += possibleQuantities[i - 1][1];
										
					if (i > 1)
					{
						formatOptions += possibleQuantities[i - 2][1];
					}
				}
				break;
			}
			else if (i == iEnd - 1)
			{
				formatOptions += possibleQuantities[i][1];
										
				if (i > 0)
				{
					formatOptions += possibleQuantities[i - 1][1];
				}
			}
		}
				
		var result = this.formatTimeSpan(timeSpan, formatOptions, settings);
		
		return result;
	},
	
	// byte size
	formatBitAndByteSize: function (byteSize, type, settings)
	{
		settings = !XXX_Type.isArray(settings) ? XXX_I18n_Localization.get('bitAndByteSize') : XXX_Array.merge(XXX_I18n_Localization.get('bitAndByteSize'), settings);
		
		type = XXX_Default.toOption(type, ['storage', 'transfer'], 'storage');
		
		var quantifierType = settings[type].quantifierType;		
		var identifierType = settings[type].identifierType;
		
		var system = settings[type].system;
				
		if (system == 'bit')
		{
			byteSize = XXX_I18n_UnitConverter.byteToBit(byteSize);
		}
		
		var result = '';
		
		// Find the first unit that is not bigger
		var quantifier = 'none';
		var possibleQuantifiers = [];
		
		if (quantifierType == 'decimal')
		{
			possibleQuantifiers = [['none', 1], ['kilo', XXX_I18n_UnitConverter.kilobyteToByte(1)], ['mega', XXX_I18n_UnitConverter.megabyteToByte(1)], ['giga', XXX_I18n_UnitConverter.gigabyteToByte(1)], ['tera', XXX_I18n_UnitConverter.terabyteToByte(1)], ['peta', XXX_I18n_UnitConverter.petabyteToByte(1)], ['exa', XXX_I18n_UnitConverter.exabyteToByte(1)], ['zetta', XXX_I18n_UnitConverter.zettabyteToByte(1)], ['yotta', XXX_I18n_UnitConverter.yottabyteToByte(1)]];
		}
		else if (quantifierType == 'binary')
		{
			possibleQuantifiers = [['none', 1], ['kibi', XXX_I18n_UnitConverter.kibibyteToByte(1)], ['mebi', XXX_I18n_UnitConverter.mebibyteToByte(1)], ['gibi', XXX_I18n_UnitConverter.gibibyteToByte(1)], ['tebi', XXX_I18n_UnitConverter.tebibyteToByte(1)], ['pebi', XXX_I18n_UnitConverter.pebibyteToByte(1)], ['exbi', XXX_I18n_UnitConverter.exbibyteToByte(1)], ['zebi', XXX_I18n_UnitConverter.zebibyteToByte(1)], ['yobi', XXX_I18n_UnitConverter.yobibyteToByte(1)]];
		}
		
		if (byteSize > 0)
		{		
			for (var i = 0, iEnd = XXX_Array.getFirstLevelItemTotal(possibleQuantifiers); i < iEnd; ++i)
			{
				var possibleQuantity = possibleQuantifiers[i][1];
				
				if (byteSize < possibleQuantity)
				{
					quantifier = possibleQuantifiers[i - 1][0];				
					break;
				}
				else if (i == iEnd - 1)
				{
					quantifier = possibleQuantifiers[i][0];
				}
			}
		}
		
		if (quantifier != 'none')
		{
			byteSize = XXX_I18n_UnitConverter['byteTo' + XXX_String.capitalize(quantifier) + 'byte'](byteSize);	
			
			byteSize = this.formatNumber(byteSize);
		}
		
		var quantity = byteSize;
		var tempQuantifier = '';
		
		if (quantifier != 'none')
		{
			tempQuantifier += XXX_I18n_Translation.get('bitAndByteSize', quantifier, identifierType);
		}
		
		tempQuantifier += XXX_I18n_Translation.get('bitAndByteSize', system, identifierType);
		
		result = XXX_String.replace(settings[type].format, ['%quantity%', '%unit%'], [quantity, tempQuantifier]);
		
		result = this.cleanFormat(result);
		
		return result;
	},
	
	// byte size
	formatDataStorage: function (byteSize)
	{
		return this.formatBitAndByteSize(byteSize, 'storage');
	},
	
	// byte size
	formatDataTransfer: function (byteSize)
	{
		return this.formatBitAndByteSize(byteSize, 'transfer');
	},
		
	// body weight in kilogram
	formatBodyWeight: function (bodyWeight, settings)
	{
		settings = !XXX_Type.isArray(settings) ? XXX_I18n_Localization.get('bodyWeight') : XXX_Array.merge(XXX_I18n_Localization.get('bodyWeight'), settings);
		
		var result = '';
		
		switch (settings.system)
		{
			case 'pound':
				var pound = XXX_I18n_UnitConverter.kilogramToPound(bodyWeight);				
				var poundPadded = this.formatNumber(pound, XXX_Array.merge(settings.number, {integer: {zeroPadding: 2}}));			
				var poundIdentifier = XXX_I18n_Translation.get('bodyWeight', 'pound', settings.identifierType);
								
				pound = this.formatNumber(pound, settings.number);
				
				result = XXX_String.replace(settings.formats.pound, ['%pound%', '%poundPadded%', '%poundIdentifier%'], [pound, poundPadded, poundIdentifier]);				
				break;
			case 'stone':
				var stone = XXX_Number.floor(XXX_I18n_UnitConverter.kilogramToStone(bodyWeight));				
				var stonePadded = XXX_String.padLeft(stone, '0', 2);				
				var stoneIdentifier = XXX_I18n_Translation.get('bodyWeight', 'stone', settings.identifierType);
								
				var pound = XXX_I18n_UnitConverter.kilogramToPound(bodyWeight - XXX_I18n_UnitConverter.stoneToKilogram(stone));				
				var poundPadded = this.formatNumber(pound, XXX_Array.merge(settings.number, {integer: {zeroPadding: 2}}));
				var poundIdentifier = XXX_I18n_Translation.get('bodyWeight', 'pound', settings.identifierType);
				
				if (settings.omitEmptyUnit && stone == 0)
				{
					stone = '';
					stonePadded = '';
					stoneIdentifier = '';
				}
				
				if (settings.omitEmptyUnit && stone > 0 && pound == 0)
				{
					pound = '';
					poundPadded = '';
					poundIdentifier = '';
				}
				
				pound = this.formatNumber(pound, settings.number);
				
				result = XXX_String.replace(settings.formats.stone, ['%stone%', '%stonePadded%', '%stoneIdentifier%', '%pound%', '%poundPadded%', '%poundIdentifier%'], [stone, stonePadded, stoneIdentifier, pound, poundPadded, poundIdentifier]);				
				break;
			case 'kilogram':
				var kilogram = bodyWeight;				
				var kilogramPadded = this.formatNumber(kilogram, XXX_Array.merge(settings.number, {integer: {zeroPadding: 2}}));				
				var kilogramIdentifier = XXX_I18n_Translation.get('bodyWeight', 'kilogram', settings.identifierType);
				
				kilogram = this.formatNumber(kilogram, settings.number);
				
				result = XXX_String.replace(settings.formats.kilogram, ['%kilogram%', '%kilogramPadded%', '%kilogramIdentifier%'], [kilogram, kilogramPadded, kilogramIdentifier]);				
				break;
		}
		
		result = this.cleanFormat(result);
		
		return result;
	},
	
	// body length in centimeters
	formatBodyLength: function (bodyLength, format, settings)
	{
		settings = !XXX_Type.isArray(settings) ? XXX_I18n_Localization.get('bodyLength') : XXX_Array.merge(XXX_I18n_Localization.get('bodyLength'), settings);
		
		format = XXX_Default.toOption(format, ['short', 'long'], 'short');
		
		var isShort = format == 'short';
		
		var result = '';
		
		switch (settings.system)
		{
			case 'inch':
				format = settings.formats['inch' + XXX_String.capitalize(format)];
				
				if (isShort)
				{
					var inch = XXX_Number.floor(XXX_I18n_UnitConverter.centimeterToInch(bodyLength));
					var inchPadded = this.formatNumber(inch, XXX_Array.merge(settings.number, {integer: {zeroPadding: 2}}));
					var inchIdentifier = XXX_I18n_Translation.get('bodyLength', 'inch', settings.identifierType);
					
					inch = this.formatNumber(inch, settings.number);
					
					result = XXX_String.replace(format, ['%inch%', '%inchPadded%', '%inchIdentifier%'], [inch, inchPadded, inchIdentifier]);
				}
				else
				{
					var foot = XXX_Number.floor(XXX_I18n_UnitConverter.centimeterToFoot(bodyLength));					
					var footPadded = XXX_String.padLeft(foot, '0', 2);
					var footIdentifier = XXX_I18n_Translation.get('bodyLength', 'foot', settings.identifierType);
					
					var inch = XXX_I18n_UnitConverter.centimeterToInch(bodyLength - XXX_I18n_UnitConverter.footToCentimeter(foot));
					var inchPadded = this.formatNumber(inch, XXX_Array.merge(settings.number, {integer: {zeroPadding: 2}}));
					var inchIdentifier = XXX_I18n_Translation.get('bodyLength', 'inch', settings.identifierType);
					
					if (settings.omitEmptyUnit && foot == 0)
					{
						foot = '';
						footPadded = '';
						footIdentifier = '';
					}
					
					if (settings.omitEmptyUnit && foot > 0 && inch == 0)
					{
						inch = '';
						inchPadded = '';
						inchIdentifier = '';
					}
					
					inch = this.formatNumber(inch, settings.number);
					
					result = XXX_String.replace(format, ['%foot%', '%footPadded%', '%footIdentifier%', '%inch%', '%inchPadded%', '%inchIdentifier%'], [foot, footPadded, footIdentifier, inch, inchPadded, inchIdentifier]);
				}				
				break;
			case 'centimeter':
				format = settings.formats['centimeter' + XXX_String.capitalize(format)];
				
				if (isShort)
				{
					var centimeter = XXX_Number.floor(bodyLength);
					var centimeterPadded = this.formatNumber(centimeter, XXX_Array.merge(settings.number, {integer: {zeroPadding: 2}}));
					var centimeterIdentifier = XXX_I18n_Translation.get('bodyLength', 'centimeter', settings.identifierType);
					
					centimeter = this.formatNumber(centimeter, settings.number);
					
					result = XXX_String.replace(format, ['%centimeter%', '%centimeterPadded%', '%centimeterIdentifier%'], [centimeter, centimeterPadded, centimeterIdentifier]);
				}
				else
				{
					var meter = XXX_Number.floor(XXX_I18n_UnitConverter.centimeterToMeter(bodyLength));
					var meterPadded = XXX_String.padLeft(meter, '0', 2);
					var meterIdentifier = XXX_I18n_Translation.get('bodyLength', 'meter', settings.identifierType);
										
					var centimeter = bodyLength - XXX_I18n_UnitConverter.meterToCentimeter(meter);
					var centimeterPadded = this.formatNumber(centimeter, XXX_Array.merge(settings.number, {integer: {zeroPadding: 2}}));
					var centimeterIdentifier = XXX_I18n_Translation.get('bodyLength', 'centimeter', settings.identifierType);
										
					if (settings.omitEmptyUnit && meter == 0)
					{
						meter = '';
						meterPadded = '';
						meterIdentifier = '';
					}
					
					if (settings.omitEmptyUnit && meter > 0 && centimeter == 0)
					{
						centimeter = '';
						centimeterPadded = '';
						centimeterIdentifier = '';
					}
					
					centimeter = this.formatNumber(centimeter, settings.number);
					
					result = XXX_String.replace(format, ['%meter%', '%meterPadded%', '%meterIdentifier%', '%centimeter%', '%centimeterPadded%', '%centimeterIdentifier%'], [meter, meterPadded, meterIdentifier, centimeter, centimeterPadded, centimeterIdentifier]);
				}				
				break;
		}
		
		result = this.cleanFormat(result);
		
		return result;
	},
	
	formatShortBodyLength: function (bodyLength, settings)
	{
		return this.formatBodyLength(bodyLength, 'short', settings);
	},
	
	formatLongBodyLength: function (bodyLength, settings)
	{
		return this.formatBodyLength(bodyLength, 'long', settings);
	},
	
	// distance in kilometers
	formatDistance: function (distance, settings)
	{
		settings = !XXX_Type.isArray(settings) ? XXX_I18n_Localization.get('distance') : XXX_Array.merge(XXX_I18n_Localization.get('distance'), settings);
		
		var result = '';
		
		switch (settings.system)
		{
			case 'kilometer':
				var kilometer = distance;		
				var kilometerPadded = this.formatNumber(kilometer, XXX_Array.merge(settings.number, {integer: {zeroPadding: 2}}));
				var kilometerIdentifier = XXX_I18n_Translation.get('distance', 'kilometer', settings.identifierType);
				
				kilometer = this.formatNumber(kilometer, settings.number);
				
				result = XXX_String.replace(settings.formats.kilometer, ['%kilometer%', '%kilometerPadded%', '%kilometerIdentifier%'], [kilometer, kilometerPadded, kilometerIdentifier]);				
				break;
			case 'mile':
				var mile = XXX_I18n_UnitConverter.centimeterToMile(XXX_I18n_UnitConverter.kilometerToCentimeter(distance));				
				var milePadded = this.formatNumber(mile, XXX_Array.merge(settings.number, {integer: {zeroPadding: 2}}));
				var mileIdentifier = XXX_I18n_Translation.get('distance', 'mile', settings.identifierType);
				
				mile = this.formatNumber(mile, settings.number);
				
				result = XXX_String.replace(settings.formats.mile, ['%mile%', '%milePadded%', '%mileIdentifier%'], [mile, milePadded, mileIdentifier]);				
				break;
		}
		
		result = this.cleanFormat(result);
		
		return result;
	},
	
	// coordinate in degrees
	formatCoordinate: function (coordinate, settings)
	{
		settings = !XXX_Type.isArray(settings) ? XXX_I18n_Localization.get('coordinate') : XXX_Array.merge(XXX_I18n_Localization.get('coordinate'), settings);
		
		var result = '';
		
		switch (settings.system)
		{
			case 'degree':
				var degree = coordinate;
				var degreePadded = this.formatNumber(degree, XXX_Array.merge(settings.number, {integer: {zeroPadding: 2}}));
				var degreeIdentifier = XXX_I18n_Translation.get('coordinate', 'degree', settings.identifierType);
				
				degree = this.formatNumber(degree, settings.number);
				
				result = XXX_String.replace(settings.formats.location, ['%degree%', '%degreePadded%', '%degreeIdentifier%'], [degree, degreePadded, degreeIdentifier]);	
				break;
			case 'degreeMinute':
				var degreeMinuteCoordinate = XXX_I18n_UnitConverter.degreeCoordinateToDegreeMinuteCoordinate(coordinate);
				
				var degree = degreeMinuteCoordinate.degree;
				var degreePadded = this.formatNumber(degree, XXX_Array.merge(settings.number, {integer: {zeroPadding: 2}}));
				var degreeIdentifier = XXX_I18n_Translation.get('coordinate', 'degree', settings.identifierType);
				
				var minute = degreeMinuteCoordinate.minute;
				var minutePadded = this.formatNumber(minute, XXX_Array.merge(settings.number, {integer: {zeroPadding: 2}}));
				var minuteIdentifier = XXX_I18n_Translation.get('coordinate', 'minute', settings.identifierType);
				
				if (settings.omitEmptyUnit && degree == 0)
				{
					degree = '';
					degreePadded = '';
					degreeIdentifier = '';
				}
				
				if (settings.omitEmptyUnit && degree > 0 && minute == 0)
				{
					minute = '';
					minutePadded = '';
					minuteIdentifier = '';
				}
				
				minute = this.formatNumber(minute, settings.number);
				
				result = XXX_String.replace(settings.formats.location, ['%degree%', '%degreePadded%', '%degreeIdentifier%', '%minute%', '%minutePadded%', '%minuteIdentifier%'], [degree, degreePadded, degreeIdentifier, minute, minutePadded, minuteIdentifier]);	
				break;
			case 'degreeMinuteSecond':
				var degreeMinuteSecondCoordinate = XXX_I18n_UnitConverter.degreeCoordinateToDegreeMinuteSecondCoordinate(coordinate);
				
				var degree = degreeMinuteSecondCoordinate.degree;
				var degreePadded = this.formatNumber(degree, XXX_Array.merge(settings.number, {integer: {zeroPadding: 2}}));
				var degreeIdentifier = XXX_I18n_Translation.get('coordinate', 'degree', settings.identifierType);
				
				var minute = degreeMinuteSecondCoordinate.minute;
				var minutePadded = this.formatNumber(minute, XXX_Array.merge(settings.number, {integer: {zeroPadding: 2}}));
				var minuteIdentifier = XXX_I18n_Translation.get('coordinate', 'minute', settings.identifierType);
				
				var second = degreeMinuteSecondCoordinate.second;
				var secondPadded = this.formatNumber(second, XXX_Array.merge(settings.number, {integer: {zeroPadding: 2}}));
				var secondIdentifier = XXX_I18n_Translation.get('coordinate', 'second', settings.identifierType);
				
				if (settings.omitEmptyUnit && degree == 0)
				{
					degree = '';
					degreePadded = '';
					degreeIdentifier = '';
				}
				
				if (settings.omitEmptyUnit && degree > 0 && minute == 0)
				{
					minute = '';
					minutePadded = '';
					minuteIdentifier = '';
				}
				
				if (settings.omitEmptyUnit && degree > 0 && minute > 0 && second == 0)
				{
					second = '';
					secondPadded = '';
					secondIdentifier = '';
				}
				
				second = this.formatNumber(second, settings.number);
				
				result = XXX_String.replace(settings.formats.location, ['%degree%', '%degreePadded%', '%degreeIdentifier%', '%minute%', '%minutePadded%', '%minuteIdentifier%', '%second%', '%secondPadded%', '%secondIdentifier%'], [degree, degreePadded, degreeIdentifier, minute, minutePadded, minuteIdentifier, second, secondPadded, secondIdentifier]);	
				break;
		}
		
		result = this.cleanFormat(result);
		
		return result;
	},
	
	// temperature in degrees celsius
	formatTemperature: function (temperature, settings)
	{
		settings = !XXX_Type.isArray(settings) ? XXX_I18n_Localization.get('temperature') : XXX_Array.merge(XXX_I18n_Localization.get('temperature'), settings);
		
		var result = '';
		
		var degree = 0;
		
		switch (settings.system)
		{
			case 'celsius':
				degree = temperature;
				break;
			case 'fahrenheit':
				degree = XXX_I18n_UnitConverter.celsiusToFahrenheit(temperature);
				break;
			case 'kelvin':
				degree = XXX_I18n_UnitConverter.celsiusToKelvin(temperature);
				break;
		}
		
		var degreePadded = this.formatNumber(degree, XXX_Array.merge(settings.number, {integer: {zeroPadding: 2}}));
		var degreeIdentifier = XXX_I18n_Translation.get('temperature', settings.system, settings.identifierType);
		
		degree = this.formatNumber(degree, settings.number);
				
		result = XXX_String.replace(settings.formats.temperature, ['%degree%', '%degreeIdentifier%'], [degree, degreeIdentifier]);
		result = this.cleanFormat(result);
		
		return result;
	},
		
	getTimePickerFormat: function ()
	{
		var result = false;
		
		if (XXX_I18n_Localization.get('dateTime', 'clockType') == 12)
		{
			var variables =
			{
				hour: {hour: 'normal', hourPadded: 'padded'},
				minute: {minute: 'normal', minutePadded: 'padded'},
				meridiem: {meridiemName: 'name', meridiemAbbreviation: 'abbreviation'}
			};
		}
		else if (XXX_I18n_Localization.get('dateTime', 'clockType') == 24)
		{
			var variables =
			{
				hour: {hour: 'normal', hourPadded: 'padded'},
				minute: {minute: 'normal', minutePadded: 'padded'}
			};
		}
		
		result = XXX_I18n_Formatter.processFormat(XXX_I18n_Localization.get('dateTime', 'formats', 'timePicker'), variables, true);
		
		return result;
	},
	
	getDatePickerFormat: function ()
	{
		var result = false;
		
		var variables =
		{
			year: {year: 'normal', yearShort: 'short'},
			month: {month: 'normal', monthPadded: 'padded', monthName: 'name', monthAbbreviation: 'abbreviation'},
			day: {day: 'normal', dayPadded: 'padded'}
		};
		
		result = XXX_I18n_Formatter.processFormat(XXX_I18n_Localization.get('dateTime', 'formats', 'datePicker'), variables, true);
		
		return result;
	},
		
	getBodyLengthPickerFormat: function (bodyLengthType)
	{
		if (!(bodyLengthType == 'short' || bodyLengthType == 'long'))
		{
			bodyLengthType = 'short';	
		}
		
		var result = false;
						
		switch (XXX_I18n_Localization.get('bodyLength', 'system'))
		{
			case 'inch':
				if (bodyLengthType == 'short')
				{
					var variables =
					{
						inch: {inch: 'normal', inchPadded: 'padded'},
						inchIdentifier: {inchIdentifier: XXX_I18n_Localization.get('bodyLength', 'identifierType')}
					};
					
					result = XXX_I18n_Formatter.processFormat(XXX_I18n_Localization.get('bodyLength', 'formats', 'inchShort'), variables, true);
				}
				else if (bodyLengthType == 'long')
				{
					var variables =
					{
						foot: {foot: 'normal', footPadded: 'padded'},
						footIdentifier: {footIdentifier: XXX_I18n_Localization.get('bodyLength', 'identifierType')},
						inch: {inch: 'normal', inchPadded: 'padded'},
						inchIdentifier: {inchIdentifier: XXX_I18n_Localization.get('bodyLength', 'identifierType')}
					};
					
					result = XXX_I18n_Formatter.processFormat(XXX_I18n_Localization.get('bodyLength', 'formats', 'inchLong'), variables, true);
				}
				break;
			case 'centimeter':
				if (bodyLengthType == 'short')
				{
					var variables =
					{
						centimeter: {centimeter: 'normal', centimeterPadded: 'padded'},
						centimeterIdentifier: {centimeterIdentifier: XXX_I18n_Localization.get('bodyLength', 'identifierType')}
					};
					
					result = XXX_I18n_Formatter.processFormat(XXX_I18n_Localization.get('bodyLength', 'formats', 'centimeterShort'), variables, true);
				}
				else if (bodyLengthType == 'long')
				{
					var variables =
					{
						meter: {meter: 'normal', meterPadded: 'padded'},
						meterIdentifier: {meterIdentifier: XXX_I18n_Localization.get('bodyLength', 'identifierType')},
						centimeter: {centimeter: 'normal', centimeterPadded: 'padded'},
						centimeterIdentifier: {centimeterIdentifier: XXX_I18n_Localization.get('bodyLength', 'identifierType')}
					};
					
					result = XXX_I18n_Formatter.processFormat(XXX_I18n_Localization.get('bodyLength', 'formats', 'centimeterLong'), variables, true);
				}
				break;
		}
		
		return result;
	},
	
	getBodyWeightPickerFormat: function ()
	{
		var result = false;
						
		switch (XXX_I18n_Localization.get('bodyWeight', 'system'))
		{
			case 'kilogram':
				var variables =
				{
					kilogram: {kilogram: 'normal', kilogramPadded: 'padded'},
					kilogramIdentifier: {kilogramIdentifier: XXX_I18n_Localization.get('bodyWeight', 'identifierType')}
				};
				
				result = XXX_I18n_Formatter.processFormat(XXX_I18n_Localization.get('bodyWeight', 'formats', 'kilogram'), variables, true);
				break;
			case 'pound':
				var variables =
				{
					pound: {pound: 'normal', poundPadded: 'padded'},
					poundIdentifier: {poundIdentifier: XXX_I18n_Localization.get('bodyWeight', 'identifierType')}
				};
				
				result = XXX_I18n_Formatter.processFormat(XXX_I18n_Localization.get('bodyWeight', 'formats', 'pound'), variables, true);
				break;
			case 'stone':
				var variables =
				{
					stone: {stone: 'normal', stonePadded: 'padded'},
					stoneIdentifier: {stoneIdentifier: XXX_I18n_Localization.get('bodyWeight', 'identifierType')},
					pound: {pound: 'normal', poundPadded: 'padded'},
					poundIdentifier: {poundIdentifier: XXX_I18n_Localization.get('bodyWeight', 'identifierType')}
				};
				
				result = XXX_I18n_Formatter.processFormat(XXX_I18n_Localization.get('bodyWeight', 'formats', 'stone'), variables, true);
				break;
		}
		
		return result;
	},
	
	getDistancePickerFormat: function ()
	{
		var result = false;
					
		switch (XXX_I18n_Localization.get('distance', 'system'))
		{
			case 'mile':
				var variables =
				{
					mile: {mile: 'normal', milePadded: 'padded'},
					mileIdentifier: {mileIdentifier: XXX_I18n_Localization.get('distance', 'identifierType')}
				};
				
				result = XXX_I18n_Formatter.processFormat(XXX_I18n_Localization.get('distance', 'formats', 'mile'), variables, true);
				break;
			case 'kilometer':
				var variables =
				{
					kilometer: {kilometer: 'normal', kilometerPadded: 'padded'},
					kilometerIdentifier: {kilometerIdentifier: XXX_I18n_Localization.get('distance', 'identifierType')}
				};
				
				result = XXX_I18n_Formatter.processFormat(XXX_I18n_Localization.get('distance', 'formats', 'kilometer'), variables, true);
				break;
		}
		
		return result;
	},
	
	// TODO coordinate format
	
	getTemperaturePickerFormat: function ()
	{
		var result = false;

		var variables =
		{
			degree: {degree: 'normal', degreePadded: 'padded'},
			degreeIdentifier: {degreeIdentifier: XXX_I18n_Localization.get('temperature', 'identifierType')}
		};
		
		result = XXX_I18n_Formatter.processFormat(XXX_I18n_Localization.get('temperature', 'format'), variables, true);
		
		return result;
	},
	
	
	
	
	// TODO: Multiple formats, for the picker and to display
	
	
	
	
	
	
	
	
	// TODO: runtime cache, once processed store a version, a checkup if all variables are present
		
	processFormat: function (format, variables, removeUnknownVariables)
	{
		var originalFormat = format;
		
		var splitter = '|||';
		
		var detectedVariables = XXX_String_Pattern.getMatches(format, '%([a-zA-Z0-9_-]{1,})%', '');
		detectedVariables = detectedVariables[1];
				
		var processedVariableOrder = [];
		var processedVariableFormats = {};
		
		for (var i = 0, iEnd = XXX_Array.getFirstLevelItemTotal(detectedVariables); i < iEnd; ++i)
		{
			var detectedVariableName = detectedVariables[i];
			
			var found = false;
			
			for (var variableName in variables)
			{
				// Multiple
				if (XXX_Type.isArray(variables[variableName]))
				{
					var variableAlternatives = variables[variableName];
					
					for (var variableAlternativeName in variableAlternatives)
					{
						var variableAlternativeFormat = variableAlternatives[variableAlternativeName];
						
						if (variableAlternativeName == detectedVariableName)
						{
							processedVariableOrder.push(variableName);
							
							if (XXX_Array.hasKey(processedVariableFormats, variableName))
							{
								if (XXX_Type.isArray(processedVariableFormats[variableName]))
								{
									processedVariableFormats[variableName].push(variableAlternativeFormat);
								}
								else
								{
									processedVariableFormats[variableName] = [processedVariableFormats[variableName], variableAlternativeFormat];
								}
							}
							else
							{
								processedVariableFormats[variableName] = variableAlternativeFormat;	
							}
							
							format = XXX_String.replace(format, '%' + detectedVariableName + '%', splitter);
							
							found = true;							
							break;
						}
					}
				}
				// One 
				else
				{
					var variableFormat = variables[variableName];
					
					if (variableName == detectedVariableName)
					{
						processedVariableOrder.push(variableName);
						
						if (XXX_Array.hasKey(processedVariableFormats, variableName))
						{
							if (XXX_Type.isArray(processedVariableFormats[variableName]))
							{
								processedVariableFormats[variableName].push(variableAlternativeFormat);
							}
							else
							{
								processedVariableFormats[variableName] = [processedVariableFormats[variableName], variableAlternativeFormat];
							}
						}
						else
						{
							processedVariableFormats[variableName] = variableAlternativeFormat;	
						}
						
						format = XXX_String.replace(format, '%' + detectedVariableName + '%', splitter);
						
						found = true;						
						break;
					}
				}
				
				if (found)
				{
					break;
				}
			}
			
			if (!found && removeUnknownVariables)
			{
				format = XXX_String.replace(format, '%' + detectedVariableName + '%', '');
			}
		}
		
		var inBetweenParts = XXX_String.splitToArray(format, splitter);
		
		var result =
		{
			originalFormat: originalFormat,
			format: originalFormat,
			detectedVariables: detectedVariables,
			variables: variables,
			inBetweenParts: inBetweenParts,
			order: processedVariableOrder,
			formats: processedVariableFormats
		};
		
		return result;
	},
	
	
	cleanFormat: function (format)
	{
		format = XXX_String.clearVariables(format);
		format = XXX_String.trim(format);
		
		return format;
	}
};