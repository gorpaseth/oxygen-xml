/**
 * Base action for link and image insert actions
 * 
 * @param displayName {string} the displayed name of the action (shown as tooltip)
 * @param iconName {string} the base name of the icon to display in the menu bar
 * @param editor {Object} the CodeMirror editor
 * @param {{textLabel: string, replaceSection: boolean}} props. 
 * 	- textLabel the text of the alternate text of text field
 *  - replaceSelection replaces any selected text with the generated markup text if set to true
 */
md.InsertUrlAction = function(displayName, iconName, editor, props) {
	this.props_= props;
	md.MarkdownBaseAction.call(this, displayName, iconName, editor);
	
	this.editor_ = editor;
	
	this.dialog_ = workspace.createDialog();
	this.createDialogForm_(this.dialog_.getElement());
	this.dialog_.setTitle(this.props_.dialogTitle);
}
goog.inherits(md.InsertUrlAction, md.MarkdownBaseAction);


/** @override */
md.InsertUrlAction.prototype.actionPerformed = function(callback) {
	this.dialog_.setPreferredSize(600, null);
	this.dialog_.onSelect(goog.bind(function(key, e) {
		e.preventDefault();

		var url = this.addressInput_.value &&  this.addressInput_.value.trim();
		
		if (key === 'ok') {
			if (url.length === 0) {
				this.errorMsg_.textContent = tr(msgs.MD_URL_EMPTY);
				callback();
				return;
			}
			this.insertText();
		}

		this.errorMsg_.textContent = "";
		callback();
		
		this.addressInput_.value = '';
		this.altInput_.value = '';
		this.titleInput_.value = '';
		
		this.dialog_.hide();
	}, this));

	if(this.props_.replaceSelection) {
		var selection = this.mirrorEditor_.getSelection();
		if(selection) {
			this.altInput_.value = selection;
		}
	}

	this.dialog_.show();
};

/**
 * Creates the dialog for uploading or selecting existing files to be 
 * referenced by the link. The URL is relativized
 */
md.InsertUrlAction.prototype.chooseURL_ = function() {
	this.addressInput_.focus();
	var urlChooser = workspace.getUrlChooser();
	if (urlChooser != null) {
		if (this.chooserContext_ == null) {
			this.chooserContext_ = new sync.api.UrlChooser.Context(
					sync.api.UrlChooser.Type.IMAGE);
		}

		urlChooser.chooseUrl(this.chooserContext_, goog.bind(function(url) {
			if (url != null) {
				this.addressInput_.value = workspace.makeRelative(this.editor_.getUrl(), url);
			}
		}, this), sync.api.UrlChooser.Purpose.CHOOSE);
	}
};

md.InsertUrlAction.prototype.insertText = function () {
	var doc = this.mirrorEditor_;
	var url = this.addressInput_.value &&  this.addressInput_.value.trim();
	var altText = this.altInput_.value && this.altInput_.value.trim();
	var title = this.titleInput_.value && this.titleInput_.value.trim();
	var prefix = this.props_.prefix;
	
	doc.focus();
	var cursor = doc.getCursor();
	
	if (altText.length === 0) {
		altText = url;
	}
	
	if(!prefix) {
		prefix = '';
	}
	
	var text = prefix;

	text += "[" + altText + ']';
	
	text += "(" + url;
	if (title.length !== 0) {
		text += ' "' + title + '"';
	}
	text += ")";
	
	if(this.props_.replaceSelection) {
		var selLength = doc.getSelection().length;
		doc.replaceSelection(text);
		doc.setCursor({line:cursor.line, ch: cursor.ch + text.length - selLength});
	} else {
		doc.replaceRange(text, cursor);
		doc.setCursor({line:cursor.line, ch: cursor.ch + text.length});
	}
};

/**
 * Creates the dialog to enter the fields for the link markup text
 * @param {Element} container The container element to add dialog contents to.
 */
md.InsertUrlAction.prototype.createDialogForm_ = function (container) {
	var createDom = goog.dom.createDom;
	
	var makeInput = function(fieldName) {
		var input = createDom('input', {
			name : fieldName, 
			type : 'text',
			class : 'oxy-input'
		});
		input.setAttribute('autocorrect', 'off');
		input.setAttribute('autofocus', 'off');
		return input;
	};
	this.addressInput_ = makeInput('url');
	this.titleInput_ = makeInput('title');
	this.altInput_ = makeInput('alt');

	
	var url = sync.util.image.getImageUrl("/images/Open16.png", 1);
	var urlChooserButton_ = createDom('button', {
		  name : 'url-chooser', 
		  style: 'padding:5px'
	  },  createDom('img', {'src': url}));
	urlChooserButton_.addEventListener('click', goog.bind(this.chooseURL_, this), false);
	
	this.errorMsg_ = createDom('div', 'md-error-msg');
	  
	goog.dom.append(container,
	    createDom('div', 'insert-dialog',
	      createDom('label', 'md-url-row',
	        createDom('span', 'md-url-label', tr(msgs.MD_URL_LABEL)),
	        this.addressInput_,
	        createDom('div','', urlChooserButton_)
	      ),
	      createDom('label', 'md-url-row',
	    		  createDom('span', 'md-url-label', this.props_.textLabel),
	        this.altInput_
	      ),
	      createDom('label', 'md-url-row',
	    		  createDom('span', 'md-url-label', tr(msgs.MD_TITLE_LABEL)),
	        this.titleInput_
	      )
	    ),
	    this.errorMsg_
	  );
	};