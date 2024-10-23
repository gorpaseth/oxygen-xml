<%@ page import="ro.sync.db.BaseDBSupport" %>
<%@ page import="ro.sync.db.EmailHost" %>
<%@ page import="ro.sync.db.Kind" %>
<%@ page import="ro.sync.licenseservlet.BaseServletConstants" %>
<%@ page import="ro.sync.licenseservlet.LicenseInfo" %>
<%@ page import="ro.sync.licenseservlet.LicenseStore" %>
<% 
    final String UTF_8_ENCODING = "UTF-8";
    ServletContext servletContext = getServletContext();
    BaseDBSupport dbSupport = (BaseDBSupport) servletContext.getAttribute(BaseServletConstants.PARAM_DB_SUPPORT);
    LicenseStore licenseStore = (LicenseStore) servletContext.getAttribute(BaseServletConstants.PARAM_LICENSE_STORE);
    LicenseInfo licenseInfo = licenseStore.getLicenseInfo();
    boolean isFloating = licenseInfo.isFloating();
    boolean isAuthorComponent = BaseServletConstants.WEBAPP_COMPONENTS.contains(licenseInfo.getRawLicenseComponent());
%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>&lt;oXygen/> XML License Server</title>
  <link rel="icon" type="image/png" href="../favicon.ico" />
  <link rel="stylesheet" type="text/css" href="../css/index.css" />
  <link rel="stylesheet" type="text/css" href="../css/config_page.css" />
  <script type="text/javascript" src="../js/jquery-3.5.1.min.js"></script>
</head>
<body>
<%
    // The configuration part.
    response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
    response.setHeader("Pragma", "no-cache"); //HTTP 1.0
    response.setDateHeader("Expires", 0); //prevents caching at the proxy server
%>
  <h1 class="mainTitle">&lt;oXygen/> XML License Server Configuration</h1>
  <p><a href="../index.jsp" class="link">&lt; Back to main page</a></p>
