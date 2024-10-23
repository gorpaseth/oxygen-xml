namespace('sync.api');


/**
 * Access to the Workspace in which the editor is opened.
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
sync.api.Workspace = function() {};


/**
 * Sets the URL chooser used when the user is asked to provide an URL.
 * When there is not chooser set, the user will usually have to enter the
 * URLs in a text field.
 *
 * @param {sync.api.UrlChooser} urlChooser The URL chooser to set.
 */
sync.api.Workspace.prototype.setUrlChooser = function(urlChooser) {};

/**
 * Returns the URL chooser used when the user is asked to provide an URL.
 *
 * @return {?sync.api.UrlChooser} The currently registered URL chooser.
 */
sync.api.Workspace.prototype.getUrlChooser = function() {};

/**
 * Sets the stripes container.
 *
 * @param {Element} stripesContainer The stripes container.
 */
sync.api.Workspace.prototype.setStripesContainer = function(stripesContainer) {};

/**
 * Creates a dialog that can have custom content and behavior.
 *
 * The advandatage of using this method is that the dialog will have a consistent appearance with the rest of the application
 * and that it will work on all devices supported by the WebApp.
 *
 * @param {string=} opt_id The id that will be given to the dialog box.
 * For example, you can use it for specifying the width of the dialog in CSS.
 *
 * @return {sync.api.Dialog} The dialog.
 */
sync.api.Workspace.prototype.createDialog = function(opt_id) {};

/**
 * Returns the view manager helper object that can be used to customize Oxygen XML Web Author views.
 *
 * @return  {sync.view.ViewManager} The view manager.
 */
sync.api.Workspace.prototype.getViewManager = function() {};

/**
 * Returns an object that can be used to display notifications to the user.
 *
 * @return {sync.api.NotificationsManager} the notifications manager.
 */
sync.api.Workspace.prototype.getNotificationManager = function() {};

/**
 * Web Author prefers to insert the external references as relative URLs. It has a default algorithm to
 * make an URL relative to a given base. However, you for certain URL protocols you can provide your own
 * algorithm.
 *
 * @param {string} protocol The protocol handled by the resolver.
 * @param {function(string, string)} resolver The relative references resolver. The first argument the URL used as a
 * base for relativization and the second one is is the URL to make
 * relative .
 */
sync.api.Workspace.prototype.addRelativeReferencesResolver = function(protocol, resolver) {};

/**
 * Makes an URL relative to the base.
 *
 * @param {string} base The relativization base, needs to be an absolute URL.
 * @param {string} url The URL to make relative.
 *
 * @return {string} The relative URL.
 */
sync.api.Workspace.prototype.makeRelative = function(base, url) {};


/**
 * @typedef {Object} sync.api.Workspace.Options The object used to open the editor.
 *
 * @property {string=} 'selected.language' The current language.
 *
 * @property {string=} 'sentinels.display.mode' Controls the sentinels display mode.
 * Possible values:
 * <ul>
 *   <li> no-tags - no tags.
 *   <li> partial-tags - partial tags.
 *   <li> inline-tags - inline tags.
 *   <li> block-tags - block tags.
 *   <li> full-tags - full tags.
 *   <li> full-tags-with-attributes - full tags with attributes.
 * </ul>
 *
 * @property {string=} 'spellcheck.enabled' controls whether the spellchecker is enabled or not. Possible values:
 * <ul>
 *  <li> true - The spellchecker is enabled.
 *  <li> false - The spellchecker is disabled.
 * </ul>
 */

/**
 * Client options getter function.
 *
 * @param {string} optionKey {sync.api.Workspace.Options} property name.
 * @param {string} defaultValue the default value to be returned in case the option is not set.
 *
 * @return {string} the set option. In case the option is not set it returns the defaultValue or null.
 */
sync.api.Workspace.prototype.getOption = function(optionKey, opt_defaultValue) {};

/**
 * Client options setter function.
 *
 * @param {string} optionKey {sync.api.Workspace.Options} property name.
 * @param {string} newValue the option's new value.
 */
sync.api.Workspace.prototype.setOption = function(optionKey, newValue) {};

/**
 * Return the editing context manager.
 *
 * @return {sync.api.EditingContextManager} The editing context manager.
 */
sync.api.Workspace.prototype.getEditingContextManager = function() {};

/**
 * Returns the file servers manager helper object that can be used to register a descriptor that provides
 * rendering information and file browsing functionality for a specific file server.
 *
 * @since 20.1.1
 *
 * @return {sync.api.FileServersManager} The file servers manager.
 */
sync.api.Workspace.prototype.getFileServersManager = function() {};

