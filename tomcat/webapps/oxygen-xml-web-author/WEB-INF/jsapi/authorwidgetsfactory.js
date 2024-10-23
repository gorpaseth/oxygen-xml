
namespace('sync.api');


/**
 * Factory object used to create GUI components related to the XML Author editing support.
 * To get access to it use {@link sync.api.AuthorEditingSupport#getWidgetsFactory}.
 *
 * @constructor
 *
 * @since 22.1
 */
sync.api.AuthorWidgetsFactory = function() {};


/**
 * Return a helper object used to render an arrow-line that can connect an HTML element to an XML node in the editor.
 *
 * @return {sync.api.GuidingArrowRenderer} The Author arrow renderer.
 */
sync.api.AuthorWidgetsFactory.prototype.getGuidingArrowRenderer = function() {};

/**
 * Returns the handler for non persistent highlights.
 *
 * @return {sync.api.HighlightsManager|null} The highlights manager.
 */
sync.api.AuthorWidgetsFactory.prototype.getHighlightsManager = function() {};

