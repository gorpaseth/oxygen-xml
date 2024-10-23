md.InsertHeadingAction = function(displayName, iconName, prefix, editor) {
	md.MarkdownBaseAction.call(this, displayName, iconName, editor);
	this.prefix_ = prefix;
}
goog.inherits(md.InsertHeadingAction, md.MarkdownBaseAction);


md.InsertHeadingAction.prototype.insertHeading = function(doc) {
	doc.focus();
	var cursor = doc.getCursor();
	var line = doc.getLine(cursor.line);
	var pos = { 
		line : cursor.line,
		ch : line.length
	}
	
	if (line.length === 0) {
		// creates a new line with prefix
		doc.replaceRange('\n' + this.prefix_ +' ', pos);
	} else {
		// replaces the line by prefixing it with the prefix
		doc.replaceRange(this.prefix_ + " " + line, { line : cursor.line, ch : 0}, {line : cursor.line});
	}
}

/** @override */
md.InsertHeadingAction.prototype.actionPerformed = function(callback) {
	this.insertHeading(this.mirrorEditor_, this.prefix_);
};