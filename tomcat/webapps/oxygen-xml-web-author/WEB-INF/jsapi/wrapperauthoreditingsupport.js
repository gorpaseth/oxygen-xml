
namespace('sync.api');


/**
 * Editing support that is a wrapper for other author editing support
 *
 * @param {sync.api.AuthorEditingSupport} editingSupport Wrapped editing support.
 *
 * @constructor
 * @extends {sync.api.WrapperEditingSupport}
*/
sync.api.WrapperAuthorEditingSupport = function(editingSupport) {};

/**
 * <p>Registers an enhancer for a type of form controls.
 *
 * <p>This registration should be performed before the editor is loaded, so that the enhancer can
 * be used for the initial rendering of the document.
 *
 * @param {string} name The type of the form-control, which is the fully qualified name of the
 * Java WebappFormControlRenderer class.
 * @param {function(HTMLElement, Editor)} enhancer The constructor for an instance of {@link sync.formctrls.Enhancer}
 * that will be used to enhance form controls rendered by the specified Java renderer.
 *
 */
sync.api.WrapperAuthorEditingSupport.prototype.registerEnhancer = function(name, enhancer) {};

/**
 * Returns the handler for custom persistent highlights.
 *
 * @return {sync.api.PersistentHighlightsManager|null} The persistent highlights manager.
 *
 * @since 22.1
 */
sync.api.WrapperAuthorEditingSupport.prototype.getPersistentHighlightsManager = function() {};

/**
 * Returns the document node of the XML DOM model.
 *
 * @see {sync.api.AuthorEditingSupport#getDocument()}
 *
 * @return {Document} The document node of the XML DOM model.
 */
sync.api.WrapperAuthorEditingSupport.prototype.getDocument = function() {};

/**
 * Returns the Author widgets factory.
 *
 * @since 22.1
 * @return {sync.api.AuthorWidgetsFactory} The Author editing support widgets factory.
 */
sync.api.WrapperAuthorEditingSupport.prototype.getWidgetsFactory = function() {};

