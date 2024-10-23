/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: JspC/ApacheTomcat8
 * Generated at: 2024-04-04 07:57:40 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.WEB_002dINF;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import ro.sync.licenseservlet.BaseServletConstants;
import java.util.Date;
import ro.sync.licenseservlet.DateFormats;
import ro.sync.licenseservlet.LicenseInfo;

public final class replace_002dlicense_002dform_jsp extends org.apache.jasper.runtime.HttpJspBase
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
    _jspx_imports_classes.add("ro.sync.licenseservlet.BaseServletConstants");
    _jspx_imports_classes.add("java.util.Date");
    _jspx_imports_classes.add("ro.sync.licenseservlet.DateFormats");
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
      response.setContentType("text/html");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\r\n\r\n\r\n\r\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\r\n<head>\r\n<title>&lt;oXygen/> XML License Server</title>\r\n<link rel=\"icon\" type=\"image/png\" href=\"../favicon.ico\">\r\n<link rel=\"stylesheet\" type=\"text/css\" href=\"../css/index.css\">\r\n</head>\r\n<body>\r\n<h1 class=\"mainTitle\">&lt;oXygen/> XML License Server</h1>\r\n<p><a href=\"../index.jsp\" class=\"link\">&lt; Back to main page</a></p>\r\n");

  response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
  response.setHeader("Pragma", "no-cache"); //HTTP 1.0
  response.setDateHeader("Expires", 0); //prevents caching at the proxy server

      out.write("\r\n\r\n<p>The current license key will be replaced by a new one or removed. \r\nWhen replacing you will be asked to provide a new license key and to activate it with this server instance. \r\nDuring this process you can use the Cancel button to revert to the current license key:</p>\r\n\r\n");
 LicenseInfo licenseInfo = (LicenseInfo) request.getAttribute(BaseServletConstants.JSP_LICENSE_INFORMATION); 
      out.write("\r\n<table class=\"info\">\r\n<tbody>\r\n<tr>\r\n<td>Product</td>\r\n<td>");
      out.print( licenseInfo.getLicenseComponent() );
      out.write("</td>\r\n</tr>\r\n<tr>\r\n<td>Version</td>\r\n<td>");
      out.print( licenseInfo.getLicenseVersion() );
      out.write("</td>\r\n</tr>\r\n<tr>\r\n<td>Registration name</td>\r\n<td>");
      out.print( licenseInfo.getLicenseRegistrationName() );
      out.write("</td>\r\n</tr>\r\n<tr>\r\n<td>Company</td>\r\n<td>");
      out.print( licenseInfo.getLicenseCompany() );
      out.write("</td>\r\n</tr>\r\n<tr>\r\n<td>Category</td>\r\n<td>");
      out.print( licenseInfo.getLicenseCategory() );
      out.write("</td>\r\n</tr>\r\n");
 if (!licenseInfo.hasUnlimitedSeats()) { 
      out.write("\r\n  <tr>\r\n  <td>Number of licenses</td>\r\n  <td>");
      out.print( licenseInfo.getLicenseCount().get() );
      out.write("</td>\r\n  </tr>\r\n");
 } 
      out.write('\r');
      out.write('\n');
 if (!licenseInfo.isSubscription()) { 
      out.write("\r\n<tr>\r\n");

    if (licenseInfo.getLicenseMaintenance() == 0) {
      // No maintenance...

      out.write("\r\n  <td>Maintenance pack</td>\r\n  <td>[<span class=\"notice\">NO</span>]</td>\r\n");

    } else {
      // With maintenance...

      out.write("  \r\n  <td>Maintenance pack valid until</td>\r\n  <td>");
      out.print( DateFormats.CDF.format(licenseInfo.getLicenseMaintenanceDate()) );
      out.write("\r\n      ");
 if (licenseInfo.getLicenseMaintenanceDate().before(new Date(System.currentTimeMillis()))) { 
      out.write("\r\n        [<span class=\"notice\">EXPIRED</span>]\r\n      ");
 } 
      out.write("\r\n  </td>\r\n");
 } 
      out.write("\r\n</tr>\r\n");
 } 
      out.write("\r\n</tbody>\r\n</table>\r\n<br>\r\n");
      out.write("\r\n\r\n<div class=\"form\"> \r\n  <a href=\"../replace.jsp\" class=\"button\">Replace</a> \r\n  <a href=\"../remove.jsp\" class=\"button\">Remove</a> \r\n  <a href=\"../index.jsp\" class=\"button\">Cancel</a> \r\n</div> \r\n<br/>\r\n</body>\r\n</html>");
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
