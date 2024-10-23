goog.require('goog.net.XhrIo');

/**
 * Markdown Validation.
 * @param {object} cmEditor The editor.
 * @param {sync.model.ValidationErrorsModel} errorsModel The model of validation errors.
 * @param {string} docUrl The document URL.
 * @param {string} schematronUrl The URL of the Schematron file to use.
 * @param {Element} iframe The iframe element.
 * @constructor
 */
md.Validation = function (cmEditor, errorsModel, docUrl, schematronUrl, iframe) {
  goog.Disposable.call(this);

  this.cmEditor_ = cmEditor;
  this.errorsModel_ = errorsModel;
  this.schematronUrl_ = schematronUrl;
  this.docUrl_ = docUrl;

  // Trigger validation request after user stopped editing.
  this.updateValidationDebouncer_ = new goog.async.Debouncer(this.validationCheck_, 1200, this);
  cmEditor.on('change', function () {
    // Schedule a validation update.
    this.updateValidationDebouncer_.fire();
  }.bind(this));

  // Do first check.
  this.validationErrorClass_ = 'cm-validation-marker';
  this.markers_ = [];
  this.validationCheck_();

  // Load validation-only styles.
  this.loadValidationCss_(iframe.contentDocument.head);
  // Show marker tooltip over validation items.
  this.registerDisposable(new md.ValidationMarkerTooltip(cmEditor, errorsModel, iframe));
};
goog.inherits(md.Validation, goog.Disposable);

/**
 * Do validation check.
 * @private
 */
md.Validation.prototype.validationCheck_ = function () {
  var url = "../plugins-dispatcher/markdown-plugin";
  // Send document content.
  var params = {
    docContent: this.cmEditor_.getValue(),
    docUrl: this.docUrl_,
    schematronUrl: this.schematronUrl_
  };

  goog.net.XhrIo.send(url, goog.bind(this.validationItemsReceived_, this), "POST", JSON.stringify(params),
    {
      'Content-Type': 'application/json',
      'X-Requested-With': 'shp'
    });
};

/**
 * Returns the currently selected item, or null if no item is selected.
 * @return {{startPos: string, endPos: string}} The selected item.
 */
md.Validation.prototype.getSelectedItem = function() {
  var cmEditor = this.cmEditor_;
  var cursorPos = cmEditor.getCursor();
  var marksFound = cmEditor.findMarksAt(cursorPos);

  var markerSelected = goog.array.find(marksFound, function (mark) {
    return mark.oxyData && mark.oxyData.type === 'validation';
  });
  return markerSelected ? markerSelected.oxyData : {};
};

/**
 * Select validation item between positions.
 *
 * @param {string} startPosStr The serialization of the start position.
 * @param {string} endPosStr The serialization of the end position.
 */
md.Validation.prototype.selectItem = function(startPosStr, endPosStr) {
  var cmEditor = this.cmEditor_;
  var error = this.errorsModel_.getMostImportantError(startPosStr + '~' + endPosStr);
  if (error) {
    var pos = error.textMarker.find();
    if (pos) {
      cmEditor.setSelection(pos.from, pos.to);
    }
  }
};


/**
 * Mark all validation items in the document.
 * @param {{target:goog.net.XhrIo}} responseEvent The event with the list of validation items, stringified.
 * @private
 */
md.Validation.prototype.validationItemsReceived_ = function (responseEvent) {
  var validationErrors = responseEvent.target.getResponseJson() || [];

  // Sort errors in document order.
  validationErrors.sort(function(error1, error2) {
    if (error1.startPosition === error2.startPosition) {
      return Number(error1.length) - Number(error2.length);
    } else {
      var startPosSplit1 = error1.startPosition.split('-');
      var startLine1 = Number(startPosSplit1[0]) - 1;

      var startPosSplit2 = error2.startPosition.split('-');
      var startLine2 = Number(startPosSplit2[0]) - 1;

      if (startLine1 === startLine2) {
        var startCh1 = Number(startPosSplit1[1]) - 1;
        var startCh2 = Number(startPosSplit2[1]) - 1;
        return startCh1 - startCh2;
      } else {
        return startLine1 - startLine2;
      }
    }
  });

  var errorDescriptors = goog.array.map(validationErrors, function (validationError) {
    var startPosSplit = validationError.startPosition.split('-');
    var startLine = Number(startPosSplit[0]) - 1;
    var startCh = Number(startPosSplit[1]) - 1;
    var startPositionStr = startLine + '~' + startCh;

    var endLine = startLine;
    var length = Number(validationError.length);
    if (length === -1) {
      // If length is not specified, highlight the entire line, but no more than 60 chars.
      length = 95;
    }
    var endCh = startCh + length;
    var endPositionStr = endLine + '-' + endCh;

    var errorMessage = validationError.errorMessage || '';
    var severity = validationError.severity;
    var severityClass = this.getClassForSeverity_(severity);

    var itemId = startPositionStr + '~' + endPositionStr;
    return {
      errorMessage: errorMessage,
      severity: severity,
      startPosition: startPositionStr,
      endPosition: endPositionStr,
      // Node IDs is used to group problems over the same range.
      nodeIds: [itemId],

      // Data used to create the marker associated with this error descriptor.
      textMarkerArgs: {
        from: {line: startLine, ch: startCh},
        to: {line: endLine,   ch: endCh},
        options: {
          className: this.validationErrorClass_ + ' ' + severityClass,
          attributes: {'data-oxy-validation-id': itemId}
        }
      }
    };
  }, this);
  this.errorsModel_.setErrors(errorDescriptors, true);

  // We need to create text markers for each error descriptor. In CodeMirror, the last textmarker
  // over a range overwrites the attributes of the previous ones. So we want to create the most
  // severe ones last.
  var severityOrder = ["info", "warning", "error", "fatal error"];
  var sortedErrorDescriptors = errorDescriptors.slice(0);
  sortedErrorDescriptors.sort(function(error1, error2) {
    return severityOrder.indexOf(error1.severity) - severityOrder.indexOf(error2.severity);
  });

  // Clear previous markers.
  this.markers_.forEach(function(marker) {
    marker.clear();
  });
  this.markers_ = [];

  // Link the text marker with each validation error.
  errorDescriptors.forEach(goog.bind(function(errorDesc) {
    var args = errorDesc.textMarkerArgs;
    var textMarker = this.cmEditor_.markText(args.from, args.to, args.options);
    this.markers_.push(textMarker);
    textMarker.oxyData = {
      type: 'validation',
      startPos: errorDesc.startPosition,
      endPos: errorDesc.endPosition,
      severity: errorDesc.severity,
      errorMessage: errorDesc.errorMessage
    };
    errorDesc.textMarker = textMarker;
  }, this));
};

/**
 * @param {string} severity The severity type.
 * @return {string} Class used to style marker according to severity.
 * @private
 */
md.Validation.prototype.getClassForSeverity_ = function (severity) {
  var severityClass = 'validation-error';
  if (severity && severity !== 'fatal error') {
    severityClass = 'validation-' + severity;
  }
  return severityClass;
};

/**
 * Load css file with validation marker/tooltip styling into the iframe.
 * Would not be used by most users, no reason to always load it.
 * @param {Element} iframeHead The iframe's head element, to add CSS to.
 * @private
 */
md.Validation.prototype.loadValidationCss_ = function (iframeHead) {
  goog.dom.append(iframeHead, goog.dom.createDom('link', {
    rel: 'stylesheet',
    type: 'text/css',
    href: 'validationtooltip.css'
  }));
};