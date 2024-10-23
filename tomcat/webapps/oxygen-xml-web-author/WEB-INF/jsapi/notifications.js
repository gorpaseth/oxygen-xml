
namespace('sync.api');


/**
 * Object used to display messages to the user.
 * @constructor
 */
sync.api.NotificationsManager = function() {};

/**
 * Displays an information message to the user.
 * @function
 * @param {string} message The info message.
 */
sync.api.NotificationsManager.prototype.showInfo = function(message) {};

/**
 * Displays a warning message to the user.
 * @function
 * @param {string} message The warning message.
 */
sync.api.NotificationsManager.prototype.showWarning = function(message) {};

/**
 * Displays an error message to the user.
 * @function
 * @param {string} message The error message.
 */
sync.api.NotificationsManager.prototype.showError = function(message) {};

