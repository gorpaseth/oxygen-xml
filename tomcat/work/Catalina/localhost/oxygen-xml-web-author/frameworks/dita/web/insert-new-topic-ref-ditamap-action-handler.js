if(sync.ext.Registry.extension.type === 'ditamap' ||
    sync.ext.Registry.extension.type === 'ditamap_resolved_topics') {
  sync.ext.Registry.extension.registerActionsHandler(function(editor, actionsConfig) {
    var actionsManager = editor.getActionsManager();
    var insertNewTopicRefId = 'insert.new.dita.resource';
    var originalInsertNewTopicRef = actionsManager.getActionById(insertNewTopicRefId);
    if (originalInsertNewTopicRef) {
      actionsManager.registerAction(insertNewTopicRefId, new sync.actions.InsertNewTopicRef(
        originalInsertNewTopicRef, editor
      ));
       
      // WA-6268: Use action name for insert new topic ref
      var ccItems = actionsConfig.ccItems;
      if (ccItems) {
        var insertNewTopicRef = goog.array.find(ccItems, function (item) {
          return item.id === insertNewTopicRefId;
        });
        if (insertNewTopicRef) {
          insertNewTopicRef.ccItemAlias = tr(msgs.TOPIC_REFERENCE_NEW_TOPIC_);
        }
      }
    }
  });
}
