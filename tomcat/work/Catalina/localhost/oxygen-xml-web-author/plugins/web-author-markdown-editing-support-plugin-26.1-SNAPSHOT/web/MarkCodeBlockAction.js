md.MarkCodeBlockAction = function(displayName, iconName, editor) {
	md.MarkdownBaseAction.call(this, displayName, iconName, editor);
}
goog.inherits(md.MarkCodeBlockAction, md.MarkdownBaseAction);

/** @override */
md.MarkCodeBlockAction.prototype.actionPerformed = function(callback,
		operationType) {
	var doc = this.mirrorEditor_;
	doc.focus();

	var selection = doc.getSelection();
	var toPosition = doc.getCursor("to");

	//insert code block if no selection or multiple line selection
	if (selection.length === 0 || selection.indexOf("\n") !== -1) {
		doc.replaceSelection("\n```\n" + selection + "\n```\n");
		doc.setCursor({
			line : toPosition.line + 2,
			ch : toPosition.ch + 1
		})
	} else {
		doc.replaceSelection("`" + selection + "`");
		doc.setCursor({
			line : toPosition.line,
			ch : toPosition.ch + 1
		})
	}

};