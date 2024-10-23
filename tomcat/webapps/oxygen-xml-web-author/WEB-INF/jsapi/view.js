namespace('sync.view');


/**
 * Base class for Oxygen XML Web Author views.
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
sync.view.ViewRenderer = function() {};

/**
 * Returns the title of the view.
 *
 * @return {string} The title of the view.
 */
sync.view.ViewRenderer.prototype.getTitle = function() {};

/**
 * Returns the tooltip for the title of the view.
 *
 * @return {string} The tooltip.
 */
sync.view.ViewRenderer.prototype.getTitleTooltip = function() {};

/**
 * Returns the toolbar descriptor for the view.
 * This toolbar will be shown in the view's header.
 *
 * <br/><br/>
 * *********************************
 * <br/>
 * <b>EXPERIMENTAL</b> - Subject to change
 * <br/>
 * ********************************
 * <br/>
 * <p>Please note that this API is not marked as final and it can change in one of the next versions of the application.
 * If you have suggestions, comments about it, please let us know.</p>
 *
 * @return {sync.api.Editor.ActionsLoadedEvent.ActionsListDescriptor} The toolbar's descriptor
 */
sync.view.ViewRenderer.prototype.getToolbarDescriptor = function() {};

/**
 * Returns a map of actions used to create an action manager for the view's toolbar.
 * If it is not provided, the editor's action manager will be used.
 *
 * <br/><br/>
 * *********************************
 * <br/>
 * <b>EXPERIMENTAL</b> - Subject to change
 * <br/>
 * ********************************
 * <br/>
 * <p>Please note that this API is not marked as final and it can change in one of the next versions of the application.
 * If you have suggestions, comments about it, please let us know.</p>
 *
 * @return {Object.<string, sync.actions.AbstractAction>} Map from action id to actions
 */
sync.view.ViewRenderer.prototype.getToolbarActionsMap = function() {};

/**
 * This method is called when the view renderer is linked to the actual
 * place where the view will be rendered.
 *
 * @param {HTMLElement} element The element.
 */
sync.view.ViewRenderer.prototype.install = function(element) {};

/**
 * <p>Callback received when the focused editor was changed.
 *
 * <p>When the view renderer is installed, there might be no editor loaded.
 * However, if the editor is already loaded when install is called, this method is called immediately after install.
 * The view is not notified when the editor is disposed, but it can listen for the
 * {@link sync.api.Editor.EventTypes.DISPOSE} event.
 *
 * <p>This method is not called if the given editor is not supported, i.e.
 * {@link sync.view.ViewRenderer#supportsEditor} returns false.
 *
 * @param {sync.api.Editor} editor The new editor.
 */
sync.view.ViewRenderer.prototype.editorChanged = function(editor) {};

/**
 * <p>Method used to determine if a given editor is supported. If supported, {@link sync.view.ViewRenderer#editorChanged}
 * will be called for that editor.
 *
 * <p>The default implementation of this method returns <code>true</code> only for Author editors.
 *
 * <p>If a view does not support an editor, it will be disabled. To enable it later one can use
 * {@link sync.view.ViewManager#enableView}.
 *
 * @param {sync.api.Editor} editor The editor to check support for.
 * @return {boolean} returns true if the given editor is supported.
 *
 * @since 21.1.1
 */
sync.view.ViewRenderer.prototype.supportsEditor = function(editor) {};

/**
 * Callback when the view is shown to the user.
 * This may include expanding it, switching the tab of this view in a tabbed view container, etc.
 *
 * <p>To check the initial state of the view, when it is installed, use {@link sync.view.ViewManager.isViewOpen}.
 */
sync.view.ViewRenderer.prototype.opened = function() {};

/**
 * Callback when the view is hidden from the user.
 * This may include collapsing it, switching to another another view in a tabbed view container, etc.
 */
sync.view.ViewRenderer.prototype.closed = function() {};

/**
 * Method called to focus the current view.
 */
sync.view.ViewRenderer.prototype.focus = function() {};

/**
 * This method renders the icon of the view in a 24px by 24px div.
 *
 * This allows the getIcon() method to return different sized icons
 * depending on the device pixel ration, the size constraints being
 * imposed by the enclosing DIV.
 *
 * It should be overridden only for custom rendering strategies, otherwise
 * consider using the getIcon method.
 *
 * @return {Element} the rendering of the view icon.
 */
sync.view.ViewRenderer.prototype.renderIcon = function() {};

/**
 * <p>One should override this method to provide the absolute URL of the action's large icon.
 *
 * <p>If you want to distribute the icon in a framework, you need to place it in the "web/" sub-folder of the framework.
 * In this case the absolute URL of the icon can be obtained by concatenating {@link sync.ext.Registry.extensionURL}
 * with the relative path of the icon to the "web/" sub-folder.</p>
 *
 * <p>If you want to distribute the icon in a plugin, you can place it in a directory with static resources using a
 * <a href="https://oxygenxml.com/doc/ug-waCustom/topics/customizing_plugins.html">WebappStaticResourcesFolder</a> extension.
 *
 * <p>The icon should have a minimum size of 24 by 24 px for non-hidpi displays
 * and can vary depending on the device pixel ration, the icon being used as
 * the background of a 24 by 24 px DIV.
 *
 * @param {number=} devicePixelRatio the device pixel ratio.
 *
 * @return {string|null} The icon URL.
 *
 * @protected
 */
sync.view.ViewRenderer.prototype.getIcon = function(devicePixelRatio) {};

