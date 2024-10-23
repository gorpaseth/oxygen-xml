(function () {
  var MARKDOWN_CONTENT_TYPE = 'text/markdown';

  var supportProvider = {
    getEditingSupport: function(contentType, editor, options) {
      if(contentType && contentType.indexOf(MARKDOWN_CONTENT_TYPE) !== -1) {
        return new sync.editors.MarkdownEditingSupport(editor, options);
      }
    }
  };

  /** Register an EditingSupport provider. */
  workspace.getEditingSupportManager().registerEditingSupportProvider(supportProvider);
  /** Add a validation side-view. */
  workspace.getViewManager().addView('markdown-validation');
})();
