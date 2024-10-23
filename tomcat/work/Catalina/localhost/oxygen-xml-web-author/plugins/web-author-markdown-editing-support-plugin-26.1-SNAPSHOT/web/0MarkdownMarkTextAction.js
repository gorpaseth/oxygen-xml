md.MarkdownMarkTextAction = function(displayName, iconName, fragment, editor, keystroke) {
  md.MarkdownBaseAction.call(this, displayName, iconName, editor, keystroke);
  this.fragment_ = fragment;
}
goog.inherits(md.MarkdownMarkTextAction, md.MarkdownBaseAction);


/**
 * Marks a selected text or inserts the markers if none selected. If the selection
 * already contains a marked text, the marking is reverted 
 */
md.MarkdownMarkTextAction.prototype.markText = function(doc) {
	var tag = this.fragment_;
	
	var offset = tag.length;
	var s = doc.getSelection(),
		alreadyMarked = s.slice(0, offset) === tag && s.slice(-offset) === tag;
	doc.replaceSelection(alreadyMarked ? s.slice(offset, -offset) : tag + s + tag);
	
	if(!alreadyMarked) {
		var cursor = doc.getCursor();
		doc.setCursor({line : cursor.line, ch : cursor.ch - offset})
	}
}

/** @override */
md.MarkdownMarkTextAction.prototype.actionPerformed = function(callback) {
  var doc = this.mirrorEditor_;
  doc.focus();
  this.markText(doc);
};