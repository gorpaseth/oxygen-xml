
namespace('sync.api');


/**
 * <p>Support for rendering the content of the current editor and for setting the actions,
 * toolbars and views associated with it.
 *
 * <p>Can be obtained by using {@link sync.api.Editor#getEditingSupport}.
 *
 * @param {sync.api.Workspace.LoadingOptions} options The options to be used by the editing support.
 *
 * @constructor
 * @extends {goog.events.EventTarget}
*/
sync.api.EditingSupport = function(options) {
 /**
  * The options used to load the editing support.
  *
  * @type {sync.api.Workspace.LoadingOptions}
  */
 this.options = null;
};

/**
 * Event types.
 * @enum {String}
 */
sync.api.EditingSupport.EventType = {
  DIRTY_STATUS_CHANGED: "AES_dirty_status_changed"
};

/**
 * Dirty status changed event.
 * @param {boolean} isDirty True if is dirty.
 * @constructor
 * @extends {goog.events.Event}
*/
sync.api.EditingSupport.DirtyStatusChangedEvent = function(isDirty) {};

/**
 * Returns the actions manager for the current document.
 *
 * @return {sync.api.ActionsManager} The actions manager.
 */
sync.api.EditingSupport.prototype.getActionsManager = function() {};

/**
 * Returns the selection manager of the document.
 *
 * @return {sync.api.SelectionManager} The selection manager.
 */
sync.api.EditingSupport.prototype.getSelectionManager = function() {};

/**
 * Returns the handler for non persistent highlights.
 *
 * @return {sync.api.HighlightsManager|null} The highlights manager.
 */
sync.api.EditingSupport.prototype.getHighlightsManager = function() {};

/**
 * A callback invoked when the asynchronous request for the content finishes.
 *
 * If the operation is successful, the first parameter is <code>null</code> and the second one is a string that represents
 * the content. In case of an error, the first parameter is an object describing  the error.
 *
 * @callback sync.api.EditingSupport~onContentReceived
 *
 * @param {object} error The error object, or null if the request was successful.
 * @param {string} content The serialized XML content.
 */

/**
 * Retrieves the content of the document asynchronously.
 *
 * @param {sync.api.EditingSupport~onContentReceived} callback The callback that will be called
 * once the XML content is retrieved.
 */
sync.api.EditingSupport.prototype.getContent = function(callback) {};

/**
 * Initializes the editing support.
 *
 * @param {Object} newDoc The document created by the server.
 * @param {string} newDoc.contentType The MIME type of the document.
 * @param {string=} newDoc.document The content of the document, for documents with a text/* MIME type.
 * @param {HTMLElement} docContainer The element in which we add our editor.
 * @param {NotificationsManager} problemReporter The problem reporter.
 *
 * @return {Thenable} An object with a 'then' method that fulfills when the editing support is loaded.
 */
sync.api.EditingSupport.prototype.load = function(newDoc, docContainer, problemReporter) {};

/**
 * Get the type of the editor.
 *
 * @returns {sync.api.Editor.EditorTypes} the type of the editor.
 */
sync.api.EditingSupport.prototype.getType = function() {};

/**
 * Focus the editing support.
 */
sync.api.EditingSupport.prototype.focus = function() {};

/**
 * Get the handler for dragging resources inside the editor area.
 *
 * @returns {sync.view.ResourceDragHandler} Resource drag handler.
 */
sync.api.EditingSupport.prototype.getResourceDragHandler = function() {};

/**
 * Get the editor spellchecker.
 *
 * @returns {sync.api.SpellChecker} The spellchecker.
 */
sync.api.EditingSupport.prototype.getSpellChecker = function() {};

/**
 * Get the configuration of the application toolbar. By default the application toolbar is displayed on the left side of
 * the file name, next to the application icon (on small screns it is the first toolbar from the toolbars bar).
 *
 * @return {Array<sync.api.Editor.ActionsLoadedEvent.ActionsListDescriptor>}  The toolbars actions list descriptor.
 */
sync.api.EditingSupport.prototype.getApplicationToolbar = function() {};

/**
 * Get the configuration of the first toolbar.
 *
 * @return {Array<sync.api.Editor.ActionsLoadedEvent.ActionsListDescriptor>}  The toolbars actions list descriptor.
 */
sync.api.EditingSupport.prototype.getFirstToolbar = function() {};

/**
 * Get the configuration of other toolbars.
 *
 * @param {function(Array<sync.api.Editor.ActionsLoadedEvent.ActionsListDescriptor>)} done Callback when the toolbars
 * actions list descriptor is ready to be used.
 */
sync.api.EditingSupport.prototype.getOtherToolbars = function(done) {};

/**
 * Method that disposes the editing support. Sub-classes must call the super implementation of this method.
 *
 * Use it to do things like:
 * - dispose dialogs
 * - stop timers
 * - unregister listeners on global objects, etc.
 */
sync.api.EditingSupport.prototype.disposeInternal = function() {};

/**
 * Get the URL of the document.
 *
 * @return {string} The URL.
 */
sync.api.EditingSupport.prototype.getUrl = function() {};

/**
 * Scrolls the document to the anchor of the url, if any.
 *
 * @param {string} url The url.
 *
 * @return {boolean} True if the scroll is possible.
 */
sync.api.EditingSupport.prototype.scrollToAnchor = function(url) {};

/**
 * @return {sync.api.ConcurrentEditingManager|null} The concurrent editing manager for the current document, or null if
 *   concurrent editing is not supported for the current type of document.
 */
sync.api.EditingSupport.prototype.getConcurrentEditingManager = function() {};

export default sync.api.EditingSupport;