namespace('sync.api');


/**
 * A visual editor for an XML document.
 *
 * @extends {goog.events.EventTarget}
 * @constructor
 */
sync.api.Editor = function() {};

/**
 * Returns the actions manager for the current editor.
 *
 * @return {sync.api.ActionsManager} the actions manager of this editor.
 */
sync.api.Editor.prototype.getActionsManager = function() {};

/**
 * Returns the change tracking manager for the current editor.
 *
 * @return {sync.api.ChangeTrackingManager} the change tracking manager, or null for non-author editors.
 */
sync.api.Editor.prototype.getChangeTrackingManager = function() {};

/**
 * Returns the selection method of the editor.
 *
 * @return {sync.api.SelectionManager} The selection manager.
 */
sync.api.Editor.prototype.getSelectionManager = function() {};

/**
 * Returns the handler for non persistent highlights.
 *
 * @return {sync.api.HighlightsManager|null} The highlights manager.
 * @deprecated Use {@link sync.api.AuthorWidgetsFactory#getHighlightsManager} instead.
 */
sync.api.Editor.prototype.getHighlightsManager = function() {};

/**
 * Return the spellchecker of the editor, if available.
 * @return {sync.api.SpellChecker|null} The spellchecker.
 */
sync.api.Editor.prototype.getSpellChecker = function() {};

/**
 * Get the descriptor of the file server where the file opened in editor is stored.
 * The connector for this file server was registered by using the {@link sync.api.FileServersManager#registerFileServerConnector} method.
 *
 * @return {sync.api.FileServerDescriptor} The descriptor of the file server that contains the file opened in editor.
 *
 * @since 20.1.1
 */
sync.api.Editor.prototype.getFileServer = function() {};

/**
 * A callback invoked when the asynchronous request for the XML content finishes.
 * If the operation is successful, the first
 * parameter is <code>null</code> and the second one is a string that represents
 * the content. If case of an error, the first parameter is an object describing
 * the error.
 *
 * @callback sync.api.Editor~onXmlContentReceived
 *
 * @param {object} error The error object, or null if the request was successful.
 * @param {string} content The serialized XML content.
 */

/**
 * Retrieves the content of the XML document asynchronously.
 * @deprecated
 * @param {sync.api.Editor~onXmlContentReceived} callback The callback that will be called
 * once the XML content is retrieved.
 */
sync.api.Editor.prototype.getXmlContent = function(callback) {};

/**
 * A callback invoked when the asynchronous request for the XML content finishes.
 * If the operation is successful, the first
 * parameter is <code>null</code> and the second one is a string that represents
 * the content. If case of an error, the first parameter is an object describing
 * the error.
 *
 * @callback sync.api.Editor~onContentReceived
 *
 * @param {Object} error The error object, or null if the request was successful.
 * @param {string=} content The serialized XML content.
 */

/**
 * Retrieves the content of the document asynchronously.
 *
 * @function
 * @param {sync.api.Editor~onContentReceived} callback The callback that will be called
 * once the XML content is retrieved.
 */
sync.api.Editor.prototype.getContent = function(callback) {};

/**
 * @return {string} The URL of the file opened in the editor.
 */
sync.api.Editor.prototype.getUrl = function() {};

/**
 * <p>Registers an enhancer for a type of form controls.
 *
 * <p>This registration should be performed before the editor is loaded, so that the enhancer can
 * be used for the initial rendering of the document.
 *
 * @param {string} name The type of the form-control, which is the fully qualified name of the
 * Java WebappFormControlRenderer class.
 * @param {function(HTMLElement, sync.api.Editor)} enhancer The constructor for an instance of {@link sync.formctrls.Enhancer}
 * that will be used to enhance form controls rendered by the specified Java renderer.
 *
 */
sync.api.Editor.prototype.registerEnhancer = function(name, enhancer) {};

/**
 * Sets the editor status as modified or not.
 *
 * If the editor is modified, when the user leaves the page, we
 * warn them that there are unsaved changes.
 *
 * @param {boolean} dirty Whether the editor should be marked as dirty or not.
 */
sync.api.Editor.prototype.setDirty = function(dirty) {};

/**
 * @return {boolean} true if the editor is marked as dirty.
 */
sync.api.Editor.prototype.isDirty = function() {};

/**
 * Loads an editor with the given options.
 *
 * Should not be called if the editor was not already loaded
 *
 * @param {sync.api.Workspace.LoadingOptions} options The options used to open the editor.
 */
sync.api.Editor.prototype.load = function(options) {};

