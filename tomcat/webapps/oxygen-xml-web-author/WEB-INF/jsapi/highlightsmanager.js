
namespace('sync.api');


/**
 * Manages non persistent highlights. To get access to this manager use {@link sync.api.AuthorWidgetsFactory#getHighlightsManager}.
 *
 * For adding and removing highlights this manager uses two default operations: ro.sync.servlet.operation.RemoveHighlightsOperation
 * and ro.sync.servlet.operation.AddHighlightOperation
 * For custom implementation of this operations you can create your own Author operations
 * (see {@link sync.api.ActionsManager#invokeOperation})
 *
 * To listen for highlights updates register a listener on this manager:
 * </p>
 * <pre>
 * highlightsManager.listen(sync.api.HighlightUpdateEvent.EventType.HIGHLIGHT_ADDED, function(e) {
 * });
 * highlightsManager.listen(sync.api.HighlightUpdateEvent.EventType.HIGHLIGHT_REMOVED, function(e) {
 * });
 *
 * @since 21.1
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
sync.api.HighlightsManager = function() {};

/**
 * Adds a highlight over the current selection.
 *
 * @param {String} className The name of the CSS class used to render the highlight.
 * @param {Map<String, String>=} attributes The attributes of the highlight to be added on the HTML element
 * generated for this highlight.
 * @param {function(object=, String=)} callback The callback when the highlight is added.
 *   The callback's first argument is the error object or null; the second one is the id of the added highlight.
 */
sync.api.HighlightsManager.prototype.addHighlight = function(className, attributes, callback) {};

/**
 * Updates a highlight.
 *
 * @param {String} id The id of the highlight to update.
 * @param {String} className The name of the CSS class used to render the highlight.
 * If null, the class remains unchanged.
 * @param {Map<String, String>=} attributes The attributes to be updated.
 * If null, the attributes remain unchanged.
 * @param {function(object=, String=)} callback The callback when the highlight update is done.
 * The callback's first argument is the error object or null; the second one is the new id of the highlight.
 */
sync.api.HighlightsManager.prototype.updateHighlight = function(id, className, attributes, callback) {};

/**
 * Get the attributes of a highlight.
 *
 * @param {String} id The id of the highlight.
 *
 * @return {Map<String, String>} The map between attributes names and values.
 *
 * @since 21.1.1
 */
sync.api.HighlightsManager.prototype.getHighlightAttributes = function(id) {};

/**
 * Removes highlights.
 *
 * @param {String[]} ids The ids of the highlights to be removed.
 * @param {function(object=)} callback The callback when the highlights are removed. The callback's argument is the error
 * object or null.
 */
sync.api.HighlightsManager.prototype.removeHighlights = function(ids, callback) {};

/**
 * Select a specific highlight.
 *
 * @param {String} highlightId The id of the highlight to be selected.
 */
sync.api.HighlightsManager.prototype.selectHighlight = function(highlightId) {};

/**
 * Scroll to a specific highlight.
 *
 * @param {String} highlightId The id of the highlight to be selected.
 */
sync.api.HighlightsManager.prototype.scrollToHighlight = function(highlightId) {};

/**
 * Get all the highlights at caret.
 *
 * @param {boolean=} matchStartEnd If true, the results match markers that start / end at the given position (by default it's false).
 *
 * @return {Array.<string>} The ids of the highlights at caret.
 */
sync.api.HighlightsManager.prototype.getHighlightsAtCaret = function(matchStartEnd) {};

/**
 * @param {string} highlightId The highlight id.
 * @returns {Selection|null} The selection.
 */
sync.api.HighlightsManager.prototype.getHighlightSelection = function(highlightId) {};

/**
 * The event triggered by a highlight update.
 *
 * @param {string} id The id of the marker.
 * @param {sync.api.HighlightUpdateEvent.EventType|string} type The type of the change.
 *
 * @constructor
 */
sync.api.HighlightUpdateEvent = function(id, type) {
 /**
  * The type of the event: {@link sync.api.HighlightUpdateEvent.EventType}.
  *
  * @type {string}
  */
 this.type = null;
 /**
  * The ID of the highlight.
  * @type {string}
  */
 this.id = null;
};

/**
 * The highlight update event types.
 * Dispatched by sync.api.HighlightsManager
 * @enum
 */
sync.api.HighlightUpdateEvent.EventType = {
  /**
   * Triggered when a highlight is added on server side
   */
  HIGHLIGHT_ADDED: 'highlight_added',
  /**
   * Triggered when a highlight is removed on server side
   */
  HIGHLIGHT_REMOVED: 'highlight_deleted'
};




