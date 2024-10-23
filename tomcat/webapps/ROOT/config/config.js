function ValidateEmail(mail){
    if ($('#email').val().indexOf('@') !== -1){
        return (true);
    }
    // An invalid email address!
    return (false);
}

// Validate a required field.
function validateField() {
  $(this).removeClass("bg-red");
  if($.trim($(this).val()) == ""){
    $(this).addClass("bg-red");
  }
  if (  $(this).attr("id") == "email"){
    if(!ValidateEmail()){
      $(this).addClass("bg-red");
    }
  }
}
$(".required").focusout(validateField);

// Determine the details of the license servlet.
var systemId = null;
var version = null;
$.ajax({
  url: '/license-servlet/initial-setup',
  dataType: 'json',
  success: function(data) {
    systemId = data.systemId;
    version = data.version; 
  }
});

$('#get-trial').on('click', function(e) {
  var licenseSetPromise = null;
  if (ihave) {
    var $pastedLicense = $('#pasted-license');
    var pastedLicense = $.trim($pastedLicense.val());
    if(pastedLicense == "") {
      $pastedLicense.addClass("bg-red");
      return;
    } 

    licenseSetPromise = $.ajax({
      url: 'https://www.oxygenxml.com/activation/index.php',
      dataType: 'jsonp',
      jsonp: 'callback',
      data: {
        activationCode: systemId,
        version: version,
        licenseText: pastedLicense.replace(/\n/g, '@rowSep@').replace(/\r/g, '') 
      }
    });
  } else {
    // Validate form before submit.
    var submitForm = true;
    $.each($(".required"), function(){
      $(this).removeClass("bg-red");
      if($.trim($(this).val()) == ""){
          $(this).addClass("bg-red");
          submitForm = false;
      }
    });

    if(!ValidateEmail()){
      $("#email").addClass("bg-red");
      submitForm = false;
    }
  
    if (!submitForm) {
      return;
    }
  
    licenseSetPromise = $.ajax({
      url: 'https://www.oxygenxml.com/webauthor/php/get_trial.php',
      dataType: 'jsonp',
      jsonp: 'callback',
      data: {
        get_trial: true,
        sysID: systemId,
        version: version,
        email: $('#email').val(),
        name: $('#name').val(),
        company: $('#company').val(),
        country: $('#country').val(),
        subscribe_newrelease: document.querySelector('#subscribe_newrelease').checked,
        subscribe_newsletter: document.querySelector('#subscribe_newsletter').checked
      }});
    }

  if (licenseSetPromise) {
    $('.form').hide();
    $('.result').addClass('loading');
    licenseSetPromise.then(function(data) {
      return $.post('/license-servlet/initial-setup', {
        licenseText: data.license.replace(/@rowSep@/g, '\n')
      });
    }).then(function() {
      $('.result').removeClass('loading').addClass('success');
    }).fail(function() {
      $('.result').removeClass('loading').addClass('failure');
    });
  }
});


$('.option > .preview').on('click', function() {
  var $option = $(this).closest('.option');
  if (!$option.hasClass('selected')) {
    $('.selected').removeClass('selected');
  }
  $option.toggleClass('selected');
});


var ihave = false;
$('.trial-option').on('click', function() {
  if ($(this).hasClass('option-not-selected')) {
    $('.form').toggleClass('idonthave').toggleClass('ihave');
    $('.trial-option').toggleClass('option-selected').toggleClass('option-not-selected');
    ihave = !ihave;
  }
});

