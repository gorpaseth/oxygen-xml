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
import java.util.Date;
import ro.sync.licenseservlet.BaseServletConstants;
import ro.sync.licenseservlet.DateFormats;
import ro.sync.licenseservlet.LicenseInfo;
import ro.sync.licenseservlet.polling.LicensePollingResult;

public final class polling_002dstatus_jsp extends org.apache.jasper.runtime.HttpJspBase
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
    _jspx_imports_classes.add("ro.sync.licenseservlet.polling.LicensePollingResult");
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
