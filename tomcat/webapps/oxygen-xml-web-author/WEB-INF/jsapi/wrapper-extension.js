namespace('sync.ext');


/**
 * sync.ext.Extension that delegates all the calls to another extension.
 *
 * @param {sync.ext.Extension} delegate The delegate extension.
 * @constructor
 * @extends {sync.ext.Extension}
*/
sync.ext.WrapperExtension = function(delegate) {};


sync.ext.WrapperExtension.prototype.editorCreated = function(editor) {};

sync.ext.WrapperExtension.prototype.filterActions = function(actionsMap, editingSupport) {};

sync.ext.WrapperExtension.prototype.getEnhancers = function() {};

