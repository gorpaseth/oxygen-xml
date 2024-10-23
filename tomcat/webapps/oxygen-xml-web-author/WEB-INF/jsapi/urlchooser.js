
namespace('sync.api');


/**
 * A base class for URL choosers.
 *
 * @constructor
 */
sync.api.UrlChooser = function() {};

/**
 * A callback invoked when the user choice is available.
 *
 * @callback sync.api.UrlChooser~urlChosen
 * @param {string=} url The URL chosen by the user, or null if the user
 * failed to choose anything.
 */

/**
 * Invokes the URL chooser.
 *
 * @param {sync.api.UrlChooser.Context} context The context in which the chooser is invoked - it contains information like
 * the type of the resource that we want the user to choose: image, external xml file, etc.
 * @param {sync.api.UrlChooser~urlChosen} chosen The function to be called
 * with the result of the choice.
 *
 * @param {sync.api.UrlChooser.Purpose} purpose The purpose the chooser is
 * invoked with.
 */
sync.api.UrlChooser.prototype.chooseUrl = function(context, chosen, purpose) {};

/**
 * A callback invoked when the file is saved.
 *
 * @callback sync.api.UrlChooser~fileSaved
 *
 * @param {string=} url The URL where the file was saved, or null if the location is not available.
 * @param {sync.api.UrlChooser.SaveResult} resultInfo information about the save operation result.
 * @param {string=} errorMessage The error message in case the resultInfo is {@link sync.api.UrlChooser.SaveResult.FAILED}.
 */

/**
 * Saves the file given file.
 *
 * IMPORTANT: Please consider overriding {@link sync.api.UrlChooser#chooseUrl} instead of this one. The default
 * implementation for this method uses {@link sync.api.UrlChooser#chooseUrl} to determine the save location. An
 * use-case for this method is to re-use a 'saver' widget which already takes care of the saving itself.
 *
 * @param {string} fileURL the URL of the file to be saved.
 * @param {string} suggestedFileName the proposed name for the new file.
 * @param {sync.api.UrlChooser~fileSaved} callback the callback to be called with the saved file url.
 */
sync.api.UrlChooser.prototype.saveFile = function(fileURL, suggestedFileName, callback) {};

/**
 * Checks whether the URL chooser supports choosing a given type of
 * resource {@link sync.api.UrlChooser.Type}. If not supported, the
 * default UI (which is usually a text-field) will be presented to the user.
 *
 * @param {sync.api.UrlChooser.Type} type The type of the URL to be chosen.
 *
 * @return {boolean} true if the chooser supports the given type.
 */
sync.api.UrlChooser.prototype.supports = function(type) {};


/**
 * Needs to be implemented to reflect whether the chooser suports the given
 * operation: save or choose.
 *
 * @param {sync.api.UrlChooser.Purpose} purpose The operation.
 * @return {boolean} true if the given operation is supported.
 */
sync.api.UrlChooser.prototype.supportsOperation = function(purpose) {};

/**
 * The type of the URL to be chosen.
 *
 * @enum {string}
 */
sync.api.UrlChooser.Type = {
  /** The URL corresponds to an image resource. */
  IMAGE: 'image',
  /** The URL corresponds to an XML file that is referred from the currently edited one. */
  EXTERNAL_REF: 'xref',
  /** The URL corresponds to another type of resource. */
  GENERIC: 'generic'
};

/**
 * Information about the save operation result.
 *
 * @enum {string}
 */
sync.api.UrlChooser.SaveResult = {
  /**
   * The save operation was successful and the file url is available.
   */
  SAVED_AVAILABLE_URL: 'saved-and-available',
  /**
   * The save operation was successful but the file url is not available,
   * or cannot be determined by the urlChoser.
   */
  SAVED_UNAVAILABLE_URL: 'saved-unavailable',
  /**
   * The save operation failed for some reason.
   */
  FAILED: 'save-failed',

  CANCELED: 'save-canceled'
};

/**
 * The type of the URL to be chosen.
 *
 * @enum {string}
 */
sync.api.UrlChooser.Purpose = {
  /**
   * The purpose of the chooser is to help the user save the
   * specified resource.
   */
  SAVE: 'save',
  /**
   * The purpose of the chooser is to choose a location where to
   * save the given file.
   */
  CHOOSE_SAVE_LOCATION: 'choose_save_location',
  /**
   * The purpose of the chooser is to choose the
   * location of a resource.
   */
  CHOOSE: 'choose'
};


/**
 * Create the context of an URL choice.
 *
 * @param {sync.api.UrlChooser.Type} type The type of the URL.
 * @param {string=} opt_filename The proposed name of the file to
 * be saved, when the purpose is {@link sync.api.UrlChooser.Purpose.CHOOSE_SAVE_LOCATION}
 *
 * @constructor
 */
sync.api.UrlChooser.Context = function(type, opt_filename) {};

/**
 * Returns the type of the context.
 *
 * @return {string} The type of the context of the URL chooser.
 */
sync.api.UrlChooser.Context.prototype.getType = function() {};

/**
 * Returns the suggested filename.
 *
 * @return {?string} The proposed name of the file to
 * be saved, when the purpose is {@link sync.api.UrlChooser.Purpose.CHOOSE_SAVE_LOCATION}.
 */
sync.api.UrlChooser.Context.prototype.getSuggestedFileName = function() {};

/**
 * Returns the default extension used for save if the user enters a file name without an extension.
 * @return {string|null} The default save extension.
 *
 * @since 22.1
 */
sync.api.UrlChooser.Context.prototype.getDefaultSaveExtension = function() {};

/**
 * Sets the default extension used for save if the user enters a file name without an extension.
 * @param {string} defaultSaveExtension The default save extension.
 *
 * @since 22.1
 */
sync.api.UrlChooser.Context.prototype.setDefaultSaveExtension = function(defaultSaveExtension) {};

/**
 * @return {string|null} the initially selected URL or the initial directory where the file browser is presented.
 *
 * @since 26.1
 */
sync.api.UrlChooser.Context.prototype.getInitialUrl = function() {};

/**
 * Sets the initially selected URL or the initial directory where the file browser is presented.
 * @param {string} initialUrl The initial URL.
 *
 * @since 26.1
 */
sync.api.UrlChooser.Context.prototype.setInitialUrl = function(initialUrl) {};
