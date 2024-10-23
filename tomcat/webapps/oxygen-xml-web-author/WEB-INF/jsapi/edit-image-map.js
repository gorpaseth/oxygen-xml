namespace('sync.api');

/**
 * Action used to edit an image map rendered by the `ro.sync.ecss.webapp.formcontrols.WebappImageMapRenderer` form control.
 */
sync.api.EditImageMapAction = class extends InsertImageMap {

  /**
   * Constructor.
   *
   * @param {sync.api.AuthorEditingSupport} editingSupport The editing Support.
   * @param {string} javaOperationClass The name of the java AuthorOperation implementation that extends
   *  `ro.sync.ecss.extensions.commons.imagemap.operations.UpdateImageMapOperationBase`.
   *
   */
  constructor(editingSupport, javaOperationClass) {}
};