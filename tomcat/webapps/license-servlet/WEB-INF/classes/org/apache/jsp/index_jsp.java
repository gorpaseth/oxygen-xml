/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: JspC/ApacheTomcat8
 * Generated at: 2024-04-04 07:57:40 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import ro.sync.db.nonfloating.DBSupport;
import ro.sync.db.BaseDBSupport;
import ro.sync.licenseservlet.*;
import java.util.List;
import java.io.File;
import java.io.FileInputStream;
import java.util.Properties;
import java.util.Properties;
import java.text.MessageFormat;
import ro.sync.db.nonfloating.User;
import ro.sync.util.JspUtil;
import java.util.Date;
import ro.sync.licenseservlet.BaseServletConstants;
import ro.sync.licenseservlet.DateFormats;
import ro.sync.licenseservlet.LicenseInfo;
import ro.sync.licenseservlet.polling.LicensePollingResult;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent,
                 org.apache.jasper.runtime.JspSourceImports {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  static {
    _jspx_dependants = new java.util.HashMap<java.lang.String,java.lang.Long>(1);
    _jspx_dependants.put("/WEB-INF/polling-status.jsp", Long.valueOf(1710503730625L));
  }

  private static final java.util.Set<java.lang.String> _jspx_imports_packages;

  private static final java.util.Set<java.lang.String> _jspx_imports_classes;

  static {
    _jspx_imports_packages = new java.util.HashSet<>();
    _jspx_imports_packages.add("javax.servlet");
    _jspx_imports_packages.add("javax.servlet.http");
    _jspx_imports_packages.add("javax.servlet.jsp");
    _jspx_imports_packages.add("ro.sync.licenseservlet");
    _jspx_imports_classes = new java.util.HashSet<>();
    _jspx_imports_classes.add("java.util.Properties");
    _jspx_imports_classes.add("java.util.Date");
    _jspx_imports_classes.add("ro.sync.licenseservlet.DateFormats");
    _jspx_imports_classes.add("java.io.FileInputStream");
    _jspx_imports_classes.add("ro.sync.db.nonfloating.DBSupport");
    _jspx_imports_classes.add("ro.sync.db.BaseDBSupport");
    _jspx_imports_classes.add("java.io.File");
    _jspx_imports_classes.add("java.text.MessageFormat");
    _jspx_imports_classes.add("ro.sync.db.nonfloating.User");
    _jspx_imports_classes.add("ro.sync.licenseservlet.BaseServletConstants");
    _jspx_imports_classes.add("ro.sync.licenseservlet.polling.LicensePollingResult");
    _jspx_imports_classes.add("java.util.List");
    _jspx_imports_classes.add("ro.sync.util.JspUtil");
    _jspx_imports_classes.add("ro.sync.licenseservlet.LicenseInfo");
  }

  private volatile javax.el.ExpressionFactory _el_expressionfactory;
  private volatile org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public java.util.Set<java.lang.String> getPackageImports() {
    return _jspx_imports_packages;
  }

  public java.util.Set<java.lang.String> getClassImports() {
    return _jspx_imports_classes;
  }

  public javax.el.ExpressionFactory _jsp_getExpressionFactory() {
    if (_el_expressionfactory == null) {
      synchronized (this) {
        if (_el_expressionfactory == null) {
          _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
        }
      }
    }
    return _el_expressionfactory;
  }

  public org.apache.tomcat.InstanceManager _jsp_getInstanceManager() {
    if (_jsp_instancemanager == null) {
      synchronized (this) {
        if (_jsp_instancemanager == null) {
          _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
        }
      }
    }
    return _jsp_instancemanager;
  }

  public void _jspInit() {
  }

  public void _jspDestroy() {
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
      throws java.io.IOException, javax.servlet.ServletException {

    final java.lang.String _jspx_method = request.getMethod();
    if (!"GET".equals(_jspx_method) && !"POST".equals(_jspx_method) && !"HEAD".equals(_jspx_method) && !javax.servlet.DispatcherType.ERROR.equals(request.getDispatcherType())) {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "JSPs only permit GET, POST or HEAD. Jasper also permits OPTIONS");
      return;
    }

    final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html; charset=ISO-8859-1");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n  \r\n    <!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\r\n    <html>\r\n    <head>\r\n    <link rel=\"icon\" type=\"image/png\" href=\"favicon.ico\">\r\n    <link rel=\"stylesheet\" href=\"css/index.css\" type=\"text/css\">\r\n    <title>&lt;oXygen/&gt; XML License Server</title>\r\n    </head>\r\n    <body>\r\n    <h1 class=\"mainTitle\">&lt;oXygen/&gt; XML License Server</h1>\r\n\r\n  ");

    // Set the success message in the servlet context.
    String successMessage = (String) request.getSession().getAttribute(BaseServletConstants.JSP_SUCCESS_MESSAGE);
    request.getSession().removeAttribute(BaseServletConstants.JSP_SUCCESS_MESSAGE);
    if (successMessage != null) {
  
      out.write("\r\n      <div class=\"success-msg\"><a href=\"index.jsp\" title=\"Close\" class=\"close-button\">x</a>");
      out.print( successMessage );
      out.write("</div>\r\n  ");
 } 
      out.write("\r\n\r\n  ");

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
  
      out.write("\r\n        <div class=\"error-msg\"><p>The current number of active users exceeds the number of available licenses.</p>\r\n        <p>Go to the <a href=\"");
      out.print(BaseServletConstants.USERS_MANAGEMENT_URI);
      out.write("\" class=\"link\">Users management</a> page\r\n        and deactivate the users who are no longer entitled to use the license.</div>\r\n   ");
 } 
      out.write("\r\n    <h2>Machine Signature</h2>\r\n    <div class=\"emf\">");
      out.print( activationCode );
      out.write("</div>\r\n    <h2>Activation status</h2>\r\n    <div>The license key is ACTIVATED.</div>\r\n    ");
      out.print( licenseKeyInfoHTML );
      out.write("\r\n\r\n    ");
      out.write("\r\n    ");
      org.apache.jasper.runtime.JspRuntimeLibrary.include(request, response, "/license-polling?action=status", out, false);
      out.write("\r\n    ");
      out.write("\r\n\r\n\r\n\r\n\r\n\r\n<div id=\"subscription-status\">\r\n");

 String refreshTimeout = (String) request.getAttribute("Refresh");
 if (refreshTimeout != null) {
   response.setHeader("Refresh", refreshTimeout);
 }
 LicenseInfo licenseInfo = (LicenseInfo) request.getAttribute(BaseServletConstants.JSP_LICENSE_INFORMATION);
 LicensePollingResult result = (LicensePollingResult) request.getAttribute("pollingResult");
 Date lastUpdated = (Date) request.getAttribute("lastUpdated");
 Boolean autoCheck = (Boolean) request.getAttribute("autocheck");

 if (licenseInfo.isSubscription()) {

      out.write("\r\n<h2>Subscription Status</h2>\r\n\r\n");

   if (Boolean.TRUE.equals(autoCheck) && result != null) {
     if (result.isPending()) {

      out.write("\r\n<div>Checking for subscription renewal...</div>\r\n");

     } else if (!result.isSuccessful()) {

      out.write("\r\n  <div class=\"fail\">Failed to check for subscription renewal, because: \"");
      out.print( result.getMessage() );
      out.write("\".</div>\r\n");

     } else {

      out.write("\r\n<div class=\"success\">Your subscription ends on ");
      out.print( DateFormats.CDF.format(licenseInfo.getSubscriptionExpirationDate()) );
      out.write(".</div>\r\n<div class=\"success\">Your subscription key was updated on server at ");
      out.print( DateFormats.PDF.format(lastUpdated) );
      out.write(".</div>\r\n");

     }
     if (!result.isPending()) {

      out.write(" \r\n  <form action=\"license-polling\" method=\"post\"> \r\n    <span class=\"status-message\">Last check was done at ");
      out.print( DateFormats.PDF.format(result.getDate()) );
      out.write(".</span> \r\n    <button id=\"check-again\" class=\"refresh-button\" name=\"action\" value=\"force-check\">Check again</button>\r\n  </form>\r\n");

     }
   } else {

      out.write("\r\n  <div>Your subscription ends on ");
      out.print( DateFormats.CDF.format(licenseInfo.getSubscriptionExpirationDate()) );
      out.write(".</div>\r\n");

   }

      out.write('\r');
      out.write('\n');
      out.write(' ');
      out.write("\r\n <noscript>\r\n   <form action=\"license-polling\" method=\"post\">Automatic checking for subscription renewal \r\n      ");
      out.print( autoCheck ? "enabled" : "disabled" );
      out.write(".\r\n      <button class=\"refresh-button\" name=\"action\" value=\"toggle-auto-check\">");
      out.print( autoCheck ? "Disable" : "Enable" );
      out.write("</button>\r\n   </form>\r\n </noscript>\r\n <label class=\"script-only auto-check-box\">\r\n    <input id=\"autocheck\" type=\"checkbox\" ");
      out.print( autoCheck ? "checked" : "" );
      out.write(">Automatically check for subscription renewal.\r\n </label>\r\n");
 } 
      out.write("\r\n</div>");
      out.write("\r\n\r\n  ");

     // When used in the oXygen XML WebApp product, add a "go to webapp config page button
    if (isBundledWithWebAuthor) {
  
      out.write("\r\n    <p><a href=\"/\" class=\"button\" style=\"margin:0; text-decoration:none\">Go to &lt;oXygen/&gt; XML Web Author</a></p>\r\n  ");
 } 
      out.write("\r\n    <h2>License statistics</h2>\r\n    <ul>\r\n    <li><a href=\"");
      out.print(BaseServletConstants.REPORT_URI);
      out.write("\" class=\"link\">Current Allocated Licenses</a></li>\r\n  ");

    if (isFloating && !li.hasUnlimitedSeats()) {
  
      out.write("\r\n    <li><a href=\"");
      out.print(BaseServletConstants.REPORT_USAGE_URI);
      out.write("\" class=\"link\">Usage Statistics</a></li>\r\n  ");
 } 
      out.write("\r\n    </ul>\r\n\r\n    <h2>Management tasks</h2>\r\n    <ul>\r\n      ");
 if (JspUtil.supportsSubscriptionRenewal(licenseInfo)) { 
      out.write("\r\n    <li><a href=\"");
      out.print( JspUtil.generateBuySubcriptionRenewalURL(licenseInfo) );
      out.write("\"\r\n    class=\"link\">Buy subscription renewal</a></li>\r\n      ");
 } 
      out.write("\r\n    <li><a href=\"");
      out.print( BaseServletConstants.VIEW_ACTIVATED_LICENSE_URI );
      out.write("\" class=\"link\">View license key</a></li>\r\n    <li><a href=\"");
      out.print( BaseServletConstants.REPLACE_URI );
      out.write("\" class=\"link\">Replace/Remove license key</a></li>\r\n    <li><a href=\"");
      out.print( BaseServletConstants.CONFIGURATION_URI );
      out.write("\" class=\"link\">Configuration</a></li>\r\n    ");
 if (isUserBased && !li.hasUnlimitedSeats()) { 
      out.write("\r\n    <li><a href=\"");
      out.print( BaseServletConstants.USERS_MANAGEMENT_URI );
      out.write("\" class=\"link\">Users management</a></li>\r\n    ");
 }
      if (licenseInfo.isSubscription()) {
    
      out.write("\r\n    <li><a href=\"proxy-settings\" class=\"link\">Proxy settings</a></li>\r\n    ");
 }
      // show the allowed users list link only for non floating licenses.
      if( isUserBased) { 
      out.write("\r\n    <li><a href=\"allowed-users.html\" class=\"link\">Allowed users list</a></li>\r\n    ");
 } 
      out.write("\r\n    </ul>\r\n      ");

      // When embedded in Oxygen XML Web Author or Oxygen Content Fusion, the license servlet is already connected
      boolean hideHowToSection = isBundledWithWebAuthor || isBundledWithContentFusion;
      if (!hideHowToSection) {
        List<String> possibleUrls = BaseLicenseServlet.getClientAccessUrls(request, BaseServletConstants.HOME_URI);
        String URI = possibleUrls.get(0);
    
      out.write("\r\n    <h2>How to use it from &lt;oXygen/&gt; XML application</h2>\r\n      ");
 if (!BaseServletConstants.WEBAPP_COMPONENTS.contains(licenseInfo.getRawLicenseComponent())) { 
      out.write("\r\n    <div>\r\n    <img src=\"img/Oxygen16.png\" class=\"inline-img\">To use <span class=\"emf\">&lt;oXygen/&gt; XML standalone</span>\r\n        with this license server:\r\n    <ol>\r\n    <li>Start &lt;oXygen/&gt; XML.</li>\r\n    <li>Go to <span class=\"emf\">Help > Register</span> menu.\r\n    <li>Click <span class=\"emf\">Use a license server</span>.\r\n    <li>Click <span class=\"emf\">HTTP/HTTPS server</span>.\r\n    <li>Use the following URL: <span class=\"emf\"><code>");
      out.print( URI );
      out.write("</code></span>.\r\n    <img src=\"img/Warning16.png\"  class=\"inline-img\"> See the note below.\r\n    <li>Fill the user and password fields with the information you\r\n    have configured for the <span class=\"emf\">user</span> role.</li>\r\n    </ol>\r\n    </div>\r\n    <div>\r\n    <img src=\"img/eclipse16.ico\" class=\"inline-img\">To use <span class=\"emf\">&lt;oXygen/&gt; XML Eclipse plugin</span>\r\n        with this license server:\r\n    <ol>\r\n    <li>Start Eclipse</li>\r\n    <li>Go to <span class=\"emf\">Window > Preferences > oXygen XML Editor > Register...</span></li>\r\n    <li>Click <span class=\"emf\">Use a license server</span>.</li>\r\n    <li>Click <span class=\"emf\">HTTP/HTTPS server</span>.</li>\r\n    <li>Use the following URL: <span class=\"emf\"><code>");
      out.print( URI );
      out.write("</code></span>.\r\n    <img src=\"img/Warning16.png\" class=\"inline-img\"> See the note below.</li>\r\n    <li>Fill the user and password fields with the information you\r\n    have configured for the <span class=\"emf\">user</span> role.</li>\r\n    </ol>\r\n    </div>\r\n      ");
 } else { 
      out.write("\r\n    <div>To enable an &lt;oXygen/&gt; XML Web Author installation:\r\n    <ol>\r\n    <li>Go to the <span class=\"emf\">Administration Page</span>, the <span class=\"emf\">Licensing</span> section.\r\n    <li>Set the <span class=\"emf\">Server URL</span> to <code>");
      out.print( URI );
      out.write("</code>.\r\n    <img src=\"img/Warning16.png\"  class=\"inline-img\"> See the note below.\r\n    <li>Fill the user and password fields with the information you have configured for the <b>user</b> role.\r\n    <li>Click <span class=\"emf\">Submit</span>.\r\n    </ol>\r\n    </div>\r\n      ");
 } 
      out.write("\r\n    <div class=\"note\"><b> Note:</b> In case the above URL does not work\r\n        you might try to replace the above IP address (or hostname)\r\n        with the appropriate IP address that can be used by &lt;oXygen/&gt; applications to reach the license server.\r\n      ");
 if (possibleUrls.size() > 1) { 
      out.write("\r\n    <div>Possible alternatives:\r\n    <ul>\r\n      ");
 for (int i = 1; i < possibleUrls.size(); i++) { 
      out.write("\r\n    <li><code>");
      out.print( possibleUrls.get(i) );
      out.write("</code></li>\r\n      ");
 } 
      out.write("\r\n    </ul>\r\n    </div>\r\n      ");
 } 
      out.write("\r\n    </div>\r\n      ");
 } 
      out.write("\r\n      ");

      
      
    } else if (machineState == ActivationStates.NO_VALID_LICENSE) {
      String licenseText = licenseStore.getLicenseTextFromDisk(licenseStore.getLicenseFile());
      boolean signatureMismatch = false;      
      
      String errorMessage = (String) request.getSession().getAttribute(BaseServletConstants.JSP_ERROR_MESSAGE);
      // Remove the "error" message after usage.
      request.getSession().removeAttribute(BaseServletConstants.JSP_ERROR_MESSAGE);
      
      if (errorMessage != null && !errorMessage.trim().isEmpty()) {
        errorMessage = errorMessage.replaceAll("\n", "<br/>").replaceAll("\r", "");
  
      out.write("\r\n    <div class=\"error-msg\"><a href=\"index.jsp\" title=\"Close\" class=\"close-button\">x</a>");
      out.print( errorMessage );
      out.write("</div>\r\n      ");

      } else if (licenseText != null && !licenseText.isEmpty()) {
        signatureMismatch = true;
      
      out.write("\r\n        <div class=\"error-msg\">The current license was already activated on a License Server.\r\n        That License Server's Machine Signature does not match the current server's Machine Signature.<br/><br/>\r\n          <a href=\"https://www.oxygenxml.com/doc/ug-editor/topics/machine-signature-mismatch.html\"\r\n            target=\"_blank\">Read documentation</a> \r\n            or contact <a href=\"mailto:support@oxygenxml.com\">support@oxygenxml.com</a> for more details.\r\n        </div>\r\n      ");
 } 
      out.write("\r\n      ");
 if(isBundledWithContentFusion) { 
      out.write("\r\n      <div class=\"error-msg valid-component\"><a href=\"index.jsp\" title=\"Close\" class=\"close-button\">x</a>\r\n        This product requires a valid <i>Oxygen Content Fusion</i> license key.\r\n      </div>\r\n      ");
 } 
      out.write("\r\n      \r\n    <p>The Machine Signature for this license server is: <b><tt>");
      out.print( activationCode );
      out.write("</tt></b><br/>\r\n    Paste ");
      out.print( signatureMismatch ? "a new" : "your");
      out.write(" license key in the form below, and activate it.<br/>\r\n  ");

    String documentationURL = "";
    try {
      Properties prop = new Properties();
      prop.load(getServletContext().getResourceAsStream("/documentation.properties"));
      documentationURL =
        prop.getProperty("installation.setting.up.license.server")
        .replace("${license.servlet.version}", BaseLicenseServlet.getVersionNoBuild());
    } catch (Exception e) {}
  
      out.write("\r\n    \r\n    <p>For more information see <a target=\"_blank\" href=\"");
      out.print( documentationURL );
      out.write("\">\r\n    Activating License Keys</a></p>\r\n\r\n    <form action=");
      out.print( BaseServletConstants.HOME_URI );
      out.write(" method=\"POST\">\r\n      <input type=\"hidden\" name=\"");
      out.print( BaseServletConstants.JSP_FORM );
      out.write("\" value=\"noLicenseForm\">\r\n      <textarea rows=\"22\" cols=\"80\" name=\"");
      out.print( BaseServletConstants.JSP_LICENSE_TEXT );
      out.write("\"\r\n        placeholder=\"Paste license here...\" id=\"noLicenseFormTextArea\"></textarea>\r\n      <input type=\"hidden\" name=\"originalUrl\" id=\"originalUrl\">\r\n\r\n      <br/>\r\n      <input type=\"submit\" value=\"Register / Activate\" id=\"noLicenseFormSubmitButton\" name=\"noLicenseFormSubmitButton\"\r\n        class=\"button\">\r\n\r\n      <div id=\"confirmLicenseDialogMask\"></div>\r\n      <div id=\"confirmLicenseDialog\">\r\n        <div class=\"dialog-header\">\r\n          <a title=\"Close\" class=\"close-button\">x</a>\r\n        </div>\r\n        <p>The activation process involves binding your license key to this license server deployment.</p>\r\n        <p>Once the process is complete you cannot activate the license key with another license server deployment.</p>\r\n        <p>If your license is already activated, it will not be changed and will be used as is.</p>\r\n        <input type=\"submit\" value=\"Confirm Activation\" name=\"noLicenseFormConfirmButton\"\r\n            id=\"noLicenseFormConfirmButton\" class=\"button\">\r\n      </div>\r\n    </form>\r\n    <br>\r\n");
      out.write("      ");
 } 
      out.write("\r\n    </body>\r\n    ");

    if (isBundledWithContentFusion) { 
      out.write("\r\n      <script type=\"text/javascript\">window.enforcedComponent = \"Content-Fusion\";</script>\r\n    ");
 } 
      out.write("\r\n    <script type=\"text/javascript\" src=\"js/jquery-3.5.1.min.js\"></script>\r\n    <script type=\"text/javascript\" src=\"js/main.js\"></script>\r\n  </html>");
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try {
            if (response.isCommitted()) {
              out.flush();
            } else {
              out.clearBuffer();
            }
          } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
