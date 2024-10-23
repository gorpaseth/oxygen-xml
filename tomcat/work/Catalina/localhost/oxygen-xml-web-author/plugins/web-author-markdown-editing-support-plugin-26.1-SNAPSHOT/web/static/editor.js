
/**
 * Handles the document save.
 */
function saveDocument() {
  window.save && window.save();
}

window.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  mode: {
    name: "markdown",
    highlightFormatting: true
  },
  autofocus: "on",
  extraKeys: {
    "Ctrl-S": saveDocument,
    "Cmd-S": saveDocument,
    // Change the default find action to be persistent.
    "Ctrl-F": "findPersistent",
    "Cmd-F": "findPersistent"
  },
  readOnly: window.readOnly,
  scrollbarStyle: "null",
  viewportMargin: Infinity,
  lineWrapping: true
});
window.editor.setSize('100%', '100%');

/**
 * Initializes the editor.
 */
function initEditor() {
  var cm = window.editor;
  // If the outer window set the content property in this window, use it as the content.
  var content = window.content;
  cm.setValue(content);
  cm.textWasInitialized = true;

  cm.markClean();
  cm.clearHistory();

  // iframe loaded, stop the spinner.
  var outerSpinner = window.parent.iframeSpinner;
  if (outerSpinner) {
    outerSpinner.hide();
  }
}

function getCmEditor() {
	return window.editor;
}

/**
 * @return {string} the current editor content.
 */
function getContent() {
  return window.editor.getValue();
}

function setReadOnly(readOnly) {
  window.editor.setOption('readOnly', readOnly);
}

initEditor();
