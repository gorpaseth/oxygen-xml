goog.provide('sync.editors.MarkdownEditingSupport');



/**
 * Markdown editing support.
 *
 * @param {sync.Editor} editor The editor.
 * @param {sync.api.Workspace.LoadingOptions} options the editor loading options.
 *
 * @constructor
 */
sync.editors.MarkdownEditingSupport = function(editor, options) {
  sync.api.EditingSupport.call(this, options);

  this.editor = editor;

  this.errorsModel_ = new sync.model.ValidationErrorsModel();
  this.registerDisposable(this.errorsModel_);

  this.editor.listen(sync.api.Editor.EventTypes.DIRTY_STATUS_CHANGED, goog.bind(function(e) {
    var codeEditor = this.iframe.contentWindow.editor;
    // sync WA editor and code mirror editor dirty status.
    if(!e.isDirty && !codeEditor.isClean()) {
      codeEditor.markClean();
      this.editor.getActionsManager().refreshActionsStatus();
    }
  }, this));

  // sync readOnly status to the code mirror editor.
  this.editor.getReadOnlyStatus().listen(sync.model.ReadOnlyStatus.EventTypes.READ_ONLY_STATUS_CHANGED,
      e => this.applyReadOnlyState_(e.isReadOnly));

  goog.events.listen(document.body,
    goog.events.EventType.KEYDOWN,
    this.handleKeyEvent,
    false, this);

  // The selection manager for the editor.
  this.selectionManager_ = new md.SelectionManager();
  this.registerDisposable(this.selectionManager_);
};
goog.inherits(sync.editors.MarkdownEditingSupport, sync.api.EditingSupport);

/**
 * CodeMirror actions
 */
var cmCommands = [];

/**
 * Apply the read only status to the code mirror editor.
 * @param {boolean} readOnly the read only status.
 * @private
 */
sync.editors.MarkdownEditingSupport.prototype.applyReadOnlyState_ = function(readOnly) {
  if(this.iframe && this.iframe.contentWindow.setReadOnly) {
    this.iframe.contentWindow.setReadOnly(readOnly);
  } else {
    this.iframe.contentWindow.readOnly = readOnly;
  }
}

/**
 * Register the markdown actions.
 *
 * @param {sync.api.Editor} editor the editor.
 */
sync.editors.MarkdownEditingSupport.prototype.registerActions = function(editor) {
  var actionsManager = editor.getActionsManager();
  actionsManager.registerAction('ReportProblem', sync.actions.ReportProblemAction.getInstance());
  actionsManager.registerAction('Help', new sync.actions.ShowHelp());
  actionsManager.registerAction('Author/Save', new sync.actions.SaveContentAction(editor));

  var ih1 = new md.InsertHeadingAction(tr(msgs.MD_HEADING_1), "Heading1_", '#', this.editor);
  actionsManager.registerAction('H1', ih1);

  var ih2 = new md.InsertHeadingAction(tr(msgs.MD_HEADING_2), "Heading2_", '##', this.editor);
  actionsManager.registerAction('H2', ih2);

  var ih3 = new md.InsertHeadingAction(tr(msgs.MD_HEADING_3), "Heading3_", '###', this.editor);
  actionsManager.registerAction('H3', ih3);

  var ihr = new md.InsertHorizontalRuleAction(tr(msgs.MD_HORIZONTAL_RULE), "Line", this.editor);
  actionsManager.registerAction('HR', ihr);

  var mba = new md.MarkdownMarkTextAction(tr(msgs.MD_BOLD), "Bold", '**', this.editor, 'M1 B');
  actionsManager.registerAction('Bold', mba);

  var mia = new md.MarkdownMarkTextAction(tr(msgs.MD_ITALIC), "Italic", '_',  this.editor, 'M1 I');
  actionsManager.registerAction('Italic', mia);

  var msa = new md.MarkdownMarkTextAction(tr(msgs.MD_STRIKETHROUGH), "StrikeThrough", '~~', this.editor);
  actionsManager.registerAction('StrikeThrough', msa);

  var cba = new md.MarkCodeBlockAction(tr(msgs.MD_CODE_BLOCK), "CodeBlock", this.editor);
  actionsManager.registerAction('CodeBlock', cba);

  var qba = new md.MarkQuoteBlockAction(tr(msgs.MD_QUOTE_BLOCK), "Quote", this.editor);
  actionsManager.registerAction('QuoteBlock', qba);

  var iia = new md.InsertUrlAction(tr(msgs.MD_INSERT_IMAGE), "Image", editor, {
	  textLabel: tr(msgs.MD_ALTERNATE_TEXT_LABEL),
	  dialogTitle: tr(msgs.MD_INSERT_IMAGE),
	  prefix: '!'});
  actionsManager.registerAction('InsertImage', iia);

  var ila = new md.InsertUrlAction(tr(msgs.MD_INSERT_LINK), "Link", editor, {
	  textLabel: tr(msgs.MD_TEXT_LABEL),
	  replaceSelection: true,
	  dialogTitle: tr(msgs.MD_INSERT_LINK)
  });
  actionsManager.registerAction('InsertLink', ila);

  var ita = new md.InsertTableAction(tr(msgs.MD_INSERT_TABLE), "Table", this.editor);
  actionsManager.registerAction('InsertTable', ita);

  var iola = new md.InsertListAction(tr(msgs.MD_INSERT_ORDERED_LIST), "OrderedList", "1.", this.editor, 'M2 M1 7');
  actionsManager.registerAction('InsertOrderedList', iola);

  var iula = new md.InsertListAction(tr(msgs.MD_INSERT_UNORDERED_LIST), "UnorderedList", "-", this.editor, 'M2 M1 8');
  actionsManager.registerAction('InsertUnorderedList', iula);

  var itla = new md.InsertListAction(tr(msgs.MD_INSERT_TASK_LIST), "TaskList", "- []", this.editor);
  actionsManager.registerAction('InsertTaskList', itla);

  cmCommands.push(ih1, ih2, ih3, ihr, mba, mia, msa, cba, qba, iia, ila, ita, iola, iula, itla);
  window.cmCommands = cmCommands;
};

