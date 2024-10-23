
namespace('sync.api');


/**
 * @namespace sync.api.Translation
 */
sync.api.Translation = {};

/**
 * Get the current language for the application.
 * Returns one of the supported languages or the default language.
 *
 * @function getLanguage
 * @memberof sync.api.Translation
 * @static
 *
 * @returns {?string} The language in the ISO format. E.g. en_US, de_DE
 */
sync.api.Translation.getLanguage = function() {};

/**
 * Add a set of translations.
 *
 * @function addTranslations
 * @memberof sync.api.Translation
 * @static
 *
 * @param {object} translationSet The translated messages.
 *
 * <p>Object structure:</p>
 * <p> - to add strings for the target languages:</p>
 * <pre>{
 *    key1: { 'en_US': 'english string', 'fr_FR': 'french string'... },
 *    key2: { 'en_US': 'english string2', 'fr_FR': 'french string2'... },
 * }</pre>
 * <p> - to add a string to be displayed for any language:</p>
 * <pre>{
 *    key1: 'string1',
 *    key2: 'string2',
 * }</pre>
 */
sync.api.Translation.addTranslations = function(translationSet) {};
