namespace('sync.api');


/**
 * Create action.
 *
 * @param {sync.api.UrlChooser} urlChooser the urlChooser the create action will use.
 *
 * @extends {sync.actions.AbstractAction}
 * @constructor
 * @deprecated since version 20.1.1. Use {@link sync.api.FileServersManager#registerFileServerConnector} to register a file server
 * for which inline browsing and create files features are provided.
 */
sync.api.CreateDocumentAction = function(urlChooser) {
 /**
  * @type {sync.model.FrameworkTemplate}
  */
 this.selectedTemplate_ = null;
};


/** @override */
sync.api.CreateDocumentAction.prototype.getDisplayName = function() {};


/** @override */
sync.api.CreateDocumentAction.prototype.isEnabled = function() {};

/** @override */
sync.api.CreateDocumentAction.prototype.getLargeIcon = function() {};

/**
 * Sets the action's large icon.
 *
 * @param newLargeIcon the new icon source.
 */
sync.api.CreateDocumentAction.prototype.setLargeIcon = function(newLargeIcon) {};

/** @override */
sync.api.CreateDocumentAction.prototype.getSmallIcon = function(opt_dpi) {};

/** @override */
sync.api.CreateDocumentAction.prototype.getDescription = function() {};

/**
 * Sets the action's description.
 *
 * @param newDescription the new action description.
 */
sync.api.CreateDocumentAction.prototype.setDescription = function(newDescription) {};

/**
 * Set the action id.
 *
 * @param newActionId the new action id.
 */
sync.api.CreateDocumentAction.prototype.setActionId = function(newActionId) {};

/**
 * Get the action id.
 *
 * @return {string} the action id or null if none was provided.
 */
sync.api.CreateDocumentAction.prototype.getActionId = function() {};

/**
 * Sets the action name.
 *
 * The action name is displayed under the action large icon.
 *
 * @param newName the new name.
 */
sync.api.CreateDocumentAction.prototype.setActionName = function(newName) {};

/**
 * Handles the rendering of the action's large icon.
 *
 * @return {HTMLElement} the rendered large icon.
 */
sync.api.CreateDocumentAction.prototype.renderLargeIcon = function() {};

/** @override */
sync.api.CreateDocumentAction.prototype.dispose = function() {};

