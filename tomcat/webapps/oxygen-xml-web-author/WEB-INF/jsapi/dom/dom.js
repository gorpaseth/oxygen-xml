namespace('sync.api.dom');



/**
 * @param {string|HTMLElement} nodeOrId The id of the node, or the node itself.
 * @param {XmlModel} xmlModel The XML model.
 * 
 * @return {HTMLElement} The HTML element that corresponds to the #document XML node that contains the give node.
 *
 * @ignore
 */
function getHtmlElementOdDocumentNode(nodeOrId, xmlModel) {
  var htmlElement;
  if (typeof nodeOrId === "string") {
    htmlElement = xmlModel.getXmlNodeById(nodeOrId);
    if (!htmlElement) {
      throw new StaleNodeError(nodeOrId);
    }
  } else {
    htmlElement = nodeOrId;
  }

  while (!XmlDom.isDocument(htmlElement)) {
    htmlElement = XmlDom.getParentNode(htmlElement);
  }
  return htmlElement;
}

/**
 * Find the deepest common ancestor of the given nodes.
 * @param {...Node} varArgs The nodes to find a common ancestor of.
 * @return {Element|null} The common ancestor of the nodes, or null if there is none.
 */
sync.api.dom.findCommonAncestor = function(varArgs) {};

/**
 * Returns the element matched by the predicate.
 *
 * @param {Node} node the node whose ancestor to find.
 *
 * @param {function(Element)} predicate the predicate function.
 *
 * @return {Element} the ancestor whose tag name satisfies the predicate.
 */
sync.api.dom.getAncestorElement = function(node, predicate) {};

/**
 * Base interface for DOM nodes.
 *
 * @interface Node
 * @property {string} nodeName The name of this node, depending on its type.
 *   <li> Attr - the attribute qualified name
 *   <li> Comment - #comment
 *   <li> Document - #document
 *   <li> Element - the element's qualified name
 *   <li> EntityReference - the name of the entity
 *   <li> Processing Instruction - the target of the processing instruction
 *   <li> Text - #text
 * @property {string} nodeValue The value of this node, depending on its type
 *   <li> Attr - the attribute value
 *   <li> Comment - the comment's content
 *   <li> Processing Instruction - the data of the processing instruction
 *   <li> Text - the text content
 *   <li> Otherwise, null
 * @property {number} nodeType The type of the node. One of these values <ul>
 *   <li> ELEMENT - 1
 *   <li> ATTRIBUTE - 2
 *   <li> TEXT - 3
 *   <li> ENTITY_REFERENCE - 5
 *   <li> PROCESSING_INSTRUCTION - 7
 *   <li> COMMENT - 8
 *   <li> DOCUMENT - 9
 * </ul>
 * @property {Node} parentNode The parent of the current node, null for the #document node and for
 *  attributes.
 * @property {NodeList} childNodes A NodeList that contains all children of this node. If there are no
 *   children, this is a NodeList containing no nodes
 * @property {Node} firstChild The first child of this node. If there is no such node, this returns null.
 * @property {Node} lastChild The last child of this node. If there is no such node, this returns null.
 * @property {Node} previousSibling The node immediately preceding this node. If there is no such node,
 *  this returns null.
 * @property {Node} nextSibling The node immediately following this node. If there is no such node,
 *    this returns null.
 * @property {NamedNodeMap} attributes A NamedNodeMap containing the attributes of this node
 *   (if it is an Element) or null otherwise
 * @property {Document} ownerDocument The Document object associated with this node.
 * @property {string} namespaceURI The namespace URI of this node - null if there is no namespace or if the node is
 *   not Element or Attribute.
 * @property {string} prefix The prefix of this node -  null if there is no namespace or if the node is
 *   not Element or Attribute.
 * @property {string} localName The local name of this node, null if not attribute or element.
 * @property {string} baseURI The base URI for this node - it takes content references and xi:includes into account, but
 *   not the xml:base attribute.
 * @property {string} textContent The text content of the node - it ignores descendant comments and processing
 *   instructions. For attributes it returns the its value.
 */

/**
 * Returns whether this node has any children.
 * @method
 * @name Node#hasChildNodes
 * @returns {boolean} true if the node has child nodes.
 */