/** @override */
sync.editors.MarkdownEditingSupport.prototype.focus = function () {
  this.iframe.contentWindow.editor.focus();
};

/** @override */
sync.editors.MarkdownEditingSupport.prototype.load = function(newDoc, docContainer, problemReporter) {
  var cD = goog.dom.createDom;

  goog.dom.removeChildren(docContainer);
  var content = newDoc.document;
  this.iframe = cD('iframe', {
    className: 'markdown-editing-area',
    src: "../plugin-resources/web-author-markdown-editing-support/editor.html",
    name: 'markdown'
  });
  goog.dom.appendChild(docContainer, this.iframe);
  this.iframe.onload = goog.bind(this.iframeLoaded, this);

  this.iframe.contentWindow.save = goog.bind(function() {
    if (!this.editor.getReadOnlyStatus().isReadOnly()) {
      let saveAction = this.editor.getActionsManager().getActionByShortcut('M1 s');
      saveAction && saveAction.actionPerformed(function() {});
    }
  }, this);

  // pass the content to the CodeMirror editor.
  this.iframe.contentWindow.content = content;

  this.registerActions(this.editor);

  /** @type {{message: string, code: string}=} */
  var readOnlyReason = newDoc.readOnlyReason;
  var state = {readOnly: !!readOnlyReason};
  if(readOnlyReason) {
    goog.object.extend(state, readOnlyReason );
  }
  this.editor.setReadOnlyState(state);
  this.applyReadOnlyState_(state.readOnly);

  workspace.getViewManager().installView('markdown-validation', new md.ErrorsView());

  return goog.Promise.resolve();
};

/** @override */
sync.editors.MarkdownEditingSupport.prototype.getContent = function(callback) {
  var content = this.iframe.contentWindow.getContent();

  callback(null, content);
};

/**
 * Function called when the iframe was loaded.
 */
sync.editors.MarkdownEditingSupport.prototype.iframeLoaded = function() {
	var cmEditor = this.iframe.contentWindow.getCmEditor();
  this.cmEditor_ = cmEditor;

	for(var i=0; i < cmCommands.length; i++) {
		//setupCommand(cmCommands[i]);
		var cmd = cmCommands[i];
		cmd.setMirrorEditor(cmEditor);

		// add the shortcut for the command if any
		var cmdShortcut = cmd.getShortcut();

		if(cmdShortcut) {
			//transforms shortcut from webauthor to CodeMirror format
			cmdShortcut = cmdShortcut.replace('M1 ', goog.userAgent.MAC ? 'Cmd-' : 'Ctrl-');
			cmdShortcut = cmdShortcut.replace('M2 ', 'Shift-');
			// Make sure to call the right actionPerformed.
			cmEditor.getOption("extraKeys")[cmdShortcut] = cmd.actionPerformed.bind(cmd);
		}
	}

  workspace.landmarks_.initShortcuts(this.iframe.contentDocument.body);

  cmEditor.on('change', goog.bind(function(e) {
    // the CodeMirror editor's clean status might have changed (input or
	// undo/redo)
    this.editor.setDirty(!e.isClean());
    this.editor.getActionsManager().refreshActionsStatus();
  }, this));

  this.selectionManager_.startListening(cmEditor);

  // Initialize validation.
  var schematronUrl = this.getSchematronUrl();
  if (schematronUrl && this.options['validate.as.you.type'] !== 'false') {
    this.validator_ = new md.Validation(cmEditor, this.errorsModel_, this.getUrl(), schematronUrl, this.iframe);
  }
};

