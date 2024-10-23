
namespace('sync.options');
sync.options.PluginsOptions = {};
sync.options.ServerOptions = {};


/**
 * Class used to access configuration options exposed by plugins. For more details on how a plugin can expose
 * configuration options, see the <a
 * href="https://www.oxygenxml.com/doc/ug-waCustom/topics/webapp_plugin_configuration.html">Customization Guide</a>.
 *
 * @class sync.options.PluginsOptions
 */
sync.options.PluginsOptions.clientOptions = {};
sync.options.ServerOptions.serverOptions = {};

/**
 * Plugins client options getter.
 *
 * @param option the option name.
 *
 * @return {*} the option value.
 * @static
 */
sync.options.PluginsOptions.getClientOption = function(option) {};

/**
 * Exposed server options getter.
 *
 * @param option the option name.
 *
 * @return {*} the option value. Will return undefined if the option have default value.
 */
sync.options.ServerOptions.getServerOption = function(option) {};

export default sync.options.PluginsOptions;