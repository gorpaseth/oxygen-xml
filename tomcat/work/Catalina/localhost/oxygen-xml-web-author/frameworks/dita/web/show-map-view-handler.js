sync.ext.Registry.extension.registerActionsHandler(function(editor, actionsConfig) {
  var ditaMapSide = editor.options.ditaMapSide;
  if('true' === editor.options.showDitaMapView) {
    sync.dita.DitaMapViewInstaller.installView(false, ditaMapSide);

  } else if(sync.ext.Registry.extension.type === 'dita' ||
    sync.ext.Registry.extension.type === 'ditamap_resolved_topics') {
    sync.dita.DitaMapViewInstaller.installView(true, ditaMapSide);
  }
});