/**
 * Report that the editor could not load the requested resource because it is missing.
 */
sync.api.Editor.prototype.reportFileNotFound = function() {};

/**
 * @deprecated Use {@link sync.api.Editor#reportUnknownLoadingProblem} instead.
 */
sync.api.Editor.prototype.reportUnkownLoadingProblem = function(message, opt_err) {};

/**
 * Report that the editor could not load the requested resource because it is missing.
 * @param {string} message The message that describes the problem. Can be empty.
 * @param {Error=} opt_err An error object that represents the cause of the error. If this object is given,
 * the user will have the chance to report this problem and general troubleshooting info will be presented.
 */
sync.api.Editor.prototype.reportUnknownLoadingProblem = function(message, opt_err) {};


/**
 * Register a provider that is used to determine a custom interface used to edit an attribute.
 *
 * This method should be called after the editor is loaded.
 *
 * @param {sync.actions.AttributeEditingActionsProvider} attributeActionsProvider The actions provider.
 */
sync.api.Editor.prototype.registerAttributeActionsProvider = function(attributeActionsProvider) {};

/**
 * @function
 * @return {sync.api.Editor.EditorTypes} the type of the current editor if it was determined, <code>null</code> otherwise.
 */
sync.api.Editor.prototype.getEditorType = function() {};

/**
 * Get the resource drag handler.
 *
 * @return {ResourceDragHandler}
 */
sync.api.Editor.prototype.getResourceDragHandler = function() {};

/**
 * @typedef {Object} sync.api.ReadOnlyState The descriptor for the read-only or editable state of the editor.
 * @property {boolean} readOnly A flag that indicated whether the document is read-only.
 * @property {string} message The message to display to the user if the editor is read-only.
 * @property {string} code A code for the reason which will be the same across UI languages.
 */

/**
 * Sets the editor as read-only.
 * @function
 * @param {sync.api.ReadOnlyState} state The read-only state.
 */
sync.api.Editor.prototype.setReadOnlyState = function(state) {};

/**
 * @function
 * @return {sync.api.ReadOnlyState} the read-only state of the editor.
 */
sync.api.Editor.prototype.getReadOnlyState = function() {};

/**
 * @function
 * @param {function(sync.api.ReadOnlyState, HTMLElement)} renderer A function that renders the read-only status
 * of a document. It will be called whenever the read-only status of the document changes.
 * The first parameter is the read-only state of the document. The second parameter is the stripe element.
 */
sync.api.Editor.prototype.setReadOnlyStripeRenderer = function(renderer) {};

/**
 * sync.api.Editor types
 *
 * @enum {string}
 */
sync.api.Editor.EditorTypes = {
  /**
   * The editor is of type author.
   */
  AUTHOR: 'author',
  /**
   * The editor is of type XML.
   */
  XML: 'xml',
  /**
   * The editor is of type markdown.
   */
  MARKDOWN: 'markdown',
  /**
   * The editor is of type text.
   */
  TEXT: 'text',
  /**
   * The editor is of type text.
   */
  IMAGE: 'image',
  /**
   * An editor that presents the differences between two documents.
   */
  DIFF: 'diff'
};

/**
 * Event types generated by this editor.
 *
 * These events will also trigger on the `workspace` object which is the parent event target of the editor.
 *
 * @enum {string}
 */
sync.api.Editor.EventTypes = {
  /**
   * Generated when a link is about to be opened.
   * <br/>
   * See {@link sync.api.Editor.LinkOpenedEvent} for more details.
   */
  LINK_OPENED: 'link_openend',
  /**
   * Generated when an sync.api.WebappMessage whose type is not handled by the webapp itself
   * was reported on the server-side.
   * <br/>
   * See {@link sync.api.Editor.WebappMessageReceived} for more details.
   */
  CUSTOM_MESSAGE_RECEIVED: 'custom_message',
  /**
   * Generated when some editor-related actions were loaded.
   * <br/>
   * See {@link sync.api.Editor.ActionsLoadedEvent} for more details.
   */
  ACTIONS_LOADED: 'actions_loaded',
  /**
   * Generated when the editor changes its dirty status.
   * <br/>
   * See {@link sync.api.Editor.DirtyStatusChangedEvent} for more details.
   */
  DIRTY_STATUS_CHANGED: 'dirty_status_changed',

  /**
   * Generated before the editor is disposed. This event cannot be cancelled.
   *
   * @since 21.1.1
   */
  DISPOSE: 'dispose'
};


