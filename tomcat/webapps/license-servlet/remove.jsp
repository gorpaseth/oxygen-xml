<%@ page import="ro.sync.licenseservlet.LicenseInfo" %>
<%@ page import="ro.sync.licenseservlet.LicenseStore" %>
<%@ page import="ro.sync.licenseservlet.BaseServletConstants" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
<%@ page import="java.io.File" %>
<%@ page import="java.io.FileInputStream" %>
<%@ page import="java.util.Properties" %>
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
  <p><a href="../index.jsp" class="link">&lt; Back to main page</a></p>
  <%
  response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
  response.setHeader("Pragma", "no-cache"); //HTTP 1.0
  response.setDateHeader("Expires", 0); //prevents caching at the proxy server
  ServletContext servletContext = getServletContext();

  String errorMessage = (String) request.getSession().getAttribute(BaseServletConstants.JSP_ERROR_MESSAGE);
  request.getSession().removeAttribute(BaseServletConstants.JSP_ERROR_MESSAGE);
  if (errorMessage != null && !errorMessage.trim().isEmpty()) {
    errorMessage = errorMessage.replaceAll("\n", "<br>").replaceAll("\r", "");
  %>
  <div class="error-msg"><a href="remove.jsp" title="Close" class="close-button">x</a><%= errorMessage %></div>
  <% } %>

  <h3 style="margin-top: 3em">Remove the current license key</h3>
  <p>The removal process is irreversible.<br/>
  Once the process is completed you cannot restore the license key.</p>

  <form action=<%= BaseServletConstants.HOME_URI %> method="POST">
    <input type="hidden" name=<%= BaseServletConstants.JSP_FORM %> value="removeLicenseForm">
    <br/>
    <input type="submit" value="Remove" id="removeLicenseFormSubmitButton" name="removeLicenseFormSubmitButton"
        class="button">
    <a href="index.jsp" class="button">Cancel</a>
  </form>
</body>
<script type="text/javascript" src="js/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="js/main.js"></script>
</html>