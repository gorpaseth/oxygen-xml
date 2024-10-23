namespace('sync.api');


/**
 * The document selection.
 *
 * @interface
 * @constructor
 */
sync.api.Selection = function() {};


/**
 * Checks whether the selection is empty.
 *
 * @return {boolean} true if the selection is empty.
 */
sync.api.Selection.prototype.isEmpty = function() {};

/**
 * Compare this selection with the given one.
 *
 * @param {sync.api.Selection} sel The selection to compare with.
 *
 * @return {boolean} true if the two selection are equal.
 */
sync.api.Selection.prototype.equals = function(sel) {};

/**
 * Returns the node at caret if the selection is empty.
 *
 * <p>If the caret is "on" {@link sync.api.Selection#getCaretPositionInformation} a start tag of an element "X", it is
 * considered to be outside the node "X", so the returned node is the parent of "X".
 *
 * @param {boolean=} opt_includeTextNodes If present and <code>true</code> will include text nodes. By default text nodes are ignored.
 * @return {Node|null} The node at caret if the selection is empty.
 */
sync.api.Selection.prototype.getNodeAtCaret = function(opt_includeTextNodes) {};

/**
 * Returns the element, comment or PI that is fully selected.
 *
 * @return {Node} The element, comment or PI which is fully selected.
 */
sync.api.Selection.prototype.getFullySelectedNode = function() {};

/**
 * Returns a new selection which is created by extending the current selection to the position that is "offset" steps
 * to the right of the start/end tag of the given "node".
 * A step means either a content character, a start tag of a node or an end tag of a node.
 *
 * For example, with this XML content, and the selection represented as a vertical line:
 * <code>
 * &lt;p>I &lt;b>|like&lt;/b> XML.&lt;/p>
 * </code>
 * The following call:
 * <code>
 * var extendedSel = sel.extendedTo(p, 7, true)
 * </code>
 * creates a new extended selection to select the word "like" as presented below:
 * <code>
 * &lt;p>I &lt;b>|like|&lt;/b> XML.&lt;/p>
 * </code>
 *
 * @param {Node} node The element, comment, or PI used as a reference for the selection position.
 * @param {number} offset The number of steps to the right of the start/end tag of the reference node.
 * @param {boolean=} opt_fromNodeEndTag true, to create the selection relative to the end tag of the given node rather
 * than to its start.
 *
 * @return {sync.api.Selection}
 */
sync.api.Selection.prototype.extendedTo = function(node, offset, opt_fromNodeEndTag) {};

/**
* Returns the node at the current selection.
* <p>If the current selection is empty, the node in which the selection resides is returned.</p>
* <p>If the selection is around an entire node, that node will be returned.</p>
* <p>If the selection spans multiple nodes, the node where the selection has ended is returned.</p>
*
* @param {boolean=} opt_includeTextNodes If present and <code>true</code> will include text nodes. By default text nodes are ignored.
*
* @return {Node} The node at the current selection.
*/
sync.api.Selection.prototype.getNodeAtSelection = function(opt_includeTextNodes) {};

/**
 * Returns the node at the current selection.
 * <p>If the current selection is empty, the node in which the selection resides is returned.</p>
 * <p>If the selection is around an entire node, that node will be returned.</p>
 * <p>If the selection spans multiple nodes, the node at the start of it.</p>
 *
 * @param {boolean=} opt_includeTextNodes If present and <code>true</code> will include text nodes. By default text nodes are ignored.
 *
 * @return {Node} The node at the current selection.
 */
sync.api.Selection.prototype.getNodeAtSelectionStart = function(opt_includeTextNodes) {};

/**
 * Returns the node at the current selection.
 * <p>If the current selection is empty, the node in which the selection resides is returned.</p>
 * <p>If the selection is around an entire node, that node will be returned.</p>
 * <p>If the selection spans multiple nodes, the node at the end of it.</p>
 *
 * @param {boolean=} opt_includeTextNodes If present and <code>true</code> will include text nodes. By default text nodes are ignored.
 *
 * @return {Node} The node at the current selection.
 */
sync.api.Selection.prototype.getNodeAtSelectionEnd = function(opt_includeTextNodes) {};

/**
 * Computes the bounding rectangle of the selection.
 * @return {sync.api.math.Rect|null} Bounding rectangle or <code>null</code> if it cannot be computed.
 *                                   Its position is relative to the viewport.
 */
sync.api.Selection.prototype.getBoundingClientRect = function() {};

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
 * @deprecated use {@link sync.api.SelectionManager#createEmptySelectionInNode}
 */
sync.api.Selection.createEmptySelectionInNode = function(node, pos) {};


/**
 * Create a selection around the given node.
 * @param {Node} node The node which selection should wrap.
 *
 * @return {sync.api.Selection} The selection object.
 * @deprecated use {@link sync.api.SelectionManager#createAroundNode}
 */
sync.api.Selection.createAroundNode = function(node) {};

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
 * Selection.createEmptySelectionRelativeToNode(p, 5, true)
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
 * @deprecated use {@link sync.api.SelectionManager#createEmptySelectionRelativeToNode}
 */
sync.api.Selection.createEmptySelectionRelativeToNode = function(node, offset, opt_fromNodeEndTag) {};

/**
 * Information describing a position.
 * @constructor
 */
sync.api.PositionInformation = function() {};
/**
 * Get the element, the comment or the PI that contains the position.
 * This method doesn't return text nodes.
 * @return {Node}
 */
sync.api.PositionInformation.prototype.getParentNode = function() {};
/**
 * In case of o position placed on a tag, this will return the element, the comment or the PI represented by the tag.
 * @return {Node}
 */
sync.api.PositionInformation.prototype.getNodeOfTag = function() {};
/**
 * @return {boolean} <code>true</code> if position is on a start tag.
 */
sync.api.PositionInformation.prototype.isOnStartTag = function() {};
/**
 * @return {boolean} <code>true</code> if position is on an end tag.
 */
sync.api.PositionInformation.prototype.isOnEndTag = function() {};
/**
 * @return {boolean} <code>true</code> if position is inside a text node.
 */
sync.api.PositionInformation.prototype.isOnText = function() {};
/**
 * @return {number|null} when <code>isOnText()</code> is <code>true</code> this will return the offset in the text node.
 */
sync.api.PositionInformation.prototype.getOffsetInText = function() {};

/**
 * Retrieve information about the caret position.
 *
 * <p>The XML content is modeled as a sequence of items that can be either characters and XML (start or end ) tags.
 * The caret is said to be positioned "on" a certain item if it is visually to the left of that item.
 *
 * @return {sync.api.PositionInformation} Information about caret position.
 */
sync.api.Selection.prototype.getCaretPositionInformation = function() {};

export default sync.api.Selection;