/**
 * Compares the reference node, i.e. the node on which this method is being called, with a node, i.e. the one passed as
 * a parameter, with regard to their position in the document and according to the document order.
 * @method
 * @name Node#compareDocumentPosition
 * @param {Node} other The node to compare to.
 * @returns {number} A bitmask with the following values from the Node class:
 *   <li> DOCUMENT_POSITION_CONTAINED_BY - The node is contained by the reference node.
 *      A node which is contained is always following, too.
 *   <li> DOCUMENT_POSITION_CONTAINS - The node contains the reference node. A node which contains is always
 *      preceding, too.
 *   <li>DOCUMENT_POSITION_DISCONNECTED - The two nodes are disconnected. Order between disconnected nodes is
 *     always implementation-specific.
 *   <li>DOCUMENT_POSITION_FOLLOWING - The node follows the reference node.
 *   <li>DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC - The determination of preceding versus following is
 *     implementation-specific.
 *   <li>DOCUMENT_POSITION_PRECEDING - The second node precedes the reference node.
 */

/**
 * Returns whether this node has any children.
 * @method
 * @name Node#hasChildNodes
 * @returns {boolean} true if the node has child nodes.
 */

/**
 * The API may return different JS DOM objects for the same XML node - to detect this case, use this method.
 * @method
 * @name Node#isSameNode
 * @param {Node} other The node to compare to.
 * @returns {boolean} true if the two objects represent the same XML node.
 */

/**
 * Test if two nodes have the same structure.
 * @method
 * @name Node#isEqualNode
 * @param {Node} other The node to compare to.
 * @returns {boolean} true if the two nodes have the same structure.
 */

/**
 * Look up the prefix associated to the given namespace URI, starting from this node. The default namespace
 *   declarations are ignored by this method.
 * @method
 * @name Node#lookupPrefix
 * @param {string} namespaceURI The URI of the namespace.
 * @returns {string} the associated prefix, or null if there is no associated prefix. If there are multiple mappings,
 *   return the closest one to this node.
 */

/**
 * Look up the namespace URI associated to the given prefix, starting from this node.
 * @method
 * @name Node#lookupNamespaceURI
 * @param {string} prefix The URI of the namespace.
 * @returns {string} the mapped namespace URI.
 */

/**
 * Returns true if the node has attributes.
 * @method
 * @name Node#hasAttributes
 * @returns {true} if the node has attributes.
 */

/**
 * Interface for the document nodes.
 *
 * @interface Document
 * @extends Node
 *
 * @property {object} doctype always null.
 * @property {object} implementation A dummy object.
 * @property {Element} documentElement The root element.
 * @property {string} documentURI The URI of the document.
 */

/**
 * Returns a NodeList of all the Elements in document order with a given tag name and are contained in the document.
 * @method
 * @name Document#getElementsByTagName
 * @param {string} tagName The tagName of the elements, or '*' to match all elements.
 * @returns {NodeList} The list of elements.
 */

/**
 * Returns a NodeList of all the Elements in document order with a given name and namespace and are
 *   contained in the document.
 * @method
 * @name Document#getElementsByTagNameNS
 * @param {string} localName The localName of the elements, or '*' to match all element names.
 * @param {string} namespaceURI The namespaceURI of the elements, or '*' to match all namespaces.
 *
 * @returns {NodeList} The list of elements.
 */

/**
 * Returns the Element that has an ID attribute with the given value. If no such element exists, this returns null.
 * If more than one element has an ID attribute with that value, the first one is returned.
 * @method
 * @name Document#getElementById
 * @param {string} id The ID to search for.
 * @returns {Element} The element with the given ID.
 */


/**
 * Interface for the element nodes.
 *
 * @interface Element
 * @extends Node
 */

/**
 * Returns the value of the attribute with a given name.
 * @method
 * @name Element#getAttribute
 * @param {string} name The qualified name of the attribute.
 * @returns {string} The value of the attribute.
 */

/**
 * Returns the attribute with a given name.
 * @method
 * @name Element#getAttributeNode
 * @param {string} name The qualified name of the attribute.
 * @returns {Attr} The attribute node.
 */

/**
 * Returns the value of the attribute with a given name and namespace.
 * @method
 * @name Element#getAttributeNS
 * @param {string} name The name of the attribute.
 * @param {string} namespaceURI The namespace URI.
 * @returns {string} The value of the attribute.
 */

