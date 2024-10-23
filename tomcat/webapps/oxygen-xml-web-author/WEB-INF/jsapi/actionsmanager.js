namespace('sync.api');


/**
 * Manager for the actions available for an editor.
 *
 * @constructor
 * @extends {sync.api.ActionsManagerCore}
*/
sync.api.ActionsManager =function() {};


/**
 * Invokes an Author Operation asynchronously.
 *
 * @param {String} className The name of the Java class implementing the operation. It can be either an implementation of
 *   AuthorOperation or AuthorOperationWithResult.
 *   AuthorOperation has a couple of useful implementation for modifying the document structure (see subclasses of
 *   https://www.oxygenxml.com/InstData/Editor/SDK/javadoc/ro/sync/ecss/extensions/api/AuthorOperation.html).
 *   AuthorOperationWithResult can be used to pass a result back to the JS code after executing the operation on the
 *   server.
 *   If the operation is a custom one, it should annotate it with ro.sync.ecss.extensions.api.webapp.WebappRestSafe in
 *   order for Web Author to allow invoking it from client-side code.
 *
 * @param {Object} params An object mapping param names to parameter values. Here you can find details about the
 *                                                                  arguments of default operations for the Author mode:
 * https://www.oxygenxml.com/doc/help.php?product=editor&platform=standalone&pageId=dg-default-author-operations
 * @param {function(object=, object=)=} callback The Node-style callback to call when the operation finished executing.
 *   The callback's first argument is the error object or null; the second one is the actual result.
 *   In order to return a result from an operation one has to implement
 *   ro.sync.ecss.extensions.api.webapp.AuthorOperationWithResult .
 *   The callback receives an error if there is a problem communicating with the server. If the AuthorOperation throws
 *   an <code>AuthorOperationException</code> exception with the <code>isOperationRejectedOnPurpose</code> flag
 *   set to true, on the server an error dialog will be shown to the user but the error parameter of the callback will
 *   be null.
 * @param {Selection=} opt_selection The selection in whose context to execute the operation,
 * if not passed the current selection is used.
 *
 * @param {boolean=} opt_background flag indicating whether the operation is executed in the background. If true,
 * after the action is executed, the following happens:
 * <ul>
 *   <li> the current user selection is not changed, even if the action explicitly moves the caret
 *   <li> the focus is not sent to the editor
 * </ul>
 *
 */
sync.api.ActionsManager.prototype.invokeOperation = function(className, params, callback, opt_selection, opt_background) {};

/**
 * Registers an action for the given ID. It will override any previous registration that uses the same ID.
 *
 * The builtin actions (e.g. Undo, Redo, Add Comment) and the actions defined in the framework (e.g. Bold, Italic,
 * Underline) are registered using the same mechanism, so they might override your registration depending on which
 * comes first. To make sure your actions are not overridden you can listen on the
 * {@link sync.api.Editor.EventTypes.ACTIONS_LOADED}.
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

