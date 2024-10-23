
namespace('sync.api');


/**
 * Editing context manager. To get access to this manager use {@link sync.api.Workspace#getEditingContextManager}.
 *
 * Initially, the context is built from the following URL parameters:
 * - ditamap
 * - dita.val.url
 *
 * @constructor
 * @extends {goog.events.EventTarget}
*/
sync.api.EditingContextManager = function() {};

/**
 * Return the DITA context used by the current tab.
 *
 * @since 22
 *
 * @return {sync.api.DitaContext} The DITA context.
 */
sync.api.EditingContextManager.prototype.getDitaContext = function() {};

/**
 * Updates the new context - assumes the server-side model of the current editor already has the context set.
 * The server-side model's context can be set using the <code>ro.sync.servlet.operation.SetDitaMapOperation</code> operation.
 *
 * @since 22
 *
 * @param {sync.api.DitaContext} context The DITA context for the current file. Currently only instances of {sync.dita.DitaContext}
 * are supported to provide editing context for DITA files.
 */
sync.api.EditingContextManager.prototype.updateDitaContext = function(context) {};

/**
 * Event types for the editing context manager.
 *
 * @enum {string}
 */
sync.api.EditingContextManager.EventTypes = {
  CONTEXT_CHANGED: 'editing_context_changed'
};
