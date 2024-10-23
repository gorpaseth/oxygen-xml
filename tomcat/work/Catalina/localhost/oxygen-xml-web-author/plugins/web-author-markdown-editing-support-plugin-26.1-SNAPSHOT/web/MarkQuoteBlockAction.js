md.MarkQuoteBlockAction = function(displayName, iconName, editor) {
	md.MarkdownBaseAction.call(this, displayName, iconName, editor);
}
goog.inherits(md.MarkQuoteBlockAction, md.MarkdownBaseAction);


/** @override */
md.MarkQuoteBlockAction.prototype.actionPerformed = function(callback, operationType) {
	var doc = this.mirrorEditor_;
	doc.focus();

	var selection = doc.getSelection();

	if (selection.length === 0 || selection.indexOf("\n") !== -1) {
		var toPosition = doc.getCursor("to");
		// prefix every line with >
		var replacement =  selection.replace(/\n/g,"\n> ");
		doc.replaceSelection("\n> " + replacement + "\n\n");
		
		doc.setCursor({
			line : toPosition.line + 1,
			ch : toPosition.ch + 2
		})
	} else {
		var cursor = doc.getCursor();
		doc.replaceSelection("\n> " + selection + "\n\n");
		// reposition cursor
		var newPos = {
			line : cursor.line + 1,
			ch : cursor.ch + 2
		}
		doc.setCursor(newPos);
	}
};