/**
 * Link opened event.
 *
 * <hr/>
 * <p>
 * Example of listening for this event:
 * </p>
 * <pre>
 * editor.listen(sync.api.Editor.EventTypes.LINK_OPENED, function(e) {
 *   // e is of type sync.api.Editor.LinkOpenedEvent
 * });
 * </pre>
 *
 * @param {string} url The URL to be opened (that can contain an anchor) or an anchor (#fragment).
 * For more details about anchors see the <a href="https://www.oxygenxml.com/doc/ug-waCustom/topics/oxy-url.html#section_anchors">OXY_URL Anchors</a> section from the Customization Guide.
 * @param {boolean} external Whether the link should be opened in an
 * external application.
 * @param {object=} params The parameters to pass to the new editor.
 * @param {sync.api.Editor.LinkOpenedEvent.Target=} linkTarget The target of the link.
 *                          Specifies whether to open the link in a new window or in the current one.
 *
 * @constructor
 * @extends {goog.events.Event}
*/
sync.api.Editor.LinkOpenedEvent = function(url, external, params, linkTarget) {
 /**
  * The URL that will be opened.
  *
  * @type {string}
  */
 this.url = null;
 /**
  * Flag indicating whether the link is an external one, e.g. to a web page.
  *
  * @type {boolean}
  */
 this.external = null;
 /**
  * Key-value mapping that contains parameters that will be passed to the new editor in case it is
  * opened in the Oxygen XML Web Author.
  *
  * @type {Object.<string,string>}
  */
 this.params = null;

 /**
  * Used to determine if a link should be opened in the current window or in a new one.
  * @type {sync.api.Editor.LinkOpenedEvent.Target}
  */
 this.linkTarget = null;

 /**
  * The actual URL that will be opened.
  * EXPERIMENTAL (subject to change).
  *
  * @type {string}
  */
 this.$actualUrl = null;
};

/**
 * Sets the actual URL to be opened for this event.
 * EXPERIMENTAL (subject to change).
 *
 * @param {string} $actualUrl The actual URL that will be opened.
 */
sync.api.Editor.LinkOpenedEvent.prototype.$setActualUrl = function($actualUrl) {};

/**
 * @enum
 */
sync.api.Editor.LinkOpenedEvent.Target = {
  /**
   * The link will be opened in the current window.
   */
  SELF: '_self',

  /**
   * The link will be opened in a new window.
   */
  BLANK: '_blank'
};


/**
 * Event triggered when a webapp message is received from the server-side code.
 * <hr/>
 * <p>
 * Example of listening for this event:
 * </p>
 * <pre>
 * editor.listen(sync.api.Editor.EventTypes.CUSTOM_MESSAGE_RECEIVED, function(e) {
 *   // e is of type sync.api.Editor.WebappMessageReceived
 * });
 * </pre>
 *
 * @param {Object} webappMessageJSON The webapp message sent by the server-side code, as JSON.
 * @param {string} context The context in which the message is received.
 *
 * @constructor
 */
sync.api.Editor.WebappMessageReceived = function(webappMessageJSON, context) {
 /**
  * The type of the event: {@link sync.api.Editor.EventTypes.CUSTOM_MESSAGE_RECEIVED}.
  *
  * @type {string}
  */
 this.type = null;
 /**
  * The webapp message sent by the server-side code.
  * @type {sync.api.WebappMessage}
  */
 this.message = null;
 /**
  * The context in which the message is received.
  *
  * @see sync.api.Editor.WebappMessageReceived.Context
  * @type {string}
  */
 this.context = null;
};


/**
 * The constants representing the context in which a webapp message is received.
 *
 * @enum {string}
 */
sync.api.Editor.WebappMessageReceived.Context = {
  /**
   * During the loading of the document.
   */
  LOAD: 'load',
  /**
   * During the save operation.
   */
  SAVE: 'save',
  /**
   * During the save as operation.
   */
  SAVE_AS: 'save_as',
  /**
   * While the document is edited.
   */
  EDITING: 'editing',
  /**
   * During a image request.
   */
  IMAGE: 'image',
  /**
   * Other.
   */
  OTHER: 'other'
};


/**
 * @typedef {Object} sync.api.Editor.ActionsLoadedEvent.ActionDescriptor The action descriptor.
 * @property {boolean} compatible Whether the action is compatible with webapp. If not, it will not be used in the UI.
 * @property {string=} icon16 The URL for a 16x16 icon to be used for the action.
 * @property {string=} icon20 The URL for a 24x24 icon to be used for the action. Yes, 24x24, it's called icon20 for
 * backwards compatibility reasons.
 * @property {string} id The unique ID of the action.
 * @property {string=} name The display name of the action.
 * @property {string=} tooltip The tooltip description of the action.
 * @property {string=} shortcut The shortcut of the action. Can use platform-generic modifiers: <ul>
 *   <li>M1 - Ctrl or Cmd on Mac
 *   <li>M2 - Shift
 *   <li>M3 - Alt
 *   <li>M4 - Ctrl on Mac, or nothing on other platforms
 *   </ul>
 */

