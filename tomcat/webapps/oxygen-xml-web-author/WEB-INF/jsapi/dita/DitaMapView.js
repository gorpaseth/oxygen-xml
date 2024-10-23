namespace('sync.api.dita');

/**
 * Renders the DITA Map view.
 *
 * @since 26.1
 */
export default class DitaMapView extends sync.view.ViewRenderer {

  /**
   * Constructor.
   */
  constructor() {}

  /** @override */
  getTitle() {}

  /** @override */
  getIcon(devicePixelRation) {}

  /** @override */
  supportsEditor() {}

  /** @override */
  install(container) {}

  /** @override */
  opened() {}

  /** @override */
  getToolbarDescriptor() {}

  /** @override */
  getToolbarActionsMap() {}

  /** @override */
  editorChanged(editor) {}

  /**
   * Check if the Configure Context Dialog action should be disabled.
   * @param editor The new editor.
   * @private
   */
  checkDisableConfigureContextAction_(editor) {}

  /**
   * Disable the context update actions
   *
   * @param {boolean} enabled true To enable the update context actions, false to disable the actions
   * @private
   */
  setContextUpdateEnabled_(enabled) {}

  /**
   * Get the actions manager for the DITA Map view
   *
   * @private
   */
  getDitaMapViewActionsManager_() {}

  /**
   * Updates the editor with the changes from the context config dialog
   *
   * @param {sync.api.DitaContext} newDitaContext The new context.
   * @param {boolean} showExcludedContent True if filtered content should be shown.
   *
   * @private
   */
  applyDialogChanges_(newDitaContext, showExcludedContent) {}

}

sync.api.dita.DitaMapView = DitaMapView;