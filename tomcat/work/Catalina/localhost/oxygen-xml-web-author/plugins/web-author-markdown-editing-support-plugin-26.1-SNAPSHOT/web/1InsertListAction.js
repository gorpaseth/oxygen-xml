md.InsertListAction = function(displayName, iconName, prefix, editor, opt_keystroke) {
	md.MarkdownBaseAction.call(this, displayName, iconName, editor, opt_keystroke);
	this.prefix_ = prefix;
}
goog.inherits(md.InsertListAction, md.MarkdownBaseAction);


/** @override */
md.InsertListAction.prototype.actionPerformed = function(callback, operationType) {

	var doc = this.mirrorEditor_;
	doc.focus();

	var cursor = doc.getCursor();

	var selText = doc.getSelection();
	if (selText) {
		// each line in the selection becomes an item
		var selStartLine = doc.getCursor("from").line;
		var selEndLine = doc.getCursor("to").line;

		var replacement = '';
		for (var pos = selStartLine; pos <= selEndLine; pos++) {
			var line = doc.getLine(pos);
			replacement += this.prefix_ + " " + line + (pos === selEndLine ? "" : "\n");
		}

		var lastLineLength = doc.getLine(selEndLine).length
		doc.replaceRange(replacement, {
			line : selStartLine,
			ch : 0
		}, {
			line : selEndLine,
			ch : lastLineLength
		});
	} else {
		var text = "\n\n";

		var isOnEmptyLine = getPosInLine(doc) === PosInLine.ON_EMPTY_LINE;
		if (isOnEmptyLine) {
			text = "\n";
		}

		text += 
			this.prefix_ + " Item\n" + 
			this.prefix_ + " Item\n" + 
			this.prefix_ + " Item\n";

		doc.replaceRange(text, cursor);

		doc.setCursor({
			line : cursor.line + (isOnEmptyLine ? 1 : 2),
			ch : this.prefix_.length + 1
		});
	}
};