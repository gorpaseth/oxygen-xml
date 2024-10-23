
namespace('sync.api');


/**
 * Manages custom persistent highlights. To get access to this manager use
 * {@link sync.api.AuthorEditingSupport#getPersistentHighlightsManager}.
 *
 * The custom persistent highlights are serialized in the XML as processing instructions with the following form:
 * <br>
 * <code>&lt;?oxy_custom_start prop1="val1"....?> xml content &lt;?oxy_custom_end?></code>
 * <br><br>
 * This manager allows you to add a single highlight at a time, by using the async
 * {@link sync.api.PersistentHighlightsManager#addHighlight} operation.
 * If multiples highlights needs to be added in a single step, you can [create an AuthorOperation]{@tutorial modifydoc}
 * that uses the server side ro.sync.ecss.extensions.api.highlights.AuthorPersistentHighlighter JAVA API.
 *
 * <br><br>
 * To listen for highlights updates register a listener on this manager:
 * </p>
 * <pre>
 * highlightsManager.listen(sync.api.PersistentHighlightUpdateEvent.EventType.HIGHLIGHT_ADDED, function(e) {
 * });
 * highlightsManager.listen(sync.api.PersistentHighlightUpdateEvent.EventType.HIGHLIGHT_REMOVED, function(e) {
 * });
 *
 * @since 22.1
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
sync.api.PersistentHighlightsManager = function() {};

/**
 * Adds a custom highlight over the current selection.
 *
 * @param {Map<String, String>=} attributes The attributes of the highlight to be added on the HTML element
 * generated for this highlight.
 * The value of the "className" attribute will also be added to the class name list of the generated element.
 * @param {function(object=, String=)} callback The callback when the highlight is added.
 * The callback's first argument is the error object or null; the second one is the id of the added highlight.
 */
sync.api.PersistentHighlightsManager.prototype.addHighlight = function(attributes, callback) {};

/**
 * Updates a highlight.
 *
 * @param {String} id The id of the highlight to update.
 * @param {Map<String, String>=} attributes The attributes to be updated.
 * If the map is null, the attributes remain unchanged. To remove an attribute, add it to the map with a null value.
 * @param {function(object=, String=)} callback The callback when the highlight update is done.
 * The callback's first argument is the error object or null; the second one is the new id of the highlight.
 */
sync.api.PersistentHighlightsManager.prototype.updateHighlight = function(id, attributes, callback) {};

/**
 * Get the attributes of a highlight.
 *
 * @param {String} id The id of the highlight.
 *
 * @return {object} The object representing the highlights attributes
 */
sync.api.PersistentHighlightsManager.prototype.getHighlightAttributes = function(id) {};

/**
 * Removes highlights.
 *
 * @param {String[]} ids The ids of the highlights to be removed.
 * @param {function(object=)} callback The callback when the highlights are removed. The callback's argument is the error
 * object or null.
 */
sync.api.PersistentHighlightsManager.prototype.removeHighlights = function(ids, callback) {};

/**
 * Select a specific highlight.
 *
 * @param {String} highlightId The id of the highlight to be selected.
 */
sync.api.PersistentHighlightsManager.prototype.selectHighlight = function(highlightId) {};

/**
 * Scroll to a specific highlight.
 *
 * @param {String} highlightId The id of the highlight to be selected.
 */
sync.api.PersistentHighlightsManager.prototype.scrollToHighlight = function(highlightId) {};

/**
 * Get all the custom persistent highlights at caret.
 *
 * @param {boolean=} matchStartEnd If true, the results match markers that start / end at the given
 *                                position (by default it's false).
 *
 * @return {Array.<string>} The ids of the highlights at caret.
 */
sync.api.PersistentHighlightsManager.prototype.getHighlightsAtCaret = function(matchStartEnd) {};

/**
 * Get all highlights.
 *
 * @return {Array.<string>} The ids of all highlights.
 */
sync.api.PersistentHighlightsManager.prototype.getAllHighlights = function() {};

/**
 * Ge the selection corresponding to a highlight
 * @param {string} highlightId The highlight id.
 * @returns {sync.api.Selection|null} The selection.
 */
sync.api.PersistentHighlightsManager.prototype.getHighlightSelection = function(highlightId) {};

/**
 * The event triggered by a custom highlight update.
 *
 * @param {string} id The id of the highlight.
 * @param {sync.api.PersistentHighlightUpdateEvent.EventType|string} type The type of the change.
 *
 * @constructor
 */
sync.api.PersistentHighlightUpdateEvent = function(id, type) {
 /**
  * The type of the event: {@link sync.api.PersistentHighlightsManager.EventType}.
  *
  * @type {string}
  */
 this.type = null;
 /**
  * The ID of the highlight.
  *
  * @type {string}
  */
 this.id = null;
};

/**
 * The custom persistent highlight update event types.
 * Dispatched by sync.api.PersistentHighlightsManager
 * @enum
 */
sync.api.PersistentHighlightUpdateEvent.EventType = {
  /**
   * Triggered when a highlight is added on server side
   */
  HIGHLIGHT_ADDED: 'highlight_added',
  /**
   * Triggered when a highlight is removed on server side
   */
  HIGHLIGHT_REMOVED: 'highlight_deleted',
  /**
   * Triggered when a highlight is rchanged on server side
   */
  HIGHLIGHT_CHANGED: 'highlight_changed'
};

