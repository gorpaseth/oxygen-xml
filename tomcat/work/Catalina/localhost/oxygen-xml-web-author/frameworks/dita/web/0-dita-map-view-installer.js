sync.dita.DitaMapViewInstaller = {
  /**
   * Install the DITA Map view if it is not already installed.
   *
   * @param initiallyClosed True if the view should be closed initially.
   * @param opt_side The side on which to display the DITA Map. Default: left.
   */
  installView: function(initiallyClosed, opt_side) {
    var viewManager = workspace.getViewManager();
    var installedViews = viewManager.getViewIds();

    // if the view was not installed we install it.
    if (! goog.array.contains(installedViews, 'dita-map-view')) {
      let renderer = new sync.api.dita.DitaMapView();
      viewManager.addView('dita-map-view');
      viewManager.installView('dita-map-view', renderer, {
        side: opt_side || 'left', 
        initiallyClosed: initiallyClosed
        });
    }
    if (!initiallyClosed) {
      viewManager.focusView('dita-map-view');
    }
  }
};