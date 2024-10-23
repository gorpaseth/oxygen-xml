/**
 * Selection Manager that only triggers selection changed events.
 * @constructor
 */
md.SelectionManager = function() {
  sync.api.SelectionManager.call(this);
};
goog.inherits(md.SelectionManager, sync.api.SelectionManager);

/**
 * Dispatch selection changed events on CodeMirror cursorActivity events.
 * @param {object} cmEditor The CodeMirror editor.
 */
md.SelectionManager.prototype.startListening = function (cmEditor) {
  cmEditor.on('cursorActivity', function () {
    this.dispatchEvent(sync.api.SelectionManager.EventType.SELECTION_CHANGED);
  }.bind(this));
};