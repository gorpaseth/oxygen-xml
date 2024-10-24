/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: JspC/ApacheTomcat8
 * Generated at: 2024-04-04 07:57:41 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.WEB_002dINF;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.util.List;
import ro.sync.db.EmailHost;
import ro.sync.db.Kind;
import ro.sync.db.nonfloating.DBSupport;
import ro.sync.db.nonfloating.User;
import ro.sync.licenseservlet.BaseServletConstants;
import ro.sync.licenseservlet.LicenseInfo;
import ro.sync.licenseservlet.LicenseStore;

public final class user_002dmanagement_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent,
                 org.apache.jasper.runtime.JspSourceImports {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  private static final java.util.Set<java.lang.String> _jspx_imports_packages;

  private static final java.util.Set<java.lang.String> _jspx_imports_classes;

  static {
    _jspx_imports_packages = new java.util.HashSet<>();
    _jspx_imports_packages.add("javax.servlet");
    _jspx_imports_packages.add("javax.servlet.http");
    _jspx_imports_packages.add("javax.servlet.jsp");
    _jspx_imports_classes = new java.util.HashSet<>();
    _jspx_imports_classes.add("ro.sync.db.Kind");
    _jspx_imports_classes.add("ro.sync.db.nonfloating.User");
    _jspx_imports_classes.add("ro.sync.licenseservlet.BaseServletConstants");
    _jspx_imports_classes.add("java.util.List");
    _jspx_imports_classes.add("ro.sync.licenseservlet.LicenseStore");
    _jspx_imports_classes.add("ro.sync.db.EmailHost");
    _jspx_imports_classes.add("ro.sync.licenseservlet.LicenseInfo");
    _jspx_imports_classes.add("ro.sync.db.nonfloating.DBSupport");
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
      response.setContentType("text/html");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n");
 
    final String UTF_8_ENCODING = "UTF-8";
    ServletContext servletContext = getServletContext();
    DBSupport dbSupport = (DBSupport) servletContext.getAttribute(BaseServletConstants.PARAM_DB_SUPPORT);

      out.write("\r\n\r\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\r\n<head>\r\n  <title>&lt;oXygen/> XML License Server</title>\r\n  <link rel=\"icon\" type=\"image/png\" href=\"../favicon.ico\" />\r\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"../css/index.css\" />\r\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"../css/user_management.css\" />\r\n  <script type=\"text/javascript\" src=\"../js/jquery-3.5.1.min.js\"></script>\r\n</head>\r\n<body>\r\n");

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

      out.write("\r\n  <h1 class=\"mainTitle\">&lt;oXygen/> XML License Server User Management</h1>\r\n  <p><a href=\"../index.jsp\" class=\"link\">&lt; Back to main page</a></p>\r\n");

    if (li != null && dbSupport != null) {
      try {
        List<User> allUsers = dbSupport.getUsers(true);
        int allUsersCount = allUsers.size();
        int activeUsersCount = dbSupport.getUsers(false).size();
        int licenseCount = li.getLicenseCount().orElse(Integer.MAX_VALUE);

      out.write("\r\n    <h2>License server status</h2>\r\n    <table class=\"info\">\r\n      <tbody>\r\n        <tr>\r\n          <td><div class=\"tt\" \r\n            onmouseover=\"javascript:this.className='ttHover'\"\r\n            onmouseout=\"javascript:this.className='tt'\">Total licenses\r\n                <span>The total number of licenses, as specified in the license key file.</span></div></td>\r\n          <td>");
      out.print( licenseCount );
      out.write("</td>\r\n        </tr>\r\n        <tr>\r\n          <td><div class=\"tt\"\r\n            onmouseover=\"javascript:this.className='ttHover'\"\r\n            onmouseout=\"javascript:this.className='tt'\">Used licenses\r\n                <span>The number of licenses in use (allocated).</span></div></td>\r\n          <td>");
      out.print( activeUsersCount );
      out.write("</td>\r\n        </tr>\r\n        <tr>\r\n          <td><div class=\"tt\"\r\n            onmouseover=\"javascript:this.className='ttHover'\"\r\n            onmouseout=\"javascript:this.className='tt'\">Available licenses\r\n                <span>The number of available licenses that can be allocated to new users.</span></div></td>\r\n          <td>");
      out.print( licenseCount - activeUsersCount );
      out.write("</td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n    \r\n    ");

    if (!allUsers.isEmpty()) {
    
      out.write("\r\n    <h2>Users: ");
      out.print( allUsersCount );
      out.write("</h2>\r\n    <table class=\"info\">\r\n      <tbody>\r\n        <tr>\r\n          <td class=\"header\"><div>User Name</div></td>\r\n          <td class=\"header\"><div>Deactivated</div></td>\r\n        </tr>\r\n      ");
 for (User user: allUsers) { 
      out.write("\r\n        <tr>\r\n          <td><div>");
      out.print( user.getName() );
      out.write("</div></td>\r\n          ");
 if (user.isBanned()) { 
      out.write("\r\n            <td class=\"inactive\"><div class=\"activeInput\">\r\n                <input id=\"");
      out.print( user.getName() );
      out.write("\" class=\"userBanned\" type=\"checkbox\" checked/></div></td>\r\n          ");
 } else { 
      out.write("\r\n            <td class=\"active\"><div class=\"activeInput\">\r\n                <input id=\"");
      out.print( user.getName() );
      out.write("\" class=\"userBanned\" type=\"checkbox\"/></div></td>\r\n          ");
 } 
      out.write("\r\n        </tr>\r\n      ");
 } 
      out.write("\r\n      </tbody>\r\n\t  </table>\r\n    <div id=\"tooManyUsersDialogMask\"></div>\r\n    <div id=\"tooManyUsersDialog\">\r\n        <p>The maximum number of active users has been reached.</p>\r\n        <a id=\"okButton\" class=\"button\">OK</a>\r\n    </div>\r\n    <script type = \"text/javascript\">\r\n        \r\n    $( document ).ready(function() {\r\n    \t$('#okButton').on('click', function (e) {\r\n    \t\t$('#tooManyUsersDialogMask').css('display', 'none');\r\n        $('#tooManyUsersDialog').css('display', 'none');\r\n    \t});\r\n      $('.userBanned').on('change', function (e) {\r\n  \t    var userName = e.target.id;\r\n  \t    var userBannedVal = e.target.checked;\r\n        \r\n        var performAction = true;\r\n        var activeUsersCountVal = ");
      out.print(activeUsersCount);
      out.write(";\r\n        var licenseCountVal = ");
      out.print(licenseCount);
      out.write(";\r\n        // Check if the user is about 2 be activated.\r\n        if (!userBannedVal) {\r\n        \tif (activeUsersCountVal >= licenseCountVal) {\r\n        \t\tperformAction = false;        \t}\r\n        }\r\n        \r\n        if (performAction) {\r\n\t        var uri = window.location.href;\r\n\t        console.log('Send request to', uri);\r\n\t        // $(\".saveStatus\").removeClass('failed success');\r\n\t        var req = $.post( \r\n\t            uri, \r\n\t            { \r\n\t          \t  ");
      out.print( BaseServletConstants.PARAM_NAME );
      out.write(": userName,\r\n\t          \t  ");
      out.print( BaseServletConstants.PARAM_BANNED );
      out.write(": userBannedVal\r\n\t            }\r\n\t        );\r\n\t        req.always(function() {\r\n\t        \twindow.location.reload(true);\r\n\t        });\r\n        } else {\r\n          // Set back the previous state to the check box.\r\n          e.target.checked = true;\r\n          \r\n        \t// Make the warning dialog visible.\r\n          $('#tooManyUsersDialogMask').css('display', 'block');\r\n          $('#tooManyUsersDialog').css('display', 'block');\r\n        }\r\n      });\r\n    });\r\n        \r\n    </script>\r\n    ");

    }
      } catch (Exception e) {
        e.printStackTrace();
      }
    } else {
      // Error handling the DB !!!
    }

      out.write("\r\n</body>\r\n</html>");
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