/**
 * Open a link with the behavior determined by the provided event.
 *
 * @since 25
 *
 * @param {sync.api.Editor.LinkOpenedEvent} e The link opened event.
 */
sync.api.Workspace.prototype.openLink = function(e) {};

/**
 * Returns the editing support manager that can be used to create a specific {@link sync.api.EditingSupport} to the current
 * editor.
 *
 * @since 21.1.1
 *
 * @return {sync.api.EditingSupportManager} The editing support manager.
 */
sync.api.Workspace.prototype.getEditingSupportManager = function() {};

/**
 * Create and add a stripe above/below the editor.
 *
 * @since 26
 *
 * @param {number} height The height of the stripe in pixels.
 * @param {boolean=} first Flag that causes the stripe to be added first (false by default).
 * @param {boolean=} below Flag that causes the stripe to be added below the editor (false by default).
 * @return {!Element} The stripe element.
 */
sync.api.Workspace.createEditorStripe = function(height, first, below) {};

/**
 * Removes an editor stripe.
 *
 * @since 26
 *
 * @param {Element} stripe The stripe element.
 * @param {boolean=} below Flag indicating if the stripe is placed below or above the editor (false by default).
 */
sync.api.Workspace.prototype.removeEditorStripe = function(stripe, below) {};

/**
 * The types of the sync.api.Workspace events.
 *
 * @enum {string}
 */
sync.api.Workspace.EventType = {
  /**
   * Triggered before the editor content was loaded.
   *
   * Note that frameworks code cannot use this event since the framework is detected while the document is loaded.
   * <br/>
   * See {@link sync.api.Workspace.BeforeEditorOpenedEvent} for more details.
   */
  BEFORE_EDITOR_LOADED: 'before_editor_loaded',
  /**
   * Triggered after the editor was loaded.
   * <br/>
   * See {@link sync.api.Workspace.EditorLifecycleEvent} for more details.
   */
  EDITOR_LOADED: 'editor_loaded',

  /**
   * Triggered after the editor was loaded.
   * <br/>
   * See {@link sync.api.Workspace.EditorLifecycleEvent} for more details.
   */
  EDITOR_LOADING_FAILED: 'editor_loading_failed',

  /**
   * Triggered when the editor was disposed.
   * <br/>
   * See {@link sync.api.Workspace.EditorLifecycleEvent} for more details.
   */
  EDITOR_DISPOSED: 'editor_disposed',

  /**
   * Triggered before the editor will be disposed.
   * <br/>
   * See {@link sync.api.Workspace.EditorLifecycleEvent} for more details.
   */
  BEFORE_EDITOR_DISPOSED: 'before_editor_disposed',

  /**
   * Triggered before the dashboard is loaded.
   * <br/>
   * See {@link sync.api.Workspace.DashboardLifecycleEvent} for more details.
   */
  BEFORE_DASHBOARD_LOADED: 'before_dashboard_loaded',
  /**
   * Triggered after the dashboard was loaded.
   * <br/>
   * See {@link sync.api.Workspace.DashboardLifecycleEvent} for more details.
   */
  DASHBOARD_LOADED: 'dashboard_loaded'
};


/**
 * Event generated when an editor is loaded.
 *
 * <hr/>
 * <p>
 * Examples of listening for this event:
 * </p>
 * <pre>
 * workspace.listen(sync.api.Workspace.EventType.EDITOR_LOADED, function(e) {
 *   // e is of type sync.api.Workspace.EditorLifecycleEvent
 * });
 * </pre>
 * <pre>
 * workspace.listen(sync.api.Workspace.EventType.EDITOR_DISPOSED, function(e) {
 *   // e is of type sync.api.Workspace.EditorLifecycleEvent
 * });
 * </pre>
 * <pre>
 * workspace.listen(sync.api.Workspace.EventType.BEFORE_EDITOR_DISPOSED, function(e) {
 *   // e is of type sync.api.Workspace.EditorLifecycleEvent
 * });
 * </pre>
 *
 * @param {string} type The type of the event.
 * @param {sync.api.Editor} editor The editor that was changed.
 *
 * @constructor
 */
sync.api.Workspace.EditorLifecycleEvent = function(type, editor) {
 /**
  * The event type, one of the events here {@link sync.api.Workspace.EventType}.
  *
  * @type {string}
  */
 this.type = null;

 /**
  * The editor which has been loaded.
  * @type {sync.api.Editor}
  */
 this.editor = null;
};

