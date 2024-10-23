<%@ page import="java.util.List" %>
<%@ page import="ro.sync.db.EmailHost" %>
<%@ page import="ro.sync.db.Kind" %>
<%@ page import="ro.sync.db.nonfloating.DBSupport" %>
<%@ page import="ro.sync.db.nonfloating.User" %>
<%@ page import="ro.sync.licenseservlet.BaseServletConstants" %>
<%@ page import="ro.sync.licenseservlet.LicenseInfo" %>
<%@ page import="ro.sync.licenseservlet.LicenseStore" %>
<% 
    final String UTF_8_ENCODING = "UTF-8";
    ServletContext servletContext = getServletContext();
    DBSupport dbSupport = (DBSupport) servletContext.getAttribute(BaseServletConstants.PARAM_DB_SUPPORT);
%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>&lt;oXygen/> XML License Server</title>
  <link rel="icon" type="image/png" href="../favicon.ico" />
  <link rel="stylesheet" type="text/css" href="../css/index.css" />
  <link rel="stylesheet" type="text/css" href="../css/user_management.css" />
  <script type="text/javascript" src="../js/jquery-3.5.1.min.js"></script>
</head>
<body>
<%
    // The configuration part.
    response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
    response.setHeader("Pragma", "no-cache"); //HTTP 1.0
    response.setDateHeader("Expires", 0); //prevents caching at the proxy server
    response.setHeader("Refresh", "10");
    // The license information.
    LicenseInfo li = null;
    LicenseStore licenseStore = (LicenseStore) servletContext.getAttribute(BaseServletConstants.PARAM_LICENSE_STORE);
    if (licenseStore != null) {
      li = licenseStore.getLicenseInfo();
    }
%>
  <h1 class="mainTitle">&lt;oXygen/> XML License Server User Management</h1>
  <p><a href="../index.jsp" class="link">&lt; Back to main page</a></p>
<%
    if (li != null && dbSupport != null) {
      try {
        List<User> allUsers = dbSupport.getUsers(true);
        int allUsersCount = allUsers.size();
        int activeUsersCount = dbSupport.getUsers(false).size();
        int licenseCount = li.getLicenseCount().orElse(Integer.MAX_VALUE);
%>
    <h2>License server status</h2>
    <table class="info">
      <tbody>
        <tr>
          <td><div class="tt" 
            onmouseover="javascript:this.className='ttHover'"
            onmouseout="javascript:this.className='tt'">Total licenses
                <span>The total number of licenses, as specified in the license key file.</span></div></td>
          <td><%= licenseCount %></td>
        </tr>
        <tr>
          <td><div class="tt"
            onmouseover="javascript:this.className='ttHover'"
            onmouseout="javascript:this.className='tt'">Used licenses
                <span>The number of licenses in use (allocated).</span></div></td>
          <td><%= activeUsersCount %></td>
        </tr>
        <tr>
          <td><div class="tt"
            onmouseover="javascript:this.className='ttHover'"
            onmouseout="javascript:this.className='tt'">Available licenses
                <span>The number of available licenses that can be allocated to new users.</span></div></td>
          <td><%= licenseCount - activeUsersCount %></td>
        </tr>
      </tbody>
    </table>
    
    <%
    if (!allUsers.isEmpty()) {
    %>
    <h2>Users: <%= allUsersCount %></h2>
    <table class="info">
      <tbody>
        <tr>
          <td class="header"><div>User Name</div></td>
          <td class="header"><div>Deactivated</div></td>
        </tr>
      <% for (User user: allUsers) { %>
        <tr>
          <td><div><%= user.getName() %></div></td>
          <% if (user.isBanned()) { %>
            <td class="inactive"><div class="activeInput">
                <input id="<%= user.getName() %>" class="userBanned" type="checkbox" checked/></div></td>
          <% } else { %>
            <td class="active"><div class="activeInput">
                <input id="<%= user.getName() %>" class="userBanned" type="checkbox"/></div></td>
          <% } %>
        </tr>
      <% } %>
      </tbody>
	  </table>
    <div id="tooManyUsersDialogMask"></div>
    <div id="tooManyUsersDialog">
        <p>The maximum number of active users has been reached.</p>
        <a id="okButton" class="button">OK</a>
    </div>
    <script type = "text/javascript">
        
    $( document ).ready(function() {
    	$('#okButton').on('click', function (e) {
    		$('#tooManyUsersDialogMask').css('display', 'none');
        $('#tooManyUsersDialog').css('display', 'none');
    	});
      $('.userBanned').on('change', function (e) {
  	    var userName = e.target.id;
  	    var userBannedVal = e.target.checked;
        
        var performAction = true;
        var activeUsersCountVal = <%=activeUsersCount%>;
        var licenseCountVal = <%=licenseCount%>;
        // Check if the user is about 2 be activated.
        if (!userBannedVal) {
        	if (activeUsersCountVal >= licenseCountVal) {
        		performAction = false;        	}
        }
        
        if (performAction) {
	        var uri = window.location.href;
	        console.log('Send request to', uri);
	        // $(".saveStatus").removeClass('failed success');
	        var req = $.post( 
	            uri, 
	            { 
	          	  <%= BaseServletConstants.PARAM_NAME %>: userName,
	          	  <%= BaseServletConstants.PARAM_BANNED %>: userBannedVal
	            }
	        );
	        req.always(function() {
	        	window.location.reload(true);
	        });
        } else {
          // Set back the previous state to the check box.
          e.target.checked = true;
          
        	// Make the warning dialog visible.
          $('#tooManyUsersDialogMask').css('display', 'block');
          $('#tooManyUsersDialog').css('display', 'block');
        }
      });
    });
        
    </script>
    <%
    }
      } catch (Exception e) {
        e.printStackTrace();
      }
    } else {
      // Error handling the DB !!!
    }
%>
</body>
</html>