/**
 * @typedef {Object} sync.api.Editor.ActionsLoadedEvent.ActionEntry The descriptor for an action entry on the toolbar or in the context menu.
 * @property {string} id The ID of the action to render on the toolbar.
 * @property {string} type Equal to "action".
 */

/**
 * @typedef {Object} sync.api.Editor.ActionsLoadedEvent.Sep A separator.
 * @property {string} type Equal to "sep".
 */

/**
 * An entry that can appear in the toolbar, toolbar dropdown menu, context menu or context sub-menu.
 *
 * Can be an action, a sub-menu, or a separator.
 *
 * @typedef {(sync.api.Editor.ActionsLoadedEvent.ActionsListDescriptor|sync.api.Editor.ActionsLoadedEvent.ActionEntry|sync.api.Editor.ActionsLoadedEvent.Sep)} sync.api.Editor.ActionsLoadedEvent.ListEntry
 */

/**
 * @typedef {Object} sync.api.Editor.ActionsLoadedEvent.ActionsListDescriptor The descriptor for a toolbar, a drop-down menu on the toolbar, or context sub-menu.
 * @property {string=} icon16 The URL for a 16x16 icon to be used to render the actions list.
 * @property {string=} icon20 The URL for a 24x24 icon to be used to render the actions list. Yes, 24x24, it's called icon20 for
 * backwards compatibility reasons.
 * If the image is placed inside framework the absolute URL of the icon can be obtain by concatenating {@link sync.ext.Registry.extensionURL}.
 * @property {HTMLElement=} iconDom A DOM element that will be used to render the actions list.
 * @property {string=} name The name of the toolbar, used as an HTML attribute. It is used also a fallback for displayName.
 * @property {string=} displayName The display name of the toolbar.
 * @property {string} type Equal to "list".
 * @property {boolean} small true to render a small toolbar (with no padding).
 * @property {boolean} toBottom true if the toolbar is placed at the bottom of the editor (in this case the drop-down arrow points to top).
 * @property {Array<sync.api.Editor.ActionsLoadedEvent.ListEntry>} children
 * the list entries.
 */

/**
 * @typedef {Object} sync.api.Editor.ActionsLoadedEvent.ContextMenuEntry The context menu entry descriptor.
 * @property {string=} icon The URL for a 16x16 icon to be used for the toolbar.
 * @property {string=} name The display name of the toolbar.
 * @property {string} type Equal to "list".
 * @property {Array<sync.api.Editor.ActionsLoadedEvent.ListEntry>} children
 * the context menu entries entries.
 */

/**
 * @typedef {Object} sync.api.Editor.ActionsLoadedEvent.ActionsConfiguration The object used to open the editor.
 * @property {Array<sync.api.Editor.ActionsLoadedEvent.ActionDescriptor>} actions An array of actions descriptors.
 * @property {Array<sync.api.Editor.ActionsLoadedEvent.ActionsListDescriptor>} toolbars An array of descriptors for
 * actions lists that will be rendered as toolbars.
 * @property {Array<sync.api.Editor.ActionsLoadedEvent.ContextMenuEntry>} contextualItems An array of descriptors for entries in
 * the context menu.
 * @property {?Array<string>} filterCCItems A list of names to filter from the Content Completion menu.
 *   <p>This property is not always defined when the {@link sync.api.Editor.ActionsLoadedEvent} event is dispatched.
 *   Changes to this list are reflected in the UI only when this field is defined, not when you define it yourself.
 *   <p>There are several types of entries <ul>
 *     <li>Raw names of elements, for example <code>p</code> instead of the display name which is <b>Paragraph</b>.
 *     <li>Entries that contain the <code>&lt;SPLIT&gt;</code> token to filter entries like "Split Paragraph"
 *         in all the supported languages.
 *     <li>An entry equal <code>&lt;ENTER&gt;</code> to remove the "Enter" entry that appears for code-blocks.
 *   </ul>
 */


