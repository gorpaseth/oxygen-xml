
namespace('sync.api');


/**
 * Editing support that is a wrapper for other editing support
 *
 * @param {sync.api.EditingSupport} editingSupport Wrapped editing support.
 *
 * @constructor
 * @extends {sync.api.EditingSupport}
*/
sync.api.WrapperEditingSupport =function(editingSupport) {
  /**
   * The wrapped editing support.
   *
   * @type {sync.api.EditingSupport}
   */
  this.editingSupport = null;
};

/** @override */
sync.api.WrapperEditingSupport.prototype.getActionsManager = function() {};

/** @override */
sync.api.WrapperEditingSupport.prototype.getSelectionManager = function() {};

/** @override */
sync.api.WrapperEditingSupport.prototype.getHighlightsManager = function() {};

/** @override */
sync.api.WrapperEditingSupport.prototype.getSpellChecker = function() {};

/** @override */
sync.api.WrapperEditingSupport.prototype.getContent = function(callback) {};

/** @override */
sync.api.WrapperEditingSupport.prototype.load = function(newDoc, docContainer, problemReporter) {};

/** @override */
sync.api.WrapperEditingSupport.prototype.getApplicationToolbar = function() {};

/** @override */
sync.api.WrapperEditingSupport.prototype.getFirstToolbar = function() {};

/** @override */
sync.api.WrapperEditingSupport.prototype.getOtherToolbars = function(done) {};

/** @override */
sync.api.WrapperEditingSupport.prototype.getType = function() {};

/** @override */
sync.api.WrapperEditingSupport.prototype.focus = function() {};

/** @override */
sync.api.WrapperEditingSupport.prototype.getResourceDragHandler = function() {};

/** @override */
sync.api.WrapperEditingSupport.prototype.getUrl = function() {};

/** @override */
sync.api.WrapperEditingSupport.prototype.scrollToAnchor = function(url) {};

/** @override */
sync.api.WrapperEditingSupport.prototype.getConcurrentEditingManager = function() {};

