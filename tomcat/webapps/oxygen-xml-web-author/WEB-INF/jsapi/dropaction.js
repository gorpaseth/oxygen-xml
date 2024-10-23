namespace('sync.actions');


/**
 * Drop action part of a drag-and-drop.
 * This handles only the drop part.
 *
 * @param {sync.select.SavedSelection} sourceSelection Selection of dragged source.
 * @param {sync.position.RelativeContentPosition} destPosition Drop position.
 * @param {Controller} controller The controller.
 *
 * @constructor
 * @extends {Action}
*/
sync.actions.DropAction = function(sourceSelection, destPosition, controller) {};

/**
 * @override
 */
sync.actions.DropAction.prototype.execute = function() {};

