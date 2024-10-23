<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
<%@ page import="java.io.File" %>
<%@ page import="java.io.FileInputStream" %>
<%@ page import="java.util.Properties" %>
<%@ page import="ro.sync.licenseservlet.LicenseInfo" %>
<%@ page import="ro.sync.licenseservlet.LicenseStore" %>
<%@ page import="ro.sync.licenseservlet.BaseLicenseServlet" %>
<%@ page import="ro.sync.licenseservlet.BaseServletConstants" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="icon" type="image/png" href="favicon.ico">
<link rel="stylesheet" href="css/index.css" type="text/css">
<title>&lt;oXygen/> XML License Server</title>
</head>
<body>
  <h1 class="mainTitle">&lt;oXygen/> XML License Server</h1>
  <p><a href="index.jsp" class="link">&lt; Back to main page</a></p>
  <%
  response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
  response.setHeader("Pragma", "no-cache"); //HTTP 1.0
  response.setDateHeader("Expires", 0); //prevents caching at the proxy server
  ServletContext servletContext = getServletContext();
  String activationCode = servletContext.getAttribute(BaseServletConstants.JSP_ACTIVATION_CODE).toString();
  
  boolean isBundledWithWebAuthor = "true".equals(System.getProperty("com.oxygenxml.webapp.product"));
  boolean isBundledWithContentFusion = "true".equals(System.getProperty("com.oxygenxml.content.fusion.product"));

  String errorMessage = (String) request.getSession().getAttribute(BaseServletConstants.JSP_ERROR_MESSAGE);
  request.getSession().removeAttribute(BaseServletConstants.JSP_ERROR_MESSAGE);
  if (errorMessage != null && !errorMessage.trim().isEmpty()) {
    errorMessage = errorMessage.replaceAll("\n", "<br>").replaceAll("\r", "");
  %>
  <div class="error-msg"><a href="replace.jsp" title="Close" class="close-button">x</a><%= errorMessage %></div>
  <% } %>

  <p>Replacing the license key.</p>
  <p>Paste your new license key in the form below, and activate it.<br/>
  <% if (isBundledWithContentFusion) { %>
      <div class="error-msg valid-component"><a href="index.jsp" title="Close" class="close-button">x</a>
        This product requires a <em>Content-Fusion</em> license key.
      </div>
  <% } %>
  The Machine Signature for this license server is: <strong><tt><%= activationCode %></tt></strong>
  </p>
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
  <p>
    For more information see <a target="_blank" href="<%= documentationURL %>">Activating License Keys</a>
  </p>

  <form action=<%= BaseServletConstants.HOME_URI %> method="POST">
    <input type="hidden" name=<%= BaseServletConstants.JSP_FORM %> value="noLicenseForm">
    <textarea rows="22" cols="80" name=<%= BaseServletConstants.JSP_LICENSE_TEXT %> placeholder="Paste license here..."
        id="noLicenseFormTextArea"></textarea>
    <input type="hidden" name="originalUrl" id="originalUrl">
    
    <br />
        <input type="submit" value="Register / Activate" id="noLicenseFormSubmitButton" name="noLicenseFormSubmitButton"
          class="button">
        <a href="index.jsp" class="button">Cancel</a>
        <div id="confirmLicenseDialogMask"></div>
        <div id="confirmLicenseDialog">
            <div class="dialog-header">
                <a title="Close" class="close-button">x</a>
            </div>
            <p>The activation process involves binding your license key to this license server deployment.</p>
            <p>Once the process is complete you cannot activate the license key with another license server deployment.</p>
            <p>If your license key is already activated, it will not be changed and will be used as is.</p>
            <input type="submit" value="Confirm Activation" name="noLicenseFormConfirmButton"
                id="noLicenseFormConfirmButton" class="button">
        </div>
  </form>
</body>
  <% if(isBundledWithContentFusion) { %>
    <script type="text/javascript">window.enforcedComponent = "Content-Fusion";</script>
  <% } %>
<script type="text/javascript" src="js/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="js/main.js"></script>
</html>