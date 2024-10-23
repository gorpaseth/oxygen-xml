/**
 * Tooltip shown over validation markers displaying validation information.
 *
 * @param {object} cmEditor The editor.
 * @param {sync.model.ValidationErrorsModel} validationErrorsModel Validation markers model.
 * @param {Element} iframe The iframe element.
 *
 * @constructor
 */
md.ValidationMarkerTooltip = function(cmEditor, validationErrorsModel, iframe) {
  goog.Disposable.call(this);

  this.validationMarkerClass_ = 'cm-validation-marker';
  // Show hovercards over elements with the validation item class.
  this.hoverCard_ = new sync.view.HoverCard(function(node) {
    return this.containsValidationClass_(node);
  }.bind(this), iframe, iframe);
  this.registerDisposable(this.hoverCard_);

  // The tooltip event handler, used to add click listeners on quick fix links.
  this.eventHandler_ = new goog.events.EventHandler(this);
  this.registerDisposable(this.eventHandler_);

  // Listener after showing the tooltip.
  this.hoverCard_.setHotSpotPadding(new goog.math.Box(50, 50, 50, 50));
  goog.events.listen(this.hoverCard_, goog.ui.HoverCard.EventType.BEFORE_HIDE,
    goog.bind(this.eventHandler_.removeAll, this.eventHandler_));

  // Listener before showing the tooltip.
  goog.events.listen(this.hoverCard_, goog.ui.HoverCard.EventType.BEFORE_SHOW,
    goog.bind(this.beforeShow_, this, validationErrorsModel));
  this.hoverCard_.className = 'tooltip-hovercard validation-hovercard';
};
goog.inherits(md.ValidationMarkerTooltip, goog.Disposable);

/**
 * Check if node is element and contains validation item class.
 * @param {Node} node The node to check.
 * @return {boolean} Whether the node contains the class.
 * @private
 */
md.ValidationMarkerTooltip.prototype.containsValidationClass_ = function (node) {
  return goog.dom.isElement(node) && node.classList.contains(this.validationMarkerClass_);
};

/**
 * Render the validation tooltip for the current validation item.
 * @param {sync.model.ValidationErrorsModel} validationErrorsModel validation errors model.
 * @return {boolean} Whether to go ahead and show the tooltip or not.
 * @private
 */
md.ValidationMarkerTooltip.prototype.beforeShow_ = function(validationErrorsModel) {
  goog.dom.removeChildren(this.hoverCard_.getElement());
  // Assemble marker properties in tooltip.
  var trigger = this.hoverCard_.getAnchorElement();
  var validationItemId = goog.dom.dataset.get(trigger, 'oxyValidationId');
  var error = validationErrorsModel.getMostImportantError(validationItemId);
  var targetMarker = error && error.textMarker;
  if (targetMarker) {
    var cD = goog.dom.createDom;
    var markerTooltipDiv = cD('div', {id: 'validation_marker_preview_tooltip', className: 'preview'},
      cD('div', '', cD('span', 'preview-author', tr(msgs.VALIDATION_))),
      cD('div', 'preview-comment-tooltip',
        cD('div', "validation-problem-message",
          cD('span', 'validation-message', targetMarker.oxyData.errorMessage))
      )
    );
    markerTooltipDiv.setAttribute('data-severity', targetMarker.oxyData.severity);
    goog.dom.append(this.hoverCard_.getElement(), markerTooltipDiv);
  }
  return !!targetMarker;
};