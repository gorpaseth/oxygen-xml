
namespace('sync.actions');


/**
 * The base class for the editor actions.
 *
 * Besides the action behavior, this class also specifies how the buttons that trigger the action should be rendered.
 * This rendering is represented by an action display name, a description (usually presented on a tooltip), and some
 * icons to be rendered depending on the button size.
 *
 * @param {string} [keystrokeStr] the string representation of the shortcut
 * of the action.
 * @constructor
 */
sync.actions.AbstractAction = function(keystrokeStr) {};


/**
 * Returns the shortcut, represented as a string. E.g.
 *  - "Ctrl B"
 *  - "Alt Shift T"
 *  - "Ctrl Alt equals"
 *  - "Ctrl period"
 *  - "Ctrl comma"
 *  - "Ctrl back_quote"
 *  - "Ctrl open_bracket"
 *  - "Ctrl back_slash"
 *  - "Ctrl num_lock"
 *  - "Ctrl divide"
 *
 * The shortcut may use platform-independent modifiers M1 to M4.
 *
 * @return {string} the string representation of the shortcut. If there is
 * no shortcut, returns an empty string.
 */
sync.actions.AbstractAction.prototype.getShortcut = function() {};


/**
 * Abstract method that executes the action.
 *
 * @param {function()} callback A function to call after the action was performed
 * to notify the editor that the action was finished. It must be called even
 * when the action finished with an error.
 */
sync.actions.AbstractAction.prototype.actionPerformed = function(callback) {};


/**
 * Returns the display name for the action.
 * @return {string} The display name.
 */
sync.actions.AbstractAction.prototype.getDisplayName = function() {};


/**
 * Returns the description for the action - usually displayed on a tooltip.
 * @return {string} The description.
 */
sync.actions.AbstractAction.prototype.getDescription = function() {};


/**
 * <p>One should override this method to provide the absolute URL of the action's large icon.
 *
 * <p>If you want to distribute the icon in a framework, you need to place it in the "web/" sub-folder of the framework.
 * In this case the absolute URL of the icon can be obtain by concatenating {@link sync.ext.Registry.extensionURL}
 * with the relative path of the icon to the "web/" sub-folder.</p>
 *
 * <p>If you want to distribute the icon in a plugin, you can place it in a directory with static resources using a
 * <a href="https://oxygenxml.com/doc/ug-waCustom/topics/customizing_plugins.html">WebappStaticResourcesFolder</a> extension.
 *
 * <p>The large icon should have a minimum size of 24 by 24 px for non-hidpi displays
 * and can vary depending on the device pixel ration, the icon being used as
 * the background of a 24 by 24 px DIV.
 *
 * @param {number=} devicePixelRation the device pixel ratio.
 * 
 * @return {string} The icon URL.
 *
 * @protected
 */
sync.actions.AbstractAction.prototype.getLargeIcon = function(devicePixelRation) {};


/**
 * <p>One should override this method to provide the absolute URL of the action's small icon.
 *
 * <p>If you want to distribute the icon in a framework, you need to place it in the "web/" sub-folder of the framework.
 * In this case the absolute URL of the icon can be obtain by concatenating {@link sync.ext.Registry.extensionURL}
 * with the relative path of the icon to the "web/" sub-folder.</p>
 *
 * <p>If you want to distribute the icon in a plugin, you can place it in a directory with static resources using a
 * <a href="https://oxygenxml.com/doc/ug-waCustom/topics/customizing_plugins.html">WebappStaticResourcesFolder</a> extension.
 *
 * <p>The small icon should have a minimum size of 16 by 16 px for non-hidpi displays
 * and can vary depending on the device pixel ration, the small icon being used as
 * the background of a 16px by 16px div.
 *
 * @param {number=} devicePixelRation the device pixel ratio.
 *
 * @return {string} The icon URL.
 *
 * @protected
 */
sync.actions.AbstractAction.prototype.getSmallIcon = function(devicePixelRation) {};


/**
 * This method renders the small icon of the action in a 16px by 16px
 * DIV with the action's small icon as its background.
 *
 * This allows the getSmallIcon() method to return different sized icons depending
 * on the device pixel ration, the size constraints being
 * imposed by the enclosing DIV.
 *
 * It should be overridden only for custom rendering strategies, otherwise
 * consider using the getSmallIcon method.
 *
 * @return {HTMLElement} the rendering of the small icon image.
 */
sync.actions.AbstractAction.prototype.renderSmallIcon = function() {};


/**
 * This method renders the large icon of the action in a 24px by 24px div
 * with the action's large icon as its background.
 *
 * This allows the getLargeIcon() method to return different sized icons
 * depending on the device pixel ration, the size constraints being
 * imposed by the enclosing DIV.
 *
 * It should be overridden only for custom rendering strategies, otherwise
 * consider using the getLargeIcon method.
 *
 * @return {Element} the rendering of the large icon image.
 */
sync.actions.AbstractAction.prototype.renderLargeIcon = function() {};


/**
 * Tells whether the action is enabled.
 *
 * Note: The action is not permanently polled for its "enabled-ness". If you want the GUI to reflect the current status
 * you will have to call {@link sync.api.ActionsManager#refreshActionsStatus}.
 *
 * In the implementation you can use {@link sync.api.SelectionManager} to determine the selection.
 *
 * @return {boolean} Whether the action is enabled.
 */
sync.actions.AbstractAction.prototype.isEnabled = function() {};

/**
 * Should dispose all the resources required by the action.
 */
sync.actions.AbstractAction.prototype.dispose = function() {};

