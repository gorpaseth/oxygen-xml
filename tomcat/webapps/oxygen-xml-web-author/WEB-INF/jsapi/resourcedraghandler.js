namespace('sync.view');


/**
 * Handler for dragging links to the editor.
 *
 * @param {string} baseUrl The editor URL.
 * @param {ActionsManagerImpl} actionsManager The actions manager.
 * @param {Controller} controller The controller.
 * @param {HTMLElement} docWrapper The document wrapper.
 * @param {SelectionManager} selectionManager The selection manager.
 * @param {LayoutChangeTracker} layoutChangeTracker The layout change tracker.
 * @param {ConcurrentEditingManagerImpl} concurrentEditingManager The concurrent editing manager.
 * @param {Scheduler} scheduler The scheduler.
 * @constructor
 * @extends {goog.Disposable}
*/
sync.view.ResourceDragHandler = function(
  baseUrl,
  actionsManager,
  controller,
  docWrapper,
  selectionManager,
  layoutChangeTracker,
  concurrentEditingManager,
  scheduler
) {
  /**
   * The reference media types.
   *
   * @type {{FROM_EDITOR: string, CUSTOM_URL: string}}
   */
  this.types = null;
};

/**
 * Get the editor element for listening for drag/drop events.
 * @returns {Element | null}
 */
sync.view.ResourceDragHandler.prototype.getEditorDragElement = function() {};


/**
 * Find an URL from the dataTransfer object.
 * @param {DataTransfer} dataTransfer The dataTransfer object.
 * @returns {object} Object containing the url.
 */
sync.view.ResourceDragHandler.prototype.getUrl = function(dataTransfer) {};

/**
 * Add custom data to the dataTransfer object.
 * Should be used on dragstart.
 *
 * @param {DataTransfer} dataTransfer The dataTransfer object.
 * @param {object} obj The object containing custom data to be passed.
 *
 * @deprecated use {@link sync.view.ResourceDragHandler#addCustomDataOfType} instead.
 */
sync.view.ResourceDragHandler.prototype.addCustomData = function(dataTransfer, obj) {};

/**
 * Add custom data of a specific type to the dataTransfer object.
 * To be used on dragstart.
 * @param {string} type The type of data to add to the object.
 * @param {DataTransfer} dataTransfer The dataTransfer object.
 * @param {object} obj The object containing custom data to be passed.
 *
 * @since 21.1.1
 */
sync.view.ResourceDragHandler.prototype.addCustomDataOfType = function(type, dataTransfer, obj) {};