/**
 * <p>Configuration of the actions that are going to be enabled for the current editor
 * was loaded. This configuration may specify some of the:</p>
 * <ul>
 * <li>the action together with their shortcuts
 * <li>the configuration of one of the toolbars
 * <li>the configuration of the context menu
 * <li>configuration for the content completion menu
 * </ul>
 *
 * <p>This event is triggered before the action are used, so changes to the configuration will
 * take effect in the UI.
 *
 * <p>The toolbar and contextmenu configurations contain only action ids. In order to change the
 * actual actions or to add more actions one can use the {@link sync.api.ActionsManager}.
 *
 * <hr/>
 * <p>
 * Example of listening for this event:
 * </p>
 * <pre>
 * editor.listen(sync.api.Editor.EventTypes.ACTIONS_LOADED, function(e) {
 *   // e is of type sync.api.Editor.ActionsLoadedEvent
 * });
 * </pre>
 *
 * @param {sync.api.Editor.ActionsLoadedEvent.ActionsConfiguration} actionsConfiguration A object that represents the actions configuration.
 *
 * @constructor
 */
sync.api.Editor.ActionsLoadedEvent = function(actionsConfiguration) {
 /**
  * @type {string}
  */
 this.type = null;
 /**
  * @type {sync.api.Editor.ActionsLoadedEvent.ActionsConfiguration}
  */
 this.actionsConfiguration = null;
};

/**
 * This event should be triggered when the dirty status of the editor changes.
 *
 * <hr/>
 * <p>
 * Example of listening for this event:
 * </p>
 * <pre>
 * editor.listen(sync.api.Editor.EventTypes.DIRTY_STATUS_CHANGED, function(e) {
 *   // e is of type sync.api.Editor.DirtyStatusChangedEvent
 * });
 * </pre>
 *
 * @param {boolean} isDirty If the editor has unsaved changes, isDirty should be true.
 * @constructor
 */
sync.api.Editor.DirtyStatusChangedEvent = function(isDirty) {
 /**
  * The type of the event: {@link sync.api.Editor.EventTypes.DIRTY_STATUS_CHANGED}.
  *
  * @type {string}
  */
 this.type = null;
 /**
  * true if the document became dirty,
  *
  * @type {boolean}
  */
 this.isDirty = null;
};

/**
 * Get the editing support.
 *
 * @return {EditingSupport|*}
 */
sync.api.Editor.prototype.getEditingSupport = function() {};

/**
 * Create a basic editing support for this editor.
 * It provides support for rendering the content of the current editor and access to basic action (Cut/Copy/Paste).
 * It does not include the toolbars, context menus and views support.
 * It can be used to impose the editing support for a specific document.
 * See {@link sync.api.EditingSupportManager.registerEditingSupportProvider}.
 *
 * @return {sync.api.EditingSupport} The basic editing support.
 */
sync.api.Editor.prototype.createBasicEditingSupport = function() {};

/**
 * Load the (read-only) preview of a document inside a specified element.
 *
 * @param {HTMLElement} container The element in which we add our editor.
 * @param {sync.api.Workspace.LoadingOptions} options The options to be used to load the document preview.
 * The following options are used to create the preview:
 * <ul>
 *   <li>{@link sync.api.Workspace.LoadingOptions#url}</li>
 *   <li>{@link sync.api.Workspace.LoadingOptions#elementNameEnhancer}</li>
 *   <li>{@link sync.api.Workspace.LoadingOptions#expandTopicRefs}</li>
 *   <li>{@link sync.api.Workspace.LoadingOptions#KeyscopeStack}</li>
 * </ul>
 * @return {Thenable}  A thenable that fulfills when the document preview is loaded.
 */
sync.api.Editor.prototype.loadPreview = function(container, options) {};

/**
 * Triggers a save and receives information about its result.
 * <p><b>Note:</b> plugins can overwrite the editor's "save" functionality. If the action with ID "Author/Save" is
 *   overwritten, the behaviour is not specified.</p>
 *
 *  @param {function({type: string}, boolean)=} opt_resultHandler Save result handler.
 *   <p>The first parameter is an error object with a type field - it is null if the operation was successful.</p>
 *   <p>The type is one of the following values:
 *   <ul>
 *    <li> not_well_formed - The document is edited in text mode and not well formed.
 *    <li> user_action_required - An user action is required to continue. Typically, the user has to log in again.
 *    <li> session_expired_error - The editing session expired.
 *    <li> io_error - Error when trying to save the file on the file server.
 *   </ul></p>
 *   <p>The second parameter is the the result of the operation - true if successful, false otherwise.</p>
 */
sync.api.Editor.prototype.triggerSave = function(opt_resultHandler) {};

export default sync.api.Editor;