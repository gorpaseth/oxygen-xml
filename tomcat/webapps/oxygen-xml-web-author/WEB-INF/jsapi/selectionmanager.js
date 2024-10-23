namespace('sync.api');


/**
 * The selection manager. To get access to it use {@link sync.api.Editor#getSelectionManager}.
 *
 * It can be used to retrieve and modify the selection as well as listening for selection changing events.
 *
 * @constructor
 * @extends {goog.events.EventTarget}
*/
sync.api.SelectionManager = function() {};



/**
 * @return {sync.api.Selection} The selection of the document.
 */
sync.api.SelectionManager.prototype.getSelection = function() {};


/**
 * @param {sync.api.Selection} sel The selection to be set.
 * @param {{focus: boolean}=} options Options object. <ul>
 *   <li> focus: by default <code>true</code>. When false, a fake selection is rendered and the focus is not moved
 *      to the editor.
 * </ul>
 */
sync.api.SelectionManager.prototype.setSelection = function(sel, options) {};

/**
 * Restore the current selection in browser.
 *
 * @since 24
 */
sync.api.SelectionManager.prototype.restoreSelectionInBrowser = function() {};

/**
 * Scroll the editor until the content represented by the selection is visible.
 * @param {sync.api.Selection} selection The selection to scroll into view.
 */
sync.api.SelectionManager.prototype.scrollSelectionIntoView = function(selection) {};

/**
 * Returns a selection that is empty and is located inside the given node, at the given position.
 *
 * @param {Node} node The element, comment or PI in which the selection is positioned.
 * @param {string} pos The position of the caret:
 *  <ul>
 *      <li>'before' means before all children nodes
 *      <li>'after' that means after all children nodes
 *  </ul>
 *
 * @return {sync.api.Selection} The selection.
 *
 * @since 22.1
 */
sync.api.SelectionManager.prototype.createEmptySelectionInNode = function(node, pos) {};

/**
 * Create a selection around the given node.
 * @param {Node} node The node which selection should wrap. 
 *
 * @return {sync.api.Selection} The selection object.
 *
 * @since 22.1
 */
sync.api.SelectionManager.prototype.createAroundNode = function(node) {};

/**
 * Creates an empty selection before the given node.
 *
 * @param {Node} node The reference node.
 *
 * @return {sync.api.Selection} The selection.
 * @since 22.1
 */
sync.api.SelectionManager.prototype.createEmptySelectionBeforeNode = function(node) {};

/**
 * Creates an empty selection after the given node.
 *
 * @param {Node} node The reference node.
 *
 * @return {sync.api.Selection} The selection.
 * @since 22.1
 */
sync.api.SelectionManager.prototype.createEmptySelectionAfterNode = function(node) {};

/**
 * Creates an empty selection inside the given text node at the given offset.
 * The offset should be greater or equal to 0 and less than the length of the text in the given node.
 *
 * @param {Text} textNode The text node.
 * @param {number} offset The offset inside the text.
 *
 * @return {sync.api.Selection} The selection.
 * @since 22.1
 */
sync.api.SelectionManager.prototype.createEmptySelectionInTextNode = function(textNode, offset) {};


/**
 * Creates an empty selection at a position that is "offset" steps to the right of the start/end tag of the given "node".
 * A step means either a content character, a start tag of a node or an end tag of a node.
 *
 * For example, with this XML content:
 * <code>
 * &lt;p>I &lt;b>like&lt;/b> XML.&lt;/p>
 * </code>
 * The following call:
 * <code>
 * selectionManager.createEmptySelectionRelativeToNode(p, 5, true)
 * </code>
 * Creates a position in the word "like" as presented below:
 * <code>
 * &lt;p>I &lt;b>li|ke&lt;/b> XML.&lt;/p>
 * </code>
 *
 * @param {Node} node The element, comment or PI used as a reference for the selection position.
 * @param {number} offset The number of steps to the right of the start/end tag of the reference node.
 * @param {boolean=} opt_fromNodeEndTag true, to create the selection relative to the end tag of the given node rather
 * than to its start.
 */
sync.api.SelectionManager.prototype.createEmptySelectionRelativeToNode = function(node, offset, opt_fromNodeEndTag) {};

/**
 * The selection changed event type.
 *
 * @enum {String}
 */
sync.api.SelectionManager.EventType = {
  /**
   * Event triggered when the document selection was changed.
   */
  SELECTION_CHANGED: 'selection-changed'
};

/**
 * @Deprecated Use {@link sync.api.SelectionManager} instead.
 */
sync.api.SelectionModel = {};

/**
 * The selection changed event type.
 *
 * @enum {String}
 *
 * @Deprecated Use {@link sync.api.SelectionManager.EventType} instead.
 */
sync.api.SelectionModel.EventType = {
  /**
   * Event triggered when the document selection was changed.
   */
  SELECTION_CHANGED: 'selection-changed'
};

export default sync.api.SelectionManager;