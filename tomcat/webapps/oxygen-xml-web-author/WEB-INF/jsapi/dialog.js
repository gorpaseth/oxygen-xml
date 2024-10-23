
namespace('sync.api');


/**
 * A dialog window with custom content.
 *
 * @constructor
 * @extends {goog.events.EventTarget}
*/
sync.api.Dialog = function() {};

/**
 * Focuses the dialog window.
 */
sync.api.Dialog.prototype.focus = function() {};

/**
 * Shows the dialog window.
 */
sync.api.Dialog.prototype.show = function() {};

/**
 * Hides the dialog window.
 */
sync.api.Dialog.prototype.hide = function() {};

/**
 * Sets the resizable flag for this dialog.
 * @param {boolean} resizable If true, this dialog should become resizable.
 */
sync.api.Dialog.prototype.setResizable = function(resizable) {};

/**
 * Sets the preferred size for this dialog.
 * @param {number} width The preferred width.
 * @param {number} height The preferred height.
 */
sync.api.Dialog.prototype.setPreferredSize = function(width, height) {};

/**
 * Sets the preferred size for this dialog content.
 * @param {number} width The preferred width.
 * @param {number} height The preferred height.
 */
sync.api.Dialog.prototype.setContentPreferredSize = function(width, height) {};

/**
 * Returns the HTML element that represents the content of the dialog window,
 * So that custom content can be added to it.
 *
 * @return {HTMLElement} The element of the dialog.
 */
sync.api.Dialog.prototype.getElement = function() {};


/**
 * Sets the title of the dialog window.
 *
 * @param {string} title The title of the dialog window.
 */
sync.api.Dialog.prototype.setTitle = function(title) {};

/**
 * Set the position of this dialog.
 *
 * @param {number} x Left position or coordinate.
 * @param {number} y Top position.
 *
 * @since 21.1
 */
sync.api.Dialog.prototype.setPosition = function(x, y) {};

/**
 * Sets whether the dialog should have a close button in the title bar.
 * This works only for non-modal dialogs, see sync.api.Dialog.setModal().
 *
 * @param {boolean} hasTitleCloseButton Whether this dialog should have a title close button.
 *
 * @since 21.1
 */
sync.api.Dialog.prototype.setHasTitleCloseButton = function(hasTitleCloseButton) {};


/**
 * Sets the opacity of the background mask.
 *
 * @param {number} opacity Background mask opacity. The default value is 0.5 (50% opacity).
 *
 * @since 21.1
 */
sync.api.Dialog.prototype.setBackgroundElementOpacity = function(opacity) {};

/**
 * Button configurations for a dialog.
 *
 * @enum {string}
 */
sync.api.Dialog.ButtonConfiguration = {
  /** An OK and a Cancel button. This is the default configuration. */
  OK_CANCEL: 'ok_cancel',
  /** Only an OK button. */
  OK: 'ok',
  /** Only a cancel button */
  CANCEL: 'cancel',
  /** A Yes and a No buttons */
  YES_NO: 'yes_no'
};

/**
 * Sets the button configuration of the dialog.
 *
 * @param {sync.api.Dialog.ButtonConfiguration} config The button configuration
 */
sync.api.Dialog.prototype.setButtonConfiguration = function(config) {};

/**
 * A callback that receives the key of the button that was pressed, and the select event itself.
 *
 * @callback sync.api.Dialog~onSelectCallback
 *
 * @param {string} key The key of the selected button.
 * @param {goog.events.Event} event The select event, which you can preventDefault() in order to keep the dialog open.
 * @return {Promise} If the callback returns a {Promise}, the dialog is switched to a 'waiting' state until the promise resolves and
 * only then it is hidden. If the promise rejects, the dialog remains open.
 */


/**
 * Sets the callback to be called when a button is pressed. It is called only once - the next time the dialog is shown,
 * you will need to register an onSelect callback again.
 *
 * @param {sync.api.Dialog~onSelectCallback} callback the callback used when the user chooses an option on the dialog.
 */
sync.api.Dialog.prototype.onSelect = function(callback) {};

/**
 * Disposes all the resources associated with the dialog, un-registers all the listeners
 * and removes it from the DOM.
 */
sync.api.Dialog.prototype.dispose = function() {};

/**
 * Returns true if the dialog is visible.
 */
sync.api.Dialog.prototype.isVisible = function() {};


/**
 * Makes the dialog modal/non-modal.
 *
 * The dialog is modal by default.
 *
 * @param {boolean} modal true if the dialog should be made modal.
 */
sync.api.Dialog.prototype.setModal = function(modal) {};

/**
 * Getter for the dialog event target.
 *
 * @return {goog.events.EventTarget}
 */
sync.api.Dialog.prototype.getEventTarget = function() {};

/**
 * The constructor for the events dispatched by the dialog.
 * <hr/>
 * <p>
 * Example of listening for this event:
 * </p>
 * <pre>
 * dialog.listen(sync.api.Dialog.EventType.SIZE_CHANGED, function(e) {
 *   // e is of type sync.api.Dialog.SizeChangedEvent
 * });
 * </pre>
 *
 * @param {sync.api.Dialog.EventType} type The event type.
 * @param {{width: number, height: number}} newSize The new size of the dialog.
 * @constructor
 */
sync.api.Dialog.SizeChangedEvent = function(type, newSize) {
 /**
  * The type of the event: {@link sync.api.Dialog.EventType.SIZE_CHANGED};
  *
  * @type {string}
  */
 this.type = null;

 /**
  * The new size of the dialog.
  * @type {{width: number, height: number}}
  */
 this.size = null;
};

/**
 * Event types generated by the dialog.
 *
 * @enum {string}
 */
sync.api.Dialog.EventType = {
  /**
   * Generated when the dialog size changed.
   * <br/>
   * See {@link sync.api.Dialog.SizeChangedEvent} for more details.
   */
  SIZE_CHANGED: 'size_changed'
};