/**
 * @return {md.Validation} the validator.
 */
sync.editors.MarkdownEditingSupport.prototype.getValidator = function() {
  return this.validator_;
};

/**
 * @return {string} The URL of the Schematron to use for validation.
 */
sync.editors.MarkdownEditingSupport.prototype.getSchematronUrl = function() {
  return this.options.schematronUrl;
};

/** @override */
sync.editors.MarkdownEditingSupport.prototype.getFirstToolbar = function() {
	var builtinToolbar = new sync.view.ExtensionToolbar(this.editor.getActionsManager());
  this.registerDisposable(builtinToolbar);

  builtinToolbar.config = new sync.actions.ActionsConfig({
    toolbars: [{
      type: "list",
      name: "text",
      children: [
    	  {
       	    type: "action",
            id: 'H1'
           },{
         	 type: "action",
             id: 'H2'
           },{
          	 type: "action",
              id: 'H3'
           },{
              type: "action",
              id: 'HR'
           },{
        	  type: "sep"
           },{
            type: "action",
            id: "Bold"
           },{
        	 type: "action",
        	 id: "Italic"
           },{
        	 type: "action",
        	 id: "StrikeThrough"
           },{
        	 type: "sep"
           },{
        	 type: "action",
        	 id: "CodeBlock"
           },{
        	 type:"action",
        	 id: "QuoteBlock"
           },{
        	 type: "sep"
           },{
        	 type: "action",
        	 id: "InsertLink"
           },{
        	 type: "action",
        	 id: "InsertImage"
           },{
        	 type: "sep"
           },{
        	  type: "action",
        	  id : "InsertOrderedList"
           },{
        	  type: "action",
        	  id : "InsertUnorderedList"
           },{
        	  type: "action",
        	  id : "InsertTaskList"
           },{
        	  type: "action",
        	  id: "InsertTable"
           }
       ]
    }]
  });

  return builtinToolbar;
};

/** @override */
sync.editors.MarkdownEditingSupport.prototype.getApplicationToolbar = function() {
  var builtinToolbar = new sync.view.ExtensionToolbar(this.editor.getActionsManager());
  this.registerDisposable(builtinToolbar);

  builtinToolbar.config = new sync.actions.ActionsConfig({
    toolbars: [{
      type: "list",
      name: "Builtin",
      displayName: tr(msgs.GENERAL_),
      children: [
        {
          type: "action",
          id: 'Author/Save'
        },
        {
          type: "list",
          name: 'More...',
          displayName: tr(msgs.MORE_ACTIONS_),
          iconDom: (function () {
            var iconDiv = document.createElement('div');
            goog.dom.classlist.add(iconDiv, 'more');
            return iconDiv;
          })(),
          children: [
            {
              type: "action",
              id: 'Help'
            },
            {
              type: "action",
              id: 'ReportProblem'
            }]
        }
      ]
    }]
  });
  return builtinToolbar;
};

/**
 * Handler for the key events.
 *
 * @param e the browser KEY event.
 */
sync.editors.MarkdownEditingSupport.prototype.handleKeyEvent = function(e) {
  var shortcut = '';
  if(e.ctrlKey || e.metaKey) {
    shortcut += 'M1 ';
  }
  shortcut += String.fromCharCode(e.keyCode);

  var action = this.editor.getActionsManager().getActionByShortcut(shortcut);
  if(action) {
    e.preventDefault();
    action.isEnabled() && action.actionPerformed(function() {});
  }
};

/** @override */
sync.editors.MarkdownEditingSupport.prototype.getType = function() {
  return sync.api.Editor.EditorTypes.MARKDOWN;
};

/** @override */
sync.editors.MarkdownEditingSupport.prototype.getSelectionManager = function() {
  return this.selectionManager_;
};

/** @override */
sync.editors.MarkdownEditingSupport.prototype.getErrorsModel = function() {
  return this.errorsModel_;
};

/** @override */
sync.editors.MarkdownEditingSupport.prototype.getActionsManager = function() {
  return this.editor.getActionsManager();
};
