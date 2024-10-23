
namespace('sync.ext');


/**
 * An extensions specific to a document type.
 *
 * @constructor
 */
sync.ext.Extension = function() {};

/**
 * Returns a mapping from form-control names to constructors of form-control enhancers.
 *
 * The name of the form control is the fully qualified name of the Java renderer.
 *
 * @return {Object.<string, function(HTMLElement, sync.api.Editor)>} map from form-control names to enhancer constructors.
 */
sync.ext.Extension.prototype.getEnhancers = function() {};

/**
 * Callback used when the editor is created.
 *
 * @param {sync.api.Editor} editor The editor object.
 */
sync.ext.Extension.prototype.editorCreated = function(editor) {};

/**
 * Filter the actions available for the current editing support.
 *
 * @param {Map<String, sync.actions.AbstractAction>} actionsMap The map between actions id and action.
 * @param {sync.api.EditingSupport} editingSupport The editing support.
 */
sync.ext.Extension.prototype.filterActions = function(actionsMap, editingSupport) {};
