var XXX_I18n_Translation =
{
	CLASS_NAME: 'XXX_I18n_Translation',
	
	selectedTranslation: 'en',
	
	translations:
	[
		'en'
	],
	
	get: function ()
	{
		var exists = false;
		
		var result = false;
		
		var tempArguments = arguments;
		
		var firstArgument = tempArguments[0];
		
		if (XXX_Type.isArray(firstArgument))
		{
			tempArguments = firstArgument;
		}
		
		if (XXX_Array.getFirstLevelItemTotal(tempArguments) >= 1)
		{
			result = XXX_I18n_Translations[this.selectedTranslation][tempArguments[0]];
			
			if (result !== '')
			{
				exists = true;
				
				if (XXX_Array.getFirstLevelItemTotal(tempArguments) > 1)
				{
					// Traverse other arguments
					for (var i = 1, iEnd = XXX_Array.getFirstLevelItemTotal(tempArguments); i < iEnd; ++i)
					{
						result = result[tempArguments[i]];
						
						if (result === '')
						{
							exists = false;
							
							break;
						}
						else
						{
							exists = true;
						}
					}
				}
			}
			else
			{
				exists = false;
			}
		}
		
		if (exists === false)
		{
			if (this.selectedTranslation != 'en')
			{
				var previousSelectedTranslation = this.selectedTranslation;
				
				this.selectedTranslation = 'en';
				
				this.get(tempArguments);
				
				this.selectedTranslation = previousSelectedTranslation;
			}
			else
			{
	 			XXX_JS.errorNotification(1, 'Unknown key: ' + XXX_Array.joinValuesToString(tempArguments, ', '), this.CLASS_NAME);
	 		}
		}
		
		return result;
	},
	
	composeSequence: function (sequence)
	{
		var result = sequence[0];
		
		for (var i = 1, iEnd = XXX_Array.getFirstLevelItemTotal(sequence); i < iEnd; ++i)
		{
			// Default
			var glue = this.get('sequence', 'between');
			
			// Last
			if (i == iEnd - 1)
			{
				if (this.get('sequence', 'last') !== false)
				{
					glue = this.get('sequence', 'last');
				}
			}
			// First			
			else if (i == 1)
			{
				if (this.get('sequence', 'first') !== false)
				{
					glue = this.get('sequence', 'first');
				}
			}
			
			result += glue + sequence[i];
		}
		
		return result;
	},
	
	composeGrammaticalNumberForm: function (text, quantity)
	{
		var result = text;
		
		quantity = XXX_Number.round(quantity);
		
		if (XXX_Type.isAssociativeArray(text) && !XXX_Type.isString(text))
		{	
			if (quantity == 1)
			{
				if (XXX_Type.isValue(text.singular) || XXX_Type.isFilledArray(text.singular))
				{
					result = text.singular;
				}
			}
			else
			{
				if (XXX_Type.isValue(text.plural) || XXX_Type.isFilledArray(text.plural))
				{
					result = text.plural;
				}
			}
		}	
		
		return result;
	},
	
	composeVariableText: function (texts, variables, quantity)
	{
		if (!XXX_Type.isNumber(quantity))
		{
			quantity = 0;
		}
		
		quantity = XXX_Number.round(quantity);
		
		var message = XXX_I18n_Translation.composeGrammaticalNumberForm(texts, quantity);
		
		var variableNames = [];
		var variableValues = [];
		
		for (var name in variables)
		{
			variableNames.push(name);
			variableValues.push(variables[name]);
		}
		
		message = XXX_String.replaceVariables(message, variableNames, variableValues);
		
		return message;
	}
};

XXX_I18n_Translations = {};
