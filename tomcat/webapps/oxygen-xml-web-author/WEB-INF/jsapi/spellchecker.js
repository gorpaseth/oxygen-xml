
namespace('sync.api');


/**
 * After the editor has loaded (on the handler for {@link sync.api.Workspace.EditorLifecycleEvent}),
 * you can access the spellchecker for that editor by using {@link sync.api.Editor#getSpellChecker}
 * @since 20.1.1
 *
 * @constructor
 */
sync.api.SpellChecker = function() {};

/**
 * Run a full spellcheck on the document.
 */
sync.api.SpellChecker.prototype.performFullSpellCheck = function() {};

/**
 * Return the ignored words. Returns a map of languages to lists of ignored words.
 * Ignored words get reset on document reload.
 * @return {object|null} A map of languages to lists of ignored words.
 */
sync.api.SpellChecker.prototype.getIgnoredWords = function() {};

/**
 * Get the learn word action class, if it is set.
 * @returns {Class.<sync.actions.AbstractAction>|null} The learn word action class.
 */
sync.api.SpellChecker.prototype.getLearnWordAction = function() {};

/**
 * Set the learn word action class.
 * The context menu will create instances of this class when triggered over a spellchecking error.
 * @param {Class.<sync.actions.AbstractAction>} learnWordActionClass The action which will provide the learn word functionality.
 */
sync.api.SpellChecker.prototype.setLearnWordAction = function(learnWordActionClass) {};