/**
 * A function callback used to enhance the name of elements, as shown in the UI (breadcrumbs and tags), depending on their attributes.
 * @callback sync.api.ElementNameEnhancer
 *
 * @param {string} elementName The name of the XML element.
 * @param {{}} elementAttrs The attributes stored in an object with the attribute names as keys and with a descriptor object as value.
 * The descriptor contains:
 *  <li>the value of the object (attributeValue).
 *  <li>whether it's value comes from DTD or not (isDefaultValue).
 *  <li>whether the attribute is hidden (isHidden).
 *
 * @return {string} A new name for the given XML element.
 * @extends {sync.api.Workspace.EditorLifecycleEvent}
*/
/**
 * @typedef {Object} sync.api.Workspace.LoadingOptions The object used to open the editor.
 * @property {string} url The URL of the document.
 * @property {string=} title The title of the document. If not specified, it is inferred from URL.
 * @property {string=} userName The name of the user which will edit the document.
 * Used as the author for comments and displayed in the top-right corner.
 * If not specified, it is inferred from the <i>userName</i> URL variable.
 * @property {string=} content The content of the document. If not specified, the server will load the content
 * from the given URL.
 * @property {string=} modes The available editing modes, comma-separated. If multiple values are passed
 * in, the first one will be active and the user can switch to another one using the GUI. Possible values:
 * <ul>
 *  <li>review - only the review actions are enabled
 *  <li>edit - full editing support is enabled
 * </ul>
 * @property {sync.api.change_tracking.ChangeTrackingInitialState} [trackChanges] Controls the initial change-tracking state:
 *              If you use an option different than 'default', the server change tracking status (as configured in the Administration Page)
 *              should not be "Stored in the document".
 * @property {number=} autoSaveInterval the interval of time (in seconds) to wait until an auto-save is performed.
 * If <= 0 or falsy, auto-save is disabled.
 * @property {string=} contentType The content type of the edited document, "text/xml" for XML documents. The content encoding can be passed 'text/xml: charset=utf-8'.
 * @property {boolean=} 'show.caret.position.info' Flag that controls whether to show caret tooltip or not.
 * Have precedence over the server option. Default value is true.
 * @property {string=} 'validate.as.you.type' Whether automatic validation should be enabled. Defaults to true.
 * @property {string=} ccOnEnter  Flag that controls whether the content completion list is presented when the user press 'Enter'. Has precedence over the
 * value of "Show content completion list on Enter" server option (controlled from "General" option page).
 * @property {sync.api.ElementNameEnhancer} [elementNameEnhancer] A function which can enhance the name of elements depending on their attributes.
 * @property {string|Array<string>} 'stylesheet-titles' A list of titles of CSS groups (defined in the framework) that will
 * be used to render the document. The list can be passed either as a JS array or concatenated as a comma-separated string.
 * @property {boolean=} expandTopicRefs If set to true, when a DITA map is opened in Oxygen XML Web Author, the content of all topics referenced in the map will be presented.
 * @property {string=} KeyscopeStack (DITA-specific Parameter) Used for resolving keys when DITA 1.3 key scopes are defined in the DITA map.
 * The value looks like this:  `a b c,d e f` for a DITA map that has the key scope defined like this: <topicref keyscope="a b c"><topicref keyscope="d e f"/></topicref>
 * @property {number=} backupTimeout The time to wait, after an edit, before making a backup.
 * @property {boolean=} compactTagsMode Flag that controls whether the consecutive block tags are displayed on the same line
 * (when the value is true) or on separate lines (when the value is false). Default value is true.
 * @property {boolean=} quickUpDownNavigation This option is false by default and this means that when the user navigates using
 * the up and down arrow keys, the cursor is placed within each of the underlying XML elements between two blocks of text
 * (the cursor changes to a horizontal line when it is between blocks of text). This allows to easily insert elements
 * and manage the structure of the XML content. However, if this option is true, the cursor ignores the XML structure and
 * jumps from one line of text to another, similar to how the cursor behaves in a word processor.
 * @property {boolean=} textModeReadOnly Flag that controls whether the text mode will be read-only. Defaults to false.
 * @property {string|{code:string, message:string}=} readOnlyState Can be either the string `read-only` or an object
 *   with a `reason` field that contains a message to be displayed in the user interface and a `code` that can be used,
 *   for example, when rendering the read-only stripe of the editor {@see sync.api.Editor#setReadOnlyStripeRenderer}.
 *   The `code` is a way to encode the `reason` that does not change according the the UI locale.
 * @property {string=} 'schematron.imposed.phase' Used to impose a phase with that name in any Schematron file used for validation.
 * @property {string=} schematronUrl (Markdown only) Used to specify a Schematron file to validate the Markdown file with.
 * It will only work for Markdown files, if the Markdown editing plugin is installed.
 * @property {boolean=} showDitaMapView (DITA-specific Parameter) whether to show the DITA Map View on load.
 * @property {boolean=} editReferencesInPlace (DITA-specific Parameter) allow inplace editing for referred content.
 * If the opened document is a DITA Map, the content of all topics referenced in the map will be presented in the editor and
 * it will be possible to be edited. Defaults to false.
 * @property {string=} outlinePlacement Controls the side where the outline will be shown.
 * Possible values:
 * <ul>
 *   <li> right
 *   <li> left
 * </ul>
 * @property {boolean=} showTopicTitles (DITA Map-specific Parameter) whether to resolve the topic titles for DITA Maps. Defaults to false.
 * @property {boolean=} multipleNonFoldedChildren `true` to display all children whose names are listed in the
 *   `-oxy-not-foldable-child` CSS property. `false` to display only the first one. `true` by default.
 *
 * @property {string=} roomId The ID of the concurrent editing room to join. This option should be added besides the usual `url` parameter
 *   that specifies the URL of the document.
 * @property {boolean=} sharedSessionCompatible Can be set by a CMS-connector plugin to declare that a it is compatible
 * with the [Editing Session Sharing feature|https://www.oxygenxml.com/doc/help.php?product=webauthor&pageId=webauthor-concurrent-editing-api}.
 * @property {boolean=} inplaceReferenceEditingSupported option to be set to mark that the connector supports editing references in-place.
 *
 * @property {String=} search.find Text to find
 * @property {String=} search.replace Replacement text that should be written in the find-replace dialog.
 * @property {Boolean=} search.matchCase Flag controlling the find-replace match-case option.
 * @property {Boolean=} search.wholeWords Flag controlling the find-replace whole-words option.
 * @property {String} searchMode controls in what UI component the find/replace form is rendered.
 * Possible values:
 * <ul>
 *  <li>dialog - the find/replace form is presented in a dialog.
 *  <li>view - the find/replace form is presented in a side-view.
 * </ul>
 */

