
var XXX_I18n_Localization =
{
	CLASS_NAME: 'XXX_I18n_Localization',
	
	selectedLocalization: 'us',
	
	localizations:
	[
		'us'
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
			result = XXX_I18n_Localizations[this.selectedLocalization][tempArguments[0]];
			
			if (result !== '')
			{
				exists = true;
				
				if (XXX_Array.getFirstLevelItemTotal(tempArguments) > 1)
				{
					// Traverse other arguments
					for (var i = 1, iEnd = XXX_Array.getFirstLevelItemTotal(tempArguments); i < iEnd; ++i)
					{
						result = result[tempArguments[i]];
						
						if (!XXX_Type.isValue(result))
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
			if (this.selectedLocalization != 'us')
			{
				var previousSelectedLocalization = this.selectedLocalization;
				
				this.selectedLocalization = 'us';
				
				this.get(tempArguments);
				
				this.selectedLocalization = previousSelectedLocalization;
			}
			else
			{
	 			XXX_JS.errorNotification(1, 'Unknown key: ' + XXX_Array.joinValuesToString(tempArguments, ', '), this.CLASS_NAME);
	 		}
		}
		
		return result;
	}
};

XXX_I18n_Localizations = {};