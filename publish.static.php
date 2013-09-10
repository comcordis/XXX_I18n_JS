<?php

XXX_Static_Publisher::publishMergedFilesFromOtherProject($project, $deployIdentifier, array
(
	'XXX_I18n_Currency.js',
	'XXX_I18n_Translation.js',
	'XXX_I18n_Localization.js',
	'XXX_I18n_Formatter.js',
	'XXX_I18n_UnitConverter.js'
),
'initialize.js');

global $XXX_I18n_Currencies;

XXX_Static_Publisher::publishJSVariableToProject($project, 'XXX_I18n_Currencies', $XXX_I18n_Currencies, false, 'XXX_I18n_Currencies.js');

?>