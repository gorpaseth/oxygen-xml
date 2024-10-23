md.InsertTableAction = function(displayName, iconName, editor) {
	md.MarkdownBaseAction.call(this, displayName, iconName, editor);
}
goog.inherits(md.InsertTableAction, md.MarkdownBaseAction);


/** @override */
md.InsertTableAction.prototype.actionPerformed = function(callback, operationType) {
	var doc = this.mirrorEditor_;
	doc.focus();

	var text ="\n\n";
	var cursor = doc.getCursor();
	
	var isOnEmptyLine = getPosInLine(doc) === PosInLine.ON_EMPTY_LINE;
	if(isOnEmptyLine){
		text = "\n";
	} 
	
	text +=  
	"|  |  |  |\n" +
    "|--|--|--|\n" +
    "|  |  |  |\n" +
    "|  |  |  |\n" +
    "|  |  |  |\n";
	
	doc.replaceRange(text, cursor);
	
	doc.setCursor({line : cursor.line + (isOnEmptyLine ? 1 : 2), ch : 1});
};