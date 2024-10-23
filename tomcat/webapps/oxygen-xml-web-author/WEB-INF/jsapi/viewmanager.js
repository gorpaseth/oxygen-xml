
namespace('sync.view');


/**
 * <p>Helper object used to control the lateral views.
 *
 * <p>The view manager can be obtained by using [workspace.getViewManager()]{@link sync.api.Workspace#getViewManager}.
 *
 * <p>Each view is identified by an ID and is registered on one of the two sides of the editor: left or right.
 *
 * <p>A view is not visible before a {@link sync.view.ViewRenderer} is installed for it. Each view is enabled by default,
 * and it can be disabled if it does not support the current editor. When the view is disabled, it will not be presented
 * to the user, but it will still be present in the page's DOM.
 *
 * <p>Once visible, the view may be focused or not. There is only one focused view on each side of the editor.
 *
 * @constructor
 */
sync.view.ViewManager = function() {};

/**
 * Adds a new view with the given ID. The view is not rendered until a {@link sync.view.ViewRenderer} is installed
 * for it.
 *
 * Should be called before any view is installed.
 *
 * @param {string} viewId The id of the view to be added.
 */
sync.view.ViewManager.prototype.addView = function(viewId) {};

/**
 * Removes the given view from the layout.
 *
 * Should be called before any view is installed.
 *
 * @param {string} viewId The id of the view to be removed.
 */
sync.view.ViewManager.prototype.removeView = function(viewId) {};

/**
 * @return {Array<string>} The list of IDs of all views defined in the layout.
 */
sync.view.ViewManager.prototype.getViewIds = function() {};

/**
 * <p>Enables a view, which means the view is displayed and can be interacted with by the user.
 *
 * <p>To enable or disable a view based on the current editor, one should use the
 * {@link sync.view.ViewRenderer#supportsEditor} method. This method should only be used for more complex cases.
 *
 * @param {string} viewId The id of the view to be enabled.
 *
 * @since 21.1.1
 */
sync.view.ViewManager.prototype.enableView = function(viewId) {};

/**
 * <p>Disables a view, which means the view is hidden from the user and can be enabled later.
 *
 * <p>To enable or disable a view based on the current editor, one should use the
 * {@link sync.view.ViewRenderer#supportsEditor} method. This method should only be used for more complex cases.
 *
 *
 * @param {string} viewId The id of the view to be disable.
 *
 * @since 21.1.1
 */
sync.view.ViewManager.prototype.disableView = function(viewId) {};

/**
 * @param {string} viewId The id of the view whose status we are interested in.
 * @return {boolean} true if the view is enabled.
 *
 * @since 21.1.1
 */
sync.view.ViewManager.prototype.isViewEnabled = function(viewId) {};

/**
 * Focuses the view with the given ID.
 *
 * Has no effect if the view is disabled.
 *
 * @param {string} viewId The ID of the view to focus.
 */
sync.view.ViewManager.prototype.focusView = function(viewId) {};

/**
 * Checks whether the view with the given ID is open.
 *
 * @param {string} viewId The ID of the view.
 * @return {boolean} true if the view with the given ID is open to the user.
 *
 * @since 22.1
 */
sync.view.ViewManager.prototype.isViewOpen = function(viewId) {};

/**
 * @typedef {Object} sync.view.ViewProperties The descriptor of a side-view.
 * @property {string} side Information about the side were to install the view. The possible values are: 'left' | 'right'. Defaults to: 'right'.
 * @property {boolean} initiallyClosed If set to true, the view is closed when the editor is opened. The possible values are: true | false. Defaults to false.
 */

/**
 * Install the view renderer for the view with the given ID.
 * It takes care of rendering the view content.
 *
 * @param {String} viewId The ID of the view to focus.
 * @param {sync.view.ViewRenderer} view The view handler.
 * @param {sync.view.ViewProperties|String=} opt_viewProperties The view properties.
 *  If this parameter value is a String, then it refers to the "side" property.
 */
sync.view.ViewManager.prototype.installView = function(viewId, view, opt_viewProperties) {};

/**
 * Uninstall the renderer associated with a given view.
 *
 * @param {string} viewId The view whose renderer to uninstall.
 *
 * @since 21.1.1
 */
sync.view.ViewManager.prototype.uninstallView = function(viewId) {};

/**
 * Hides the application header bar that contains:
 *  - the application logo
 *  - some basic actions - when the header is hidden they migrate to the main toolbar.
 *  - the file name
 *  - the user name
 */
sync.view.ViewManager.prototype.hideAppBar = function() {};

/**
 * Sets the size of the entire Web Author view.
 * Once this method is called automatic resizing based on window dimensions will be disabled.
 *
 * @param {number} width The new width of the Web Author view element.
 * @param {number} height The new height of the Web Author view element.
 */
sync.view.ViewManager.prototype.setSize = function(width, height) {};

/**
 * Get the actions manager used for a specified view.
 * @param {String} viewId The id of the view.
 * @return {sync.api.ActionsManagerCore} The action manager
 *
 * @since 26.1
 */
sync.view.ViewManager.prototype.getActionsManager = function(viewId) {};

