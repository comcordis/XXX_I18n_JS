
// For all you hackers out there, there is no gain in manipulating these values (They are only used as indicators of prices), because all sales are verified server side.

var XXX_I18n_Currency =
{
	CLASS_NAME: 'XXX_I18n_Currency',
	
	getInformation: function (code)
	{
		var result = false;
		
		if (XXX_Type.isEmpty(code) && XXX_Type.isValue(XXX_I18n_Currencies.baseCurrency_code))
		{
			code = XXX_I18n_Currencies.baseCurrency_code;
		}
		
		if (XXX_Array.hasKey(XXX_I18n_Currencies.information, code))
		{
			result = XXX_I18n_Currencies.information[code];
		}
		
		return result;
	},
	
	formatAmount: function (code, amount)
	{
		var currencyInformation = this.getInformation(code);			
		var currencyExchangeRate = this.getExchangeRate(code);
		
		var minimum = 0;
		var maximum = XXX_Default.toPositiveInteger(100000000 * currencyExchangeRate, 1);
		
		var step = currencyInformation.number.smallestCoin;
		var decimals = currencyInformation.number.decimals;
		
		return XXX_I18n_Formatter.formatNumber2(amount, minimum, maximum, step, decimals);
	},
	
	getExchangeRate: function (to_code, from_code, canonical_code)
	{
		if (XXX_Type.isEmpty(to_code) && XXX_Type.isValue(XXX_I18n_Currencies.baseCurrency_code))
		{
			to_code = XXX_I18n_Currencies.baseCurrency_code;
		}
		
		if (XXX_Type.isEmpty(from_code) && XXX_Type.isValue(XXX_I18n_Currencies.baseCurrency_code))
		{
			from_code = XXX_I18n_Currencies.baseCurrency_code;
		}
		
		if (XXX_Type.isEmpty(canonical_code) && XXX_Type.isValue(XXX_I18n_Currencies.canonicalCurrency_code))
		{
			canonical_code = XXX_I18n_Currencies.canonicalCurrency_code;
		}
		
		var result = false;
		
		var foundResult = false;
		
		if (to_code == from_code)
		{
			result = 1;
			
			foundResult = true;
		}
		
		if (!foundResult)
		{		
			// Try direct
			for (var i = 0, iEnd = XXX_Array.getFirstLevelItemTotal(XXX_I18n_Currencies.exchangeRates); i < iEnd; ++i)
			{
				var exchangeRate = XXX_I18n_Currencies.exchangeRates[i];
				
				if (exchangeRate.from_code == from_code && exchangeRate.to_code == to_code)
				{
					result = exchangeRate.exchangeRate;
					
					foundResult = true;
					
					break;
				}
				else if (exchangeRate.from_code == to_code && exchangeRate.to_code == from_code)
				{
					result = 1 / exchangeRate.exchangeRate;
					
					foundResult = true;
					
					break;
				}
			}
			
			if (!foundResult)
			{
				// Try with canonical as bridge
		
				if (to_code != canonical_code && from_code != canonical_code)
				{
					var foundCanonicalToToExchangeRate = false;
					var foundCanonicalToFromExchangeRate = false;
					
					var canonicalToToExchangeRate = 1;
					var canonicalToFromExchangeRate = 1;
					
					for (var i = 0, iEnd = XXX_Array.getFirstLevelItemTotal(XXX_I18n_Currencies.exchangeRates); i < iEnd; ++i)
					{
						var exchangeRate = XXX_I18n_Currencies.exchangeRates[i];
						
						if (exchangeRate.from_code == canonical_code && exchangeRate.to_code == to_code)
						{
							canonicalToToExchangeRate = exchangeRate.exchangeRate;
							
							foundCanonicalToToExchangeRate = true;
							
							break;
						}
						else if (exchangeRate.from_code == to_code && exchangeRate.to_code == canonical_code)
						{
							canonicalToToExchangeRate = 1 / exchangeRate.exchangeRate;
							
							foundCanonicalToToExchangeRate = true;
							
							break;
						}
					}
					
					for (var i = 0, iEnd = XXX_Array.getFirstLevelItemTotal(XXX_I18n_Currencies.exchangeRates); i < iEnd; ++i)
					{
						var exchangeRate = XXX_I18n_Currencies.exchangeRates[i];
						
						if (exchangeRate.from_code == canonical_code && exchangeRate.to_code == from_code)
						{
							canonicalToFromExchangeRate = exchangeRate.exchangeRate;
							
							foundCanonicalToFromExchangeRate = true;
							
							break;
						}
						else if (exchangeRate.from_code == from_code && exchangeRate.to_code == canonical_code)
						{
							canonicalToFromExchangeRate = 1 / exchangeRate.exchangeRate;
							
							foundCanonicalToFromExchangeRate = true;
							
							break;
						}
					}
					
					if (foundCanonicalToToExchangeRate && foundCanonicalToFromExchangeRate)
					{
						result = (1 / canonicalToFromExchangeRate) * canonicalToToExchangeRate;
					}
				}
			}
		}
		
		return result;
	},
	
	get: function (code)
	{
		var exists = false;
		
		var result = false;
				
		if (code)
		{			
			exchangeRate = XXX_I18n_Currencies.exchangeRates[code];
			
			if (XXX_Type.isValue(exchangeRate))
			{
				exists = true;
				
				result = exchangeRate;
			}
			else
			{
				exists = false;
			}
		}
		
		if (exists === false)
		{
	 		XXX_JS.errorNotification(1, 'Unknown key: ' + XXX_Array.joinValuesToString(tempArguments, ', '), this.CLASS_NAME);
		}
		
		return result;
	}
};