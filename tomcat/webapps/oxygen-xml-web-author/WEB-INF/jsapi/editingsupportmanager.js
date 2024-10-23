
namespace('sync.api');


/**
 * The editing support manager that can be used to create an {@link sync.api.EditingSupport} for the current
 * editor. It also contains methods to create built-in editing supports. To obtain the editing support manager use
 * {@link sync.api.Workspace.getEditingSupportManager}
 *
 * @since 21.1.1
 *
 * @constructor
 */
sync.api.EditingSupportManager = function() {};

/**
 * Provides the possibility to impose a specific {@link sync.api.EditingSupport} to be used instead of the built-in one to render
 * the content of the current editor, to set the actions, toolbars and views associated with it.
 *
 * @typedef {Object} sync.api.EditingSupportProvider
 */

/**
 * Gets the {@sync.api.EditingSupport} to be used to render the current editor.
 * You can create a custom editing support by implementing a {@link sync.api.EditingSupport} or you can create a builtin
 * editing support(see {@link sync.api.Editor.createBasicEditingSupport}).
 * If you want to wrap an existing editing support and add or remove functionality,
 * you can also create a {@link sync.api.WrapperEditingSupport}
 *
 * @typedef {function} sync.api.EditingSupportProvider~getEditingSupport
 *
 * @param {String} contentType The document content type.
 * @param {sync.api.Editor} editor The editor.
 * @param {sync.api.Workspace.LoadingOptions} options The options to be used by the editing support.
 *
 * @return {sync.api.EditingSupport} The editing support.
 */

/**
 * Register an (@link sync.api.EditingSupportProvider} that provides the possibility to impose a specific
 * {@link sync.api.EditingSupport} to be used instead of the built-in one to render the content of the current editor,
 * to set the actions, toolbars and views associated with it.
 *
 * @param {sync.api.EditingSupportProvider} editingSupportProvider The editing support provider.
 */
sync.api.EditingSupportManager.prototype.registerEditingSupportProvider = function(editingSupportProvider) {};

