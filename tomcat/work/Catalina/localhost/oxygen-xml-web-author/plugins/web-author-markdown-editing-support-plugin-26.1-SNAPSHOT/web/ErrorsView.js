/**
 * Validation side-view.
 * @constructor
 */
md.ErrorsView = function() {
  sync.view.ErrorsView.call(this);
};
goog.inherits(md.ErrorsView, sync.view.ErrorsView);


/**
 * Select a validation item in the editor.
 *
 * @param {sync.editors.MarkdownEditingSupport} editingSupport The editing support.
 * @param {string} startPosStr The serialization of the start position.
 * @param {string} endPosStr The serialization of the end position.
 *
 * @override
 */
md.ErrorsView.prototype.selectValidationItemInEditor = function(editingSupport, startPosStr, endPosStr) {
  editingSupport.getValidator().selectItem(startPosStr, endPosStr);
};

/**
 * Returns the currently selected item, or null if no item is selected.
 * @param {sync.editors.MarkdownEditingSupport} editingSupport The editing support.
 * @return {{startPos: string, endPos: string}} The selected item.
 *
 * @override
 */
md.ErrorsView.prototype.getSelectedItem = function(editingSupport) {
  return editingSupport.getValidator().getSelectedItem();
};

/** @override */
md.ErrorsView.prototype.supportsEditor = function(editor) {
  return editor.getEditorType() === sync.api.Editor.EditorTypes.MARKDOWN &&
      editor.getEditingSupport().getSchematronUrl();
};

/** @protected */
md.ErrorsView.prototype.getRailEntryId = function() {
  return 'markdown-validation';
};
