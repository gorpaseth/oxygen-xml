
namespace('sync.api');


/**
 * Interface for change tracking manager.
 *
 * You can obtain one by calling {@link sync.api.Editor#getChangeTrackingManager()} for author-mode editors.
 *
 * @interface
 * @constructor
 * @extends {goog.events.EventTarget}
*/
sync.api.ChangeTrackingManager = function() {};

/**
 * Get the enable state of the change tracking mechanism.
 *
 * @return {boolean} <code>true</code> if change tracking is enable.
 */
sync.api.ChangeTrackingManager.prototype.isTrackingChanges = function() {};

/**
 * Event triggered when the change tracking mechanism is enabled or disabled.
 *
 * @type {{CHANGE_TRACKING_TOGGLED: string}}
 */
sync.api.ChangeTrackingManager.EventType = {
    /**
     * Fired when the change tracking state is toggled.
     */
    CHANGE_TRACKING_TOGGLED: 'change-tracking-toggled'
};

