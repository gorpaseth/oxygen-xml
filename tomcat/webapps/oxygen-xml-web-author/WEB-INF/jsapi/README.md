Oxygen XML Web Author API Documentation
=======================================


The main access point to the API is the `workspace` variable available in global scope whose type is
`sync.api.Workspace`.

In order to customize Web Author, one must listen for the events that are triggered when the editor is
about to be opened `sync.api.Workspace.EventType.BEFORE_EDITOR_LOADED` and the editor is opened
 `sync.api.Workspace.EventType.EDITOR_LOADED`. To listen to such events one should use the 
 `workspace.listen` method.

This API is available to both Oxygen Frameworks and Oxygen Plugins.
 - In order to use it from a framework, your JS code must be placed in the `web/` folder of your 
 framework in a file with the `.js` extension
 - In order to use it from a plugin, the code must be placed inside the `web/` folder of the plugin 
 in a file with a `.js` extension.

You can read more details in our [Customization Guide](https://www.oxygenxml.com/doc/ug-waCustom/).

