
namespace('sync.actions');


/**
 * Base class for attribute editing actions.
 *
 * @constructor
 *
 * @param {function(string, function(string, boolean))} opt_handler A handler function, see the "actionPerformed"
 * prototype documentation for more details.
 * @param {String} opt_buttonClass An optional class fragment for the button.
 * @param {String} opt_tooltip An optional tooltip for the button.
 */
sync.actions.AttributeEditingAction = function(opt_handler, opt_buttonClass, opt_tooltip) {};

/**
 * Renders a small icon for the action.
 *
 * @return {string} The URL of the small icon HTML element that corresponds to the small icon.
 */
sync.actions.AttributeEditingAction.prototype.getButtonClass = function() {};

/**
 * Returns the tooltip on the button
 *
 * @return {string} The optional tooltip for the button.
 */
sync.actions.AttributeEditingAction.prototype.getTooltip = function() {};

/**
 * This method is called when the user invoked attribute editing action.
 * It is intended to show a more specific editing interface for a given URL:
 * e.g. a color picker, an image chooser, etc.
 *
 * @param {string} currentValue The current value of the attribute.
 * @param {function(string, boolean=)} done The function to be invoked with the edited value. The first parameter
 * is the new value of the attribute. The behaviour of the "done"
 * callback is the following:
 *  <ul>
 *    <li>If the argument is the same as the current value, nothing happens.
 *    <li>If the argument is null, the attribute will be deleted.
 *    <li>If the argument is a string, different than the current value, the value will be updated.
 *  </ul>
 *  The second parameter is a flag that, when set to true, will try to consider the value of the first parameter as
 *  an URL and try to make it relative to the XML base url before updating the document.
 */
sync.actions.AttributeEditingAction.prototype.actionPerformed =
  function(currentValue, done) {};


