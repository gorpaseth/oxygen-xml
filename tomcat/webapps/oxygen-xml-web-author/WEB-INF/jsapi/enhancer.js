
namespace('sync.formctrls');


/**
 * <p>The base class used for form controls enhancers.
 *
 * <p>It is used to enhance the rendering created by the server-side code. It can also register
 * event handlers in order to provide editing capability.
 *
 * @param {HTMLElement} formControl The HTML element to enhance.
 * @param {sync.api.EditingSupport} editingSupport The editing support of the containing editor.
 *
 * @constructor
 */
sync.formctrls.Enhancer = function(formControl, editingSupport) {
 /**
  * The HTML element to enhance.
  * @type {HTMLElement}
  */
 this.formControl = null;
 /**
  * The editing support of the containing editor.
  * @type {sync.api.EditingSupport}
  */
 this.editingSupport = null;
};

/**
 * Class to be added to the form control when it is active but it does not have focus.
 *
 * @type {string}
 */
sync.formctrls.Enhancer.ACTIVE_CLASS = 'oxy-active-form-control';

/**
 * <p>Getter for the 'disabled' state of the form control.
 * <p>By default, the form control is disabled when is in read-only context.
 *
 * <p>A read-only context may be:
 * <li> a non-editable node when the '-oxy-editable' CSS rule is used
 * <li> a XML node deleted with change tracking enabled
 * <li> the whole 'Editor' when 'sync.api.ReadOnlyState' mark it as read-ony
 *
 * @returns {Boolean} <code>true</code> if the form control is disabled, <code>false</code> otherwise.
 */
sync.formctrls.Enhancer.prototype.isDisabled = function() {};

/**
 * Returns the XML node on which the form control is placed.
 *
 * @returns {Node} the node on which the form control is placed.
 */
sync.formctrls.Enhancer.prototype.getParentNode = function() {};

/**
 * <p>Method called to enhance an HTML element that wraps the form control.
 *
 * <p>This should be implemented in subclasses.
 *
 * <p>This method may be called on another instance of the form control than the two other methods,
 * enterDocument & exitDocument.
 */
sync.formctrls.Enhancer.prototype.enhanceDom = function() {};

/**
 * <p>Method called to initialize the HTML element after it entered the DOM. This method should be implemented in
 * subclasses to register event handlers on the form-control.
 *
 * <p>IMPORTANT:  It is advisable to call the 'super' method in your implementation. See explanation below.
 *
 * <p>The editor that embeds the form controls usually calls preventDefault on any browser event on
 * the 'bubble' phase.
 *
 * <p>However, the default implementation of this method, listens to these events and calls 'stopPropagation' on
 * them on the 'bubble' phase, so that the editor's listener which calls 'preventDefault' does not run. This
 * enables the form control to benefit from native input events: typing, mouse clicks, drag&drop, etc.
 *
 * @param {Controller} controller The document controller.
 */
sync.formctrls.Enhancer.prototype.enterDocument = function(controller) {};

/**
 * <p>Method called to before the form-control is removed from the document.
 *
 * <p>This should be implemented in subclasses to remove all the listeners on that element,
 * and to reset any global state that refers to that element.
 *
 * <p>The default implementation un-registers all the listeners on the form-control registered using
 * the Closure library.
 */
sync.formctrls.Enhancer.prototype.exitDocument = function() {};



/**
 * Recycle the enhancer for the new server-side rendering of the form control
 * @param {HTMLElement} newRendering The new server-side rendering.
 * @return {boolean} true if the enhancer can be recycled.
 * @abstract
 */
sync.formctrls.Enhancer.prototype.recycleFor = function(newRendering) {};