/**
 * Event generated before the editor is loaded. Its usage include:
 * <ul>
 *   <li> adding new actions to the editor's action manager.
 *   <li> changing the startup options of the editor.
 * </ul>
 *
 * If the options can only be computed asynchronously, one can cancel the editor loading
 * with preventDefault and call
 *
 * <pre><code>editor.load(options);</code></pre>
 *
 * later to load the editor with the new options.
 *
 * <hr/>
 * <p>
 * Example of listening for this event:
 * </p>
 * <pre>
 * workspace.listen(sync.api.Workspace.EventType.BEFORE_EDITOR_LOADED, function(e) {
 *   // e is of type sync.api.Workspace.BeforeEditorOpenedEvent
 * });
 * </pre>
 *
 * @param {string} type The type of the event.
 * @param {sync.api.Editor} editor The editor that was loaded.
 * @param {sync.api.Workspace.LoadingOptions} options The options used to open the editor.
 *
 * @constructor
 */
sync.api.Workspace.BeforeEditorOpenedEvent = function(type, editor, options) {
 /**
  * The options used to load the editor.
  *
  * If these options are changed during the {@link sync.api.Workspace.EventType.BEFORE_EDITOR_LOADED},
  * they will be taken into account during the editor loading.
  *
  * @type {sync.api.Workspace.LoadingOptions}
  */
 this.options = null;
};


/**
 * @typedef {Object} sync.api.Workspace.DashboardLoadingOptions The options used to open the dashboard.
 * @property {string} folderUrl The URL of the folder to be opened on the dashboard.
 */

/**
 * Event generated before and after the Dashboard is loaded.
 *
 * <hr/>
 * <p>
 * Example of listening for this event:
 * </p>
 * <pre>
 * workspace.listen(sync.api.Workspace.EventType.BEFORE_DASHBOARD_LOADED, function(e) {
 * });
 * workspace.listen(sync.api.Workspace.EventType.DASHBOARD_LOADED, function(e) {
 * });
 * </pre>
 *
 *
 * @param {string} type The type of the event.
 * @param {sync.api.Workspace.DashboardLoadingOptions} options The options used to open the dashboard.
 *
 * @constructor
 */
sync.api.Workspace.DashboardLifecycleEvent = function(type, options) {
 /**
  * The event type: {@link sync.api.Workspace.EventType}.
  * @type {string}
  */
 this.type = null;
 /**
  * The loading options for the dashboard.
  *
  * @type {sync.api.Workspace.DashboardLoadingOptions}
  */
 this.options = null;
};

/**
 * The workspace that corresponds to the currently opened tab.
 *
 * @global
 */
var workspace;
