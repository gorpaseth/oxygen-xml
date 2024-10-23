
namespace('sync.api');


/**
 * Manager for concurrent editing-related functionality.
 *
 * @constructor
 * @extends {goog.events.EventTarget}
*/
sync.api.ConcurrentEditingManager =function() {};

/**
 * @enum {String}
 */
sync.api.ConcurrentEditingManager.EventType = {
  /**
   * Event dispatched when a concurrent editing room is created.
   * @deprecated since version 24.1. Please consider using 'CONCURRENT_EDITING_STARTED' event.
   */
  ROOM_CREATED: 'room_created',
  /**
   * Event dispatched when a concurrent editing room is joined.
   */
  CONCURRENT_EDITING_STARTED : 'room_joined'
};

/**
 * Create a concurrent editing room for this document.
 * @return {Thenable<String>} The room ID. This room ID can be passed in the {@link sync.api.Workspace.LoadingOptions}.
 */
sync.api.ConcurrentEditingManager.prototype.createRoom = function() {};

/**
 * @return {boolean} true if the current user is the creator of the room.
 */
sync.api.ConcurrentEditingManager.prototype.isCreator = function() {};

/**
 * @return {boolean} true if it is part of a concurrent session.
 */
sync.api.ConcurrentEditingManager.prototype.isInRoom = function() {};