/**
 * Returns the attribute with a given name and namespace.
 * @method
 * @name Element#getAttributeNodeNS
 * @param {string} name The name of the attribute.
 * @param {string} namespaceURI The namespace URI.
 * @returns {Attr} The attribute node.
 */

/**
 * Returns true if the node has an attribute with a given name and namespace.
 * @method
 * @name Element#hasAttributeNS
 * @param {string} name The name of the attribute.
 * @param {string} namespaceURI The namespace URI.
 * @returns {true} if the attribute exists.
 */

/**
 * Returns true if the node has an attribute with a given qualified name.
 * @method
 * @name Element#hasAttribute
 * @param {string} name The qualified name of the attribute.
 * @returns {true} if the attribute exists.
 */

/**
 * Returns true if the node has a pseudo-class with a given name.
 * @method
 * @name Element#hasPseudoClass
 * @param {string} name The name of the pseudo-class.
 * @returns {true} if the pseudo-class is set.
 */

/**
 * Returns a NodeList of all the Elements in document order with a given tag name and are contained in the document.
 * @method
 * @name Element#getElementsByTagName
 * @param {string} tagName The tagName of the elements, or '*' to match all elements.
 * @returns {NodeList} The list of elements.
 */

/**
 * Returns a NodeList of all the Elements in document order with a given name and namespace and are
 *   contained in the document.
 * @method
 * @name Element#getElementsByTagNameNS
 * @param {string} localName The localName of the elements, or '*' to match all element names.
 * @param {string} namespaceURI The namespaceURI of the elements, or '*' to match all namespaces.
 *
 * @returns {NodeList} The list of elements.
 */

/**
 * Interface for the text nodes.
 *
 * @interface Text
 * @extends Node
 * @property {string} wholeText The whole text - it does not merge it with text in neighboring entity references.
 * @property {boolean} isElementContentWhitespace true if the node is element content whitespace. Always false.
 * @property {string} data The text.
 * @property {number} length The length of the text.
 */

/**
 * Interface for entity references.
 *
 * @interface EntityRef
 * @extends Node
 */

/**
 * Interface for XML comments.
 *
 * @interface Comment
 * @extends Node
 * @property {string} data The text.
 * @property {number} length The length of the text.
 */

/**
 * Interface for XML processing instructions.
 *
 * @interface ProcessingInstruction
 * @extends Node
 * @property {string} data The content of the processing instruction.
 * @property {string} target The target of the processing instruction.
 */

/**
 * Interface for XML attributes.
 *
 * @interface Attr
 * @extends Node
 * @property {string} name the qualified name of the attribute.
 * @property {boolean} specified true if it is specified in the document, false if defined in the schema.
 * @property {string} value The attribute's value.
 * @property {Element} ownerElement the owner element.
 * @property {object} schemaTypeInfo Always null.
 * @property {boolean} isId If the name is "id" in any namespace.
 */

/**
 * Interface for lists of nodes. It supports array-like indexing.
 *
 * @interface NodeList
 * @property {number} length The length of the list.
 */

/**
 * Returns an item in the list.
 * @method
 * @name NodeList#item
 * @param {number} index The index of the item.
 * @returns {Node} The element at index, or null if it does not exist.
 */

/**
 * Interface for maps of nodes.
 *
 * @interface NamedNodeMap
 * @property {number} length The length of the map.
 */

/**
 * Returns an item in the map.
 * @method
 * @name NamedNodeMap#item
 * @param {number} index The index of the item.
 * @returns {Node} The element at index, or null if it does not exist.
 */

/**
 * Returns an item in the map.
 * @method
 * @name NamedNodeMap#getNamedItem
 * @param {string} name The qualified name of the item.
 * @returns {Node} The item with the given name, or null if it does not exist.
 */

/**
 * Returns an item in the map.
 * @method
 * @name NamedNodeMap#getNamedItem
 * @param {string} name The local name of the item.
 * @param {string} namespaceURI The UIR of the namespace of the item.
 * @returns {Node} The item with the given name and namespace, or null if it does not exist.
 */

/**
 * Represents a rectangle.
 *
 * @interface sync.api.math.Rect
 * @property {number} left The X-axis position of the top-left point of the rectangle.
 * @property {number} top The Y-axis position of the top-left point of the rectangle.
 * @property {number} width The width of the rectangle.
 * @property {number} height The height of the rectangle.
 */

export default sync.api.dom;