<%
    if (dbSupport != null) {
      try {
        EmailHost emailHost = dbSupport.getEmailHost();
        String fromEmail = dbSupport.getFromEmailAddress();
        String fromEmailName = dbSupport.getFromEmailName();
        String toEmails = dbSupport.getToEmailAddressesString();
        String emailCheckedAttribute = emailHost.isEnabled() ? "checked" : "";
        String isLicenseLockingCheckedAttribute = dbSupport.isLicenseLockingAllowed() ? "checked" : "";
%>
    <h2>Notification Settings:</h2>
    <div class="configContainer">
      <div class="configLine">
        <div class="configLabel">Enable Mail Server:</div>
        <div class="configInput">
          <input id="<%= BaseServletConstants.PARAM_EMAIL_ENABLED %>" type="checkbox" <%= emailCheckedAttribute %>/>
        </div>
      </div>
      <div class="configLine">
        <div class="configLabel">Mail Server Host:</div>
        <div class="configInput">
          <input id="<%= BaseServletConstants.PARAM_EMAIL_HOST %>" type="text" value="<%= emailHost.getHost() %>"/>
        </div>
      </div>
      <div class="configLine">
        <div class="configLabel">Mail Server Port:</div>
        <div class="configInput">
          <input id="<%= BaseServletConstants.PARAM_EMAIL_PORT %>" type="text" value="<%= emailHost.getPort() %>"/>
        </div>
      </div>
      <%-- Un NUME pentru "from" --%>
      <div class="configLine">
        <div class="configLabel">From:</div>
        <div class="configInput">
          <input id="<%= Kind.FROM %>" type="text" value="<%= fromEmail %>"/>
        </div>
      </div>
      <div class="configLine">
        <div class="configLabel">From Name:</div>
        <div class="configInput">
          <input id="<%= Kind.FROM_NAME %>" type="text" value="<%= fromEmailName %>"/>
        </div>
      </div>
	    <div class="configLine">
	      <div class="configLabel">To:</div>
	      <div class="configInput">
	        <input id="<%= Kind.TO %>" type="text" value="<%= toEmails %>"/>
	      </div>
	    </div>
	  </div>
<%  if (!isAuthorComponent && isFloating) { %>	  
	  <h2>Miscelaneous:</h2>
    <div class="configContainer">
  	  <div class="configLine">
        <div class="lockLabel">Allow users to lock licenses:</div>
        <div class="lockInput">
          <input id="<%= BaseServletConstants.PARAM_LOCK_ENABLED %>" type="checkbox"
            <%= isLicenseLockingCheckedAttribute %>/>
        </div>
      </div>
	  </div>
<%  } %>
    <div class="buttonCheck">
      <div id="buttonImage" class="button">Save</div>
    </div>
    <div class="saveStatus"></div>
    <script type="text/javascript">
        
    $( document ).ready(function() {
      $('.buttonCheck').click(function (e) {
          var inputEmailEnabledVal = false;
          if ($('#<%= BaseServletConstants.PARAM_EMAIL_ENABLED %>').is(':checked')) {
            inputEmailEnabledVal = true;
          }
          var inputLockEnabledVal = false;
          var inputLockEnabledButton = $('#<%= BaseServletConstants.PARAM_LOCK_ENABLED %>');
          if (inputLockEnabledButton) {
	          if (inputLockEnabledButton.is(':checked')) {
	            inputLockEnabledVal = true;
	          }
          }
          var inputHost = $('#<%= BaseServletConstants.PARAM_EMAIL_HOST %>');
          var inputHostVal = inputHost.val();
          var inputPort = $('#<%= BaseServletConstants.PARAM_EMAIL_PORT %>');
          var inputPortVal = inputPort.val();
          var inputFrom = $('#<%= Kind.FROM.toString() %>');
          var inputFromVal = inputFrom.val();
          var inputFromName = $('#<%= Kind.FROM_NAME.toString() %>');
          var inputFromNameVal = inputFromName.val();
          var inputTo= $('#<%= Kind.TO.toString() %>');
          var inputToVal = inputTo.val();
          console.log('Email enabled: ', inputEmailEnabledVal);
          console.log('Host: ', inputHostVal);
          console.log('Port: ', inputPortVal);
          console.log('From: ', inputFromVal);
          console.log('From Name: ', inputFromNameVal);
          console.log('To: ',   inputToVal);
          console.log('Lock enabled: ', inputLockEnabledVal);
          if (!inputHostVal) {
            inputHostVal = "";
          }
          if (!inputPortVal) {
            inputPortVal = -1;
          }
          if (!inputFromVal) {
            inputFromVal = "";
          }
          if (!inputFromNameVal) {
            inputFromVal = "";
          }
          if (!inputToVal) {
            inputToVal = "";
          }
          var uri = window.location.href;
          console.log('Rest request to', uri);
          $(".saveStatus").removeClass('failed success');
          var req = $.post( 
              uri, 
              { 
                <%= BaseServletConstants.PARAM_EMAIL_ENABLED %>: inputEmailEnabledVal, 
                <%= BaseServletConstants.PARAM_EMAIL_FROM %>: inputFromVal, 
                <%= BaseServletConstants.PARAM_EMAIL_FROM_NAME %>: inputFromNameVal, 
                <%= BaseServletConstants.PARAM_EMAIL_TO %>: inputToVal, 
                <%= BaseServletConstants.PARAM_EMAIL_HOST %>: inputHostVal, 
                <%= BaseServletConstants.PARAM_EMAIL_PORT %>: inputPortVal,
                <%= BaseServletConstants.PARAM_LOCK_ENABLED %>: inputLockEnabledVal
              }
          );
          req.done(function(e) { 
        		var statusElement = $(".saveStatus");
       		  statusElement.addClass("success");
       		  statusElement.text("Settings were updated successfully.");
        	});
          req.fail(function(e) { 
            var statusElement = $(".saveStatus");
            statusElement.addClass("failed");
            statusElement.text("Error updating settings, please try again.");
          });
        });
    });
        
    </script>    
<%
      } catch (Exception e) {
        e.printStackTrace();
      }
    } else {
      // Error handling the DB !!!
    }
%>
</body>
</html>