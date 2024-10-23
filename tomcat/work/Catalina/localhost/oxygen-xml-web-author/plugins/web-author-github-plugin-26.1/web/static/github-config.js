var tabMenu = document.getElementById('tab-menu');
tabMenu.addEventListener('click', function (e) {
  var i, clicked = e.target.id;

  for (i = 0; i < tabMenu.childNodes.length; ++i) {
    tabMenu.childNodes[i].className = '';
  }

  document.getElementById(clicked).className = 'active';

  var prefix = clicked.substring(0, clicked.indexOf('-menu'));

  var sections = document.querySelector('.git-configz').children;
  for (i = 0; i < sections.length; ++i) {
    sections[i].className = '';
  }

  document.getElementById(prefix + '-section').className = 'active';
});


// Adding an event listener to show/hide the apiUrl input when the github enterprise checkbox is changed
var ghEnterpriseCheckbox = document.getElementById('use-github-enterprise');
ghEnterpriseCheckbox.addEventListener('change', function (e) {
  if (e.currentTarget.checked) {
    document.getElementById('gh-api-url').style.display = 'block';

    // show the Github Enterprise instructions
    document.getElementById('using-enterprise-msg').style.display = 'block';
    document.getElementById('no-enterprise-msg').style.display = 'none';
  } else {
    document.getElementById('gh-api-url').style.display = 'none';
    document.querySelector('#gh-api-url input').value = '';

    // show the github.com instructions
    document.getElementById('using-enterprise-msg').style.display = 'none';
    document.getElementById('no-enterprise-msg').style.display = 'block';
  }
});

function appendWebAuthorContextSpans(element) {
  let parts = getWebAuthorContextParts();

  let hostnameSpan = document.createElement("span");
  hostnameSpan.textContent = parts.hostname;
  hostnameSpan.setAttribute("style", "color:#D61564");

  element.appendChild(document.createTextNode(parts.protocol));
  element.appendChild(hostnameSpan);
  element.appendChild(document.createTextNode(parts.port));
  element.appendChild(document.createTextNode(parts.path));
}

function getWebAuthorContextParts() {
  let protocol = window.location.protocol + "//";
  let hostname = (window.location.hostname === 'localhost' ? "YOUR-DOMAIN-NAME-HERE" : window.location.hostname);
  let port = (window.location.port ? ':' + window.location.port : '');
  let path = window.location.pathname.substring(0, window.location.pathname.indexOf('/app/admin.html'));
  return {
    protocol: protocol,
    hostname: hostname,
    port: port,
    path: path,
    all: protocol + hostname + port + path
  }
}

let webAuthorContextSpans = document.getElementsByClassName('web-author-context');
for (let webAuthorContextSpan of webAuthorContextSpans) {
  webAuthorContextSpan.childNodes && webAuthorContextSpan.childNodes.forEach(el => webAuthorContextSpan.removeChild(el));
  appendWebAuthorContextSpans(webAuthorContextSpan);
}

var bbsvCopyPublicKeyButton = document.getElementById('bbsv-public-key-copy');
bbsvCopyPublicKeyButton.addEventListener('click', function (e) {
  var publicKey = document.getElementById('bbsv-public-key-input');

  publicKey.select();
  publicKey.setSelectionRange(0, 99999);

  document.execCommand("copy");
});

var bbsvRegeneratePublicKeyButton = document.getElementById('bbsv-public-key-regenerate');
bbsvRegeneratePublicKeyButton.addEventListener('click', function (e) {
  bbsvRegeneratePublicKeyButton.innerHTML = 'Loading...';
  
  var requestUrl = '../plugins-dispatcher/gitapi/generate-bbsv-keys';

  window.parent.goog.net.XhrIo.send(requestUrl, function (e) {
    var response = e.target;

    var status = response.getStatus();

    if (status === 200) {
      var rsaKeys = response.getResponseJson();

      var publicKey = document.getElementById('bbsv-public-key-input');
      publicKey.setAttribute('value', rsaKeys.publicKey);

      var privateKey = document.getElementById('bbsv-private-key-input');
      privateKey.value = rsaKeys.privateKey;

      bbsvRegeneratePublicKeyButton.innerHTML = 'Regenerate key';
    } else {
      console.error('Could not regenerate key.');
      bbsvRegeneratePublicKeyButton.innerHTML = 'Error';
    }
  });
});

webAuthorContext = getWebAuthorContextParts().all;
var bbsvConsumerCallbackUrlInput = document.getElementById('bbsv-consumer-callback-url-input');
bbsvConsumerCallbackUrlInput.value = webAuthorContext + bbsvConsumerCallbackUrlInput.value;

var bbsvCopyConsumerCallbackUrlButton = document.getElementById('bbsv-consumer-callback-url-copy');
bbsvCopyConsumerCallbackUrlButton.addEventListener('click', function (e) {
  bbsvConsumerCallbackUrlInput.select();
  bbsvConsumerCallbackUrlInput.setSelectionRange(0, 99999);

  document.execCommand("copy");
});
