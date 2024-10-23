$(document).ready(function(){
  var dialogCloseButton = $('#confirmLicenseDialog').find('.close-button');
  dialogCloseButton.on('click', function(e) {
    $('#confirmLicenseDialogMask').css('display', 'none');
    $('#confirmLicenseDialog').css('display', 'none');
    e.stopImmediatePropagation();
  });

  $('.close-button').on('click', function(e) {
    $(e.target).parent().remove();
    e.preventDefault();
  });
  
  function refreshStatus(html) {
    $('#subscription-status').replaceWith(html);
    registerStatusListeners();
  }
  
  function registerStatusListeners() {
    $('.script-only').removeClass('script-only');
    
    $('#autocheck').on('change', function() {
      $.post('license-polling?action=toggle-auto-check&ajax=true')
        .done(refreshStatus)
        .fail(function() { 
          // The toggling failed, reload the page to display the correct status.
          window.location.reload();
        });
    });
    
    $('#check-again').on('click', function(e) {
      e.preventDefault();
      $.post('license-polling?action=force-check&ajax=true')
        .done(refreshStatus);
    });
  }
  
  function isActivated(licenseText) {
    return licenseText.match("Registration_Name.*<<.*>>") !== null;
  }

  function addConfirmationDialog() {
    $('#noLicenseFormSubmitButton').on('click', function(e) {
      var licenseText = $('#noLicenseFormTextArea').val();
      // enforce the license component
      var enforcedComponent = window.enforcedComponent;
      if(enforcedComponent && ! getLicenseComponent(licenseText).includes(enforcedComponent)) {
        // the component list does not include the enforced compoent.
        renderInvalidLicenseComponent(enforcedComponent);
        e.preventDefault();
      return;
      } else if (!isActivated(licenseText)) {
        e.preventDefault();
        $('#confirmLicenseDialogMask').css('display', 'block');
        $('#confirmLicenseDialog').css('display', 'block');
      }
    });
  }
  
  /**
   * Determines the license's component.
   * 
   * @param licenseText the license key.
   */
  function getLicenseComponent(licenseText) {
    var component = null;
    var lines = licenseText.split('\n');
    var i;
    for(i = 0; i < lines.length; i++)  {
        var line = lines[i].trim();
        if(line.indexOf('Component') == 0) {
            component = line.split('=')[1].trim();
            break;
        }
    }
    return component;
  }
  
  /**
   * Handles the rendering of invalid license component.
   */
  function renderInvalidLicenseComponent(enforcedComponent) {
    var errorMessage = $('.valid-component');
    errorMessage.removeClass('valid-component');

    var textArea = $('textarea[name="licenseText"]');
    textArea.val("");
    textArea.one('focus', function() {
      errorMessage.addClass('valid-component');
    });
  }
  registerStatusListeners();
  addConfirmationDialog();
  

  // When activating a license, send the URL of of POST request in a form-param.
  // This URL is used to redirect the user back to the same server.
  var originalUrlInput = document.getElementById('originalUrl');
  if (originalUrlInput) {
    originalUrlInput.value = originalUrlInput.parentElement.action;
  }
});
