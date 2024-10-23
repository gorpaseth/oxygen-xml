namespace('sync.actions');


/**
 * Open action.
 *
 * @param {sync.api.UrlChooser} urlChooser the urlChooser the open action will use.
 *
 * @extends {sync.actions.AbstractAction}
 * @constructor
 * @deprecated since version 20.1.1. Use {@link sync.api.FileServersManager#registerFileServerConnector} to register a file server
 * for which inline browsing and create files features are provided.
 */
sync.actions.OpenAction = function(urlChooser) {};


/**
 * The actual action execution.
 */
sync.actions.OpenAction.prototype.actionPerformed = function(cb) {};

/** @override */
sync.actions.OpenAction.prototype.getDisplayName = function() {};


/** @override */
sync.actions.OpenAction.prototype.isEnabled = function() {};

/** @override */
sync.actions.OpenAction.prototype.getLargeIcon = function(opt_dpi) {};

/**
 * Setter for the action's large icon.
 * @param newLargeIcon the new icon source.
 */
sync.actions.OpenAction.prototype.setLargeIcon = function(newLargeIcon) {};

/** @override */
sync.actions.OpenAction.prototype.getSmallIcon = function(opt_dpi) {};

/** @override */
sync.actions.OpenAction.prototype.getDescription = function() {};

/**
 * Sets the action's description.
 *
 * @param newDescription the new action description.
 */
sync.actions.OpenAction.prototype.setDescription = function(newDescription) {};

/**
 * Set the action id.
 *
 * @param newActionId the new action id.
 */
sync.actions.OpenAction.prototype.setActionId = function(newActionId) {};

/**
 * Get the action id.
 *
 * @return {string} the action id or null if none was provided.
 */
sync.actions.OpenAction.prototype.getActionId = function() {};

/**
 * Sets the action name.
 *
 * The action name is displayed under the action large icon.
 *
 * @param newName the new name.
 */
sync.actions.OpenAction.prototype.setActionName = function(newName) {};

/**
 * Opens a new file.
 * (Replaces the old url param if there is one)
 *
 * @param fileUrl the file url to open.
 */
sync.actions.OpenAction.prototype.openFile = function(fileUrl) {};

/**
 * Handles the rendering of the action's large icon.
 *
 * @return {HTMLElement} the rendered large icon.
 */
sync.actions.OpenAction.prototype.renderLargeIcon = function() {};
