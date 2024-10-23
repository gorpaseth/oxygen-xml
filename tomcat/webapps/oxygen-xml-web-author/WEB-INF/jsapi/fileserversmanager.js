
namespace('sync.api');


/**
 * This manager can be used to register a file server for which browsing and create files features are provided:
 * <ul>
 * <li> inline file browsing functionality (in Dashboard)</li>
 * <li> create and upload files functionality (in Dashboard)</li>
 * <li> file chooser for server files management actions (in Editor)</li>
 * <li> file server logout actions (in Dashboard and Editor)</li>
 * </ul>
 * To get access to this manager use {@link sync.api.Workspace#getFileServersManager}:
 * <pre>
 *   var fileServersManager = workspace.getFileServersManager()
 * </pre>
 *
 * <br>
 * *********************************
 *  <br>
 * <b>EXPERIMENTAL - Subject to change</b>
 * <br>
 * *********************************
 * </br>
 * <p>Please note that this API is not marked as final and it can change in one of the next versions of the application.
 * If you have suggestions, comments about it, please let us know.</p>
 *
 * @since 20.1.1
 *
 * @constructor
 */
sync.api.FileServersManager = function() {};

/**
 * Provides browsing functionality and server address rendering for a file server.
 *
 * @typedef {Object} sync.api.FileServer
 * @interface
 */

/**
 * File server descriptor that provides rendering information and browsing functionality for a specific file server.
 *
 * @typedef {Object} sync.api.FileServerDescriptor
 *
 * @property {string} id The id of the server. It will be used as a namespace to save the following server-specific
 * information in the local storage:
 * <ul>
 *   <li>server_id.latestRootUrl - The latest root URL used in the file servers Dashboard tab</li>
 *   <li>server_id.latestUrl - The latest URL for which the content files are listed in the file servers Dashboard tab</li>
 * </ul>
 * @property {string} name The name of the file server (it will be displayed in the Dashboard, on the file server tab).
 * @property {string} icon The URL of the file server icon (it will be displayed in the Dashboard, on the file server tab).
 * @property {function(string)} matches Returns true if the URL given as parameter points to a file or folder from this file server.
 * @property {sync.api.FileServer} fileServer It provides login, logout and file browsing functionality for a specific server.
 */

/**
 * Register a {@link sync.api.FileServerDescriptor} to integrate browsing and file creation functionality for specific file server type.
 * For each file server connector registered using this method a Dashboard tab will be created, with inline file browsing functionality and
 * "New" and "Upload" file actions included. Also, when a file from this server is opened to be edited, a "Logout" action
 * will be automatically mounted in the editor's menu and a file browser dialog will be created to be used when
 * invoking open and create file actions.
 *
 * @param {sync.api.FileServerDescriptor} serverDescriptor The file server descriptor, providing information like server name, icon or
 * browsing functionality.
 */
sync.api.FileServersManager.prototype.registerFileServerConnector = function(serverDescriptor) {};

/**
 * Login to the server. This method should implement both the UI used by the user to provide the login credentials and the
 * login functionality.
 *
 * @typedef {function} sync.api.FileServer~login
 *
 * @param {String} message The message received from the server, from
 * the ro.sync.ecss.extensions.api.webapp.plugin.UserActionRequiredException that
 * triggers the login action.
 * @param {function} loginSuccessCallback The function to call after the log in process is finished successful.
 * @param {String} url The url of the resource that requires the login action.
 */

/**
 * Disconnect from server. This method should only implement the file server disconnect functionality, since it is called when
 * a disconnect action is called (and after the user confirmation).
 *
 * @typedef {function} sync.api.FileServer~logout
 *
 * @param {function} logoutCallback The function to call when the file server logout process is completed.
 */

/**
 * Callback that receives the server URLs information.
 *
 * @callback sync.api.FileServer~serverURLsInfoCallback
 *
 * @param {string} rootUrl The server root URL
 * @param {string} browseUrl The URL of the current folder whose content will be presented in the file browser.
 */

/**
 * Callback that receives an error message that must be presented to the user
 *
 * @callback sync.api.FileServer~showErrorMessageCallback
 * @param {string} The error message to be presented to the user.
 */

/**
 * This method can be used to create the element that renders the root URL address (it may contain for example
 * some branches information or it may render some server specific images) on the top part of the server browser component.
 * <br/>
 * It can also be used to render the editing components for the root URL.
 *
 * @typedef {function} sync.api.FileServer~createRootUrlComponent
 *
 * @param {string} rootUrl The server root URL to render details for.
 * @param {sync.api.FileServer~serverURLsInfoCallback} rootURLChangedCallback The function to call when the root URL is changed.
 * @param {boolean} readOnly True if the root URL should not be editable by using this component.
 *
 * @return {HTMLElement} The HTML element that represents UI component.
 */

/**
 * Request the URL info from the file server.
 *
 * @typedef {function} sync.api.FileServer~getUrlInfo
 *
 * @param {string} url The URL about which we ask for information.
 * @param {sync.api.FileServer~serverURLsInfoCallback} urlInfoCallback The function to call when the URL info is available.
 * @param {sync.api.FileServer~showErrorMessageCallback} showErrorMessageCallback The function to call when an error
 *                                                                    message must be presented to the user.
 */

/**
 * A descriptor for a folder entry.
 *
 * @interface sync.api.FileServer.EntryDescriptor
 *
 * @property {string} name The name of the entry.
 * @property {boolean} folder True if the entry is a folder.
 */

/**
 * Callback that receives the folder entries.
 *
 * @callback sync.api.FileServer.listFilesSuccessCallback
 * @param {Array.<sync.api.FileServer.EntryDescriptor>} folderEntries The list of the folder entries descriptors
 * entries.
 */

/**
 * Get the contents of the given folder. By default the server-side <i>ro.sync.net.protocol.FileBrowsingConnection.listFiles()</i> method
 * is called to retrieve files so this method should be used only if a custom implementation is needed.
 *
 * @typedef {function} sync.api.FileServer~listFiles
 *
 * @param {string} folderUrl The URL of the folder to list.
 * @param {sync.api.FileServer.listFilesSuccessCallback} successCallback The function to call when the folder listing is available.
 * @param {function(object)} failureCallback The function to call when there was a failure retrieving folder content,
 * passing in the exception.
 */

/**
 * Impose a default server to be browsed in the file server specific Dashboard tab.
 *
 * @typedef {function} sync.api.FileServer~getDefaultRootUrl
 *
 * @return {string} The default root URL.
 */

/**
 * Set the callback to be called when the user name is changed.
 *
 * @typedef {function} sync.api.FileServer~setUserChangedCallback
 *
 * @param {function(string)} The callback function to be called when the user is changed (the name is send as parameter).
 */

/**
 * Get current user name.
 *
 * @typedef {function} sync.api.FileServer~getUserName
 *
 * @return {string} The current user name.
 */


