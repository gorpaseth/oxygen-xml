
namespace('sync.api');


/**
 * Helper object used to render an arrow-line that can connect an HTML element to an XML node in the editor.
 *
 * <br/>
 * Use {@link sync.api.AuthorWidgetsFactory#getGuidingArrowRenderer} to get an instance.
 *
 * @interface
 *
 * @since 22.1
 * @extends {goog.Disposable}
*/
sync.api.GuidingArrowRenderer = function() {};

/**
 * Render an arrow that points to a node from the editor. The arrow is automatically hidden when the selection changes
 * in the editor or when the editor is scrolled.
 *
 * <br/>
 * <b>Note:</b> If the sourceElement parameter is missing or if it is located at the left of the editor then the arrow
 * line will not be rendered, only its tip will be rendered at the given node.
 *
 * @param {Node} node The API DOM node to point to.
 * @param {HTMLElement} [sourceElement] The optional source element from were the arrow line will start.
 */
sync.api.GuidingArrowRenderer.prototype.showArrowToNode = function(node, sourceElement) {};

/**
 * Hide last rendered arrow. The arrow hides automatically but you can use this method if you want to hide it faster,
 * when the source element is changed for example.
 */
sync.api.GuidingArrowRenderer.prototype.hideArrow = function() {};



