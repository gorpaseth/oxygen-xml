namespace('sync.api');

/**
 * Generic manager for actions. This manager does not require an editor to operate.
 * See also: {@link sync.view.ViewManager.getActionsManager}.
 *
 * @constructor
 * @since 26.1
 */
sync.api.ActionsManagerCore = function() {};

/**
 * Registers an action for the given ID. It will override any previous registration that uses the same ID.
 *
 * Actions registered using this mechanism are not visible in the Document Type Configuration dialog box in
 * Oxygen XML Editor/Author. In order to add them to toolbar, context menu or content completion, you should:
 * <ol>
 *   <li>Define "stub" actions with the same ID in the Document Type Configuration dialog box</li>
 *   <li>Make sure the actions registered in JavaScript override the "stub" actions</li>
 * </ol>
 *
 * @param {string} id The id of the action.
 * @param {sync.actions.AbstractAction} action The action to register.
 * @param {string=} shortcut The shortcut which invokes this action.
 */
sync.api.ActionsManagerCore.prototype.registerAction = function(id, action, shortcut) {};

/**
 * Sets the shortcut for an action.
 *
 * @param {string} id The ID of the action.
 * @param {string} newShortcut The new shortcut for the action.
 */
sync.api.ActionsManagerCore.prototype.setActionShortcut = function(id, newShortcut) {};

/**
 * Un-registers the action with a given id.
 *
 * @param {string} id The id of the action.
 */
sync.api.ActionsManagerCore.prototype.unregisterAction = function(id) {};

/**
 * @param {string|KeyboardEvent} keystroke The key stroke to associate as a
 *
 * @return {sync.actions.AbstractAction} The action with the given shortcut or null if
 * there is no action associated for the given shortcut.
 *
 * @since 21.0
 */
sync.api.ActionsManagerCore.prototype.getActionByShortcut = function(keystroke) {};

/**
 * <p>Refresh the graphical appearance of the buttons that execute the given actions to match their status:
 * <ul>
 *   <li>enabled or not
 * </ul>
 *
 * <p>In order to determine the new status the corresponding methods are called.
 *
 * @param {...string} actionIds The ids of the actions that need to be refreshed.
 */
sync.api.ActionsManagerCore.prototype.refreshActionsStatus = function(actionIds) {};

/**
 * @param {string} id The id of the action.
 * @return {sync.actions.AbstractAction} The action with the given id.
 */
sync.api.ActionsManagerCore.prototype.getActionById = function(id) {};
