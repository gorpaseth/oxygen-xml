
namespace('sync.ext');


/**
 * Registry for the framework extension objects.
 *
 * @constructor
 */
sync.ext.Registry = function() {};


/**
 * The field that holds the currently loaded extension.
 *
 * @type {Extension}
 */
sync.ext.Registry.extension = null;


/**
 * Registers the given extension.
 *
 * @param {sync.ext.Extension} extension The extension.
 */
sync.ext.Registry.registerExtension = function(extension) {};


/**
 * An URL where the `web` sub-folder of the framework is mapped.
 *
 * @type {string}
 */
sync.ext.Registry.extensionURL = null;

/**
 * Returns the URL of the extension resources folder.
 *
 * This can be used in a framework extension to load other resources that are
 * relative to framework.js.
 *
 * @return {String} The URL of the extension resources folder.
 */
sync.ext.Registry.getExtensionURL = function() {};
