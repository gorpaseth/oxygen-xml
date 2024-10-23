
namespace('sync.actions');


/**
 * Provider for actions used to edit attributes value.
 *
 * To register such a provider, use {@link sync.api.Editor.registerAttributeActionsProvider}.
 *
 * @constructor
 */
sync.actions.AttributeEditingActionsProvider = function() {};


/**
 * Returns the action to be used to edit the given attribute.
 *
 * @param {Element} element The element to which the attribute belongs.
 * @param {string} attributeName The name of the attribute to be edited.
 *
 * @return {sync.actions.AttributeEditingAction} The attribute editing action, or null if there
 * is not specific action.
 */
sync.actions.AttributeEditingActionsProvider.prototype.getAction = function(element, attributeName) {};


