goog.provide('md.MarkdownBaseAction');
/**
 * Base prototype for the markup actions
 * 
 * @param {string} displayName the displayed name of the action (shown as tooltip)
 * @param {string} iconName the base name of the icon to display in the menu bar
 * @param {sync.api.Editor} editor The editor.
 * @param {string} keystroke The shortcut for the action.
 */ 
md.MarkdownBaseAction = function(displayName, iconName, editor, keystroke) {
  sync.actions.AbstractAction.call(this, keystroke);
  this.displayName_ = displayName;
  this.iconName_ = iconName;
	this.editor_ = editor;

	this.mirrorEditor_ = null;
};
goog.inherits(md.MarkdownBaseAction, sync.actions.AbstractAction);

md.MarkdownBaseAction.prototype.setMirrorEditor = function (mirrorEditor) {
	this.mirrorEditor_ = mirrorEditor;
};

/** @override */
md.MarkdownBaseAction.prototype.getDescription = function(){
	return this.displayName_;
};

/** @override */
md.MarkdownBaseAction.prototype.getLargeIcon = function(devicePixelRation) {
	return sync.util.image.getImageUrl("/images/" + this.iconName_ + "24.png", 1);
};

/** @override */
md.MarkdownBaseAction.prototype.getSmallIcon = function(devicePixelRation) {
	return sync.util.image.getImageUrl("/images/" + this.iconName_ + "16.png", 1);
};

/**
 * @return {boolean} True if the action is enabled.
 * @override
 */
md.MarkdownBaseAction.prototype.isEnabled = function() {
	return !this.editor_.getReadOnlyStatus().isReadOnly();
};
