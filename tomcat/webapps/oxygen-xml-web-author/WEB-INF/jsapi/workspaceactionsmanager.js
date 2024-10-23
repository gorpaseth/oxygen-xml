
namespace('sync.api');


/**
 * Manages the actions available for the workspace.
 *
 * @constructor
 */
sync.api.WorkspaceActionsManager = function() {};

/**
 * Register a sync.api.CreateDocumentAction.
 *
 * All the registered CreateDocumentActions will appear on the user's dashboard.
 *
 * @param {sync.api.CreateDocumentAction} createAction The action to register.
 */
sync.api.WorkspaceActionsManager.prototype.registerCreateAction = function(createAction) {};


/**
 * Register a sync.actions.OpenAction used to open documents in a file repositories.
 *
 * All the registered OpenActions will appear on the user's dashboard.
 *
 * @param {sync.actions.OpenAction} openAction The action to register.
 */
sync.api.WorkspaceActionsManager.prototype.registerOpenAction = function(openAction) {};


