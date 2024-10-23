<%@ page import="ro.sync.db.nonfloating.DBSupport" %>
<%@ page import="ro.sync.db.BaseDBSupport" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
<%@ page import="ro.sync.licenseservlet.*" %>
<%@ page import="java.util.List" %>
<%@ page import="java.io.File" %>
<%@ page import="java.io.FileInputStream" %>
<%@ page import="java.util.Properties" %>
<%@ page import="java.util.Properties" %>
<%@ page import="java.text.MessageFormat" %>
<%@ page import="ro.sync.db.nonfloating.User" %>
<%@ page import="ro.sync.util.JspUtil" %>
  
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>
    <head>
    <link rel="icon" type="image/png" href="favicon.ico">
    <link rel="stylesheet" href="css/index.css" type="text/css">
    <title>&lt;oXygen/&gt; XML License Server</title>
    </head>
    <body>
    <h1 class="mainTitle">&lt;oXygen/&gt; XML License Server</h1>

  <%
    // Set the success message in the servlet context.
    String successMessage = (String) request.getSession().getAttribute(BaseServletConstants.JSP_SUCCESS_MESSAGE);
    request.getSession().removeAttribute(BaseServletConstants.JSP_SUCCESS_MESSAGE);
    if (successMessage != null) {
  %>
      <div class="success-msg"><a href="index.jsp" title="Close" class="close-button">x</a><%= successMessage %></div>
  <% } %>

  <%
    response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
    response.setHeader("Pragma", "no-cache"); //HTTP 1.0
    response.setDateHeader("Expires", 0); //prevents caching at the proxy server
    boolean isBundledWithWebAuthor = "true".equals(System.getProperty("com.oxygenxml.webapp.product"));
    ServletContext servletContext = getServletContext();
    ActivationStates machineState =
        (ActivationStates) servletContext.getAttribute(BaseServletConstants.JSP_ACTIVATION_STATE);
    String activationCode = servletContext.getAttribute(BaseServletConstants.JSP_ACTIVATION_CODE).toString();

    LicenseStore licenseStore = (LicenseStore) servletContext.getAttribute(BaseServletConstants.PARAM_LICENSE_STORE);
    boolean isBundledWithContentFusion = "true".equals(System.getProperty("com.oxygenxml.content.fusion.product"));
    
    if (machineState == ActivationStates.ACTIVATED) {
      LicenseInfo li = licenseStore.getLicenseInfo();
      boolean isFloating = li.isFloating();
      boolean isUserBased = ! isFloating;
      
      String licenseKeyInfoHTML = HTMLReportUtil.getLiceseKeyInformation(li, false);
      
      BaseDBSupport dbSupport = (BaseDBSupport) servletContext.getAttribute(BaseServletConstants.PARAM_DB_SUPPORT);
      
      List<User> users = null;
      
      if (isUserBased) {
        users = ((DBSupport) dbSupport).getUsers(false);
      }
      
      if (isUserBased && !li.hasUnlimitedSeats() && (li.getLicenseCount().get() < users.size())) {
  %>
        <div class="error-msg"><p>The current number of active users exceeds the number of available licenses.</p>
        <p>Go to the <a href="<%=BaseServletConstants.USERS_MANAGEMENT_URI%>" class="link">Users management</a> page
        and deactivate the users who are no longer entitled to use the license.</div>
   <% } %>
    <h2>Machine Signature</h2>
    <div class="emf"><%= activationCode %></div>
    <h2>Activation status</h2>
    <div>The license key is ACTIVATED.</div>
    <%= licenseKeyInfoHTML %>

    <%-- Subscription status. --%>
    <jsp:include page="/license-polling?action=status"/>
    <%@ include file="/WEB-INF/polling-status.jsp" %>

  <%
     // When used in the oXygen XML WebApp product, add a "go to webapp config page button
    if (isBundledWithWebAuthor) {
  %>
    <p><a href="/" class="button" style="margin:0; text-decoration:none">Go to &lt;oXygen/&gt; XML Web Author</a></p>
  <% } %>
    <h2>License statistics</h2>
    <ul>
    <li><a href="<%=BaseServletConstants.REPORT_URI%>" class="link">Current Allocated Licenses</a></li>
  <%
    if (isFloating && !li.hasUnlimitedSeats()) {
  %>
    <li><a href="<%=BaseServletConstants.REPORT_USAGE_URI%>" class="link">Usage Statistics</a></li>
  <% } %>
    </ul>

    <h2>Management tasks</h2>
    <ul>
      <% if (JspUtil.supportsSubscriptionRenewal(licenseInfo)) { %>
    <li><a href="<%= JspUtil.generateBuySubcriptionRenewalURL(licenseInfo) %>"
    class="link">Buy subscription renewal</a></li>
      <% } %>
    <li><a href="<%= BaseServletConstants.VIEW_ACTIVATED_LICENSE_URI %>" class="link">View license key</a></li>
    <li><a href="<%= BaseServletConstants.REPLACE_URI %>" class="link">Replace/Remove license key</a></li>
    <li><a href="<%= BaseServletConstants.CONFIGURATION_URI %>" class="link">Configuration</a></li>
    <% if (isUserBased && !li.hasUnlimitedSeats()) { %>
    <li><a href="<%= BaseServletConstants.USERS_MANAGEMENT_URI %>" class="link">Users management</a></li>
    <% }
      if (licenseInfo.isSubscription()) {
    %>
    <li><a href="proxy-settings" class="link">Proxy settings</a></li>
    <% }
      // show the allowed users list link only for non floating licenses.
      if( isUserBased) { %>
    <li><a href="allowed-users.html" class="link">Allowed users list</a></li>
    <% } %>
    </ul>
      <%
      // When embedded in Oxygen XML Web Author or Oxygen Content Fusion, the license servlet is already connected
      boolean hideHowToSection = isBundledWithWebAuthor || isBundledWithContentFusion;
      if (!hideHowToSection) {
        List<String> possibleUrls = BaseLicenseServlet.getClientAccessUrls(request, BaseServletConstants.HOME_URI);
        String URI = possibleUrls.get(0);
    %>
    <h2>How to use it from &lt;oXygen/&gt; XML application</h2>
      <% if (!BaseServletConstants.WEBAPP_COMPONENTS.contains(licenseInfo.getRawLicenseComponent())) { %>
    <div>
    <img src="img/Oxygen16.png" class="inline-img">To use <span class="emf">&lt;oXygen/&gt; XML standalone</span>
        with this license server:
    <ol>
    <li>Start &lt;oXygen/&gt; XML.</li>
    <li>Go to <span class="emf">Help > Register</span> menu.
    <li>Click <span class="emf">Use a license server</span>.
    <li>Click <span class="emf">HTTP/HTTPS server</span>.
    <li>Use the following URL: <span class="emf"><code><%= URI %></code></span>.
    <img src="img/Warning16.png"  class="inline-img"> See the note below.
    <li>Fill the user and password fields with the information you
    have configured for the <span class="emf">user</span> role.</li>
    </ol>
    </div>
    <div>
    <img src="img/eclipse16.ico" class="inline-img">To use <span class="emf">&lt;oXygen/&gt; XML Eclipse plugin</span>
        with this license server:
    <ol>
    <li>Start Eclipse</li>
    <li>Go to <span class="emf">Window > Preferences > oXygen XML Editor > Register...</span></li>
    <li>Click <span class="emf">Use a license server</span>.</li>
    <li>Click <span class="emf">HTTP/HTTPS server</span>.</li>
    <li>Use the following URL: <span class="emf"><code><%= URI %></code></span>.
    <img src="img/Warning16.png" class="inline-img"> See the note below.</li>
    <li>Fill the user and password fields with the information you
    have configured for the <span class="emf">user</span> role.</li>
    </ol>
    </div>
      <% } else { %>
    <div>To enable an &lt;oXygen/&gt; XML Web Author installation:
    <ol>
    <li>Go to the <span class="emf">Administration Page</span>, the <span class="emf">Licensing</span> section.
    <li>Set the <span class="emf">Server URL</span> to <code><%= URI %></code>.
    <img src="img/Warning16.png"  class="inline-img"> See the note below.
    <li>Fill the user and password fields with the information you have configured for the <b>user</b> role.
    <li>Click <span class="emf">Submit</span>.
    </ol>
    </div>
      <% } %>
    <div class="note"><b> Note:</b> In case the above URL does not work
        you might try to replace the above IP address (or hostname)
        with the appropriate IP address that can be used by &lt;oXygen/&gt; applications to reach the license server.
      <% if (possibleUrls.size() > 1) { %>
    <div>Possible alternatives:
    <ul>
      <% for (int i = 1; i < possibleUrls.size(); i++) { %>
    <li><code><%= possibleUrls.get(i) %></code></li>
      <% } %>
    </ul>
    </div>
      <% } %>
    </div>
      <% } %>
      <%
      
      
    } else if (machineState == ActivationStates.NO_VALID_LICENSE) {
      String licenseText = licenseStore.getLicenseTextFromDisk(licenseStore.getLicenseFile());
      boolean signatureMismatch = false;      
      
      String errorMessage = (String) request.getSession().getAttribute(BaseServletConstants.JSP_ERROR_MESSAGE);
      // Remove the "error" message after usage.
      request.getSession().removeAttribute(BaseServletConstants.JSP_ERROR_MESSAGE);
      
      if (errorMessage != null && !errorMessage.trim().isEmpty()) {
        errorMessage = errorMessage.replaceAll("\n", "<br/>").replaceAll("\r", "");
  %>
    <div class="error-msg"><a href="index.jsp" title="Close" class="close-button">x</a><%= errorMessage %></div>
      <%
      } else if (licenseText != null && !licenseText.isEmpty()) {
        signatureMismatch = true;
      %>
        <div class="error-msg">The current license was already activated on a License Server.
        That License Server's Machine Signature does not match the current server's Machine Signature.<br/><br/>
          <a href="https://www.oxygenxml.com/doc/ug-editor/topics/machine-signature-mismatch.html"
            target="_blank">Read documentation</a> 
            or contact <a href="mailto:support@oxygenxml.com">support@oxygenxml.com</a> for more details.
        </div>
      <% } %>
      <% if(isBundledWithContentFusion) { %>
      <div class="error-msg valid-component"><a href="index.jsp" title="Close" class="close-button">x</a>
        This product requires a valid <i>Oxygen Content Fusion</i> license key.
      </div>
      <% } %>
      
    <p>The Machine Signature for this license server is: <b><tt><%= activationCode %></tt></b><br/>
    Paste <%= signatureMismatch ? "a new" : "your"%> license key in the form below, and activate it.<br/>
  <%
    String documentationURL = "";
    try {
      Properties prop = new Properties();
      prop.load(getServletContext().getResourceAsStream("/documentation.properties"));
      documentationURL =
        prop.getProperty("installation.setting.up.license.server")
        .replace("${license.servlet.version}", BaseLicenseServlet.getVersionNoBuild());
    } catch (Exception e) {}
  %>
    
    <p>For more information see <a target="_blank" href="<%= documentationURL %>">
    Activating License Keys</a></p>

    <form action=<%= BaseServletConstants.HOME_URI %> method="POST">
      <input type="hidden" name="<%= BaseServletConstants.JSP_FORM %>" value="noLicenseForm">
      <textarea rows="22" cols="80" name="<%= BaseServletConstants.JSP_LICENSE_TEXT %>"
        placeholder="Paste license here..." id="noLicenseFormTextArea"></textarea>
      <input type="hidden" name="originalUrl" id="originalUrl">

      <br/>
      <input type="submit" value="Register / Activate" id="noLicenseFormSubmitButton" name="noLicenseFormSubmitButton"
        class="button">

      <div id="confirmLicenseDialogMask"></div>
      <div id="confirmLicenseDialog">
        <div class="dialog-header">
          <a title="Close" class="close-button">x</a>
        </div>
        <p>The activation process involves binding your license key to this license server deployment.</p>
        <p>Once the process is complete you cannot activate the license key with another license server deployment.</p>
        <p>If your license is already activated, it will not be changed and will be used as is.</p>
        <input type="submit" value="Confirm Activation" name="noLicenseFormConfirmButton"
            id="noLicenseFormConfirmButton" class="button">
      </div>
    </form>
    <br>
      <% } %>
    </body>
    <%
    if (isBundledWithContentFusion) { %>
      <script type="text/javascript">window.enforcedComponent = "Content-Fusion";</script>
    <% } %>
    <script type="text/javascript" src="js/jquery-3.5.1.min.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
  </html>