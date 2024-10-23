md.InsertHorizontalRuleAction=function(displayName, iconName, editor) {
	md.MarkdownBaseAction.call(this, displayName, iconName, editor);
}
goog.inherits(md.InsertHorizontalRuleAction, md.MarkdownBaseAction);

/** @override */
md.InsertHorizontalRuleAction.prototype.getLargeIcon = function(devicePixelRation) {
	return sync.util.image.getImageUrl("/images/Line16.png", 1);
}

/** @override */
md.InsertHorizontalRuleAction.prototype.actionPerformed = function(callback,
		operationType) {
	var doc = this.mirrorEditor_;
	doc.focus();
	var cursor = doc.getCursor();
	
	var hrString = '';

	var posInLine = getPosInLine(doc);
	var noOfLines = 2;

	switch (posInLine) {
	case PosInLine.ON_EMPTY_LINE:
	case PosInLine.LINE_START:
		hrString += '\n';
		break;
	case PosInLine.LINE_END:
	case PosInLine.LINE_MIDDLE:
		hrString += '\n\n';
		noOfLines = 3
		break;
	}
	
	hrString += '----------\n\n';
	doc.replaceRange(hrString, cursor);
	doc.setCursor({line : cursor.line + noOfLines, ch : 0})
};
