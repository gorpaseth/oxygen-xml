<%@ page import="java.util.Properties" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
<%@ page import="ro.sync.licenseservlet.polling.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="icon" type="image/png" href="favicon.ico">
<link rel="stylesheet" href="css/index.css" type="text/css">
<title>&lt;oXygen/> XML License Server</title>
</head>
<body>
  <h1 class="mainTitle">&lt;oXygen/> XML Floating License Server</h1>
  <p><a href="index.jsp" class="link">&lt; Back to main page</a></p>
  <%
  response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
  response.setHeader("Pragma", "no-cache"); //HTTP 1.0
  response.setDateHeader("Expires", 0); //prevents caching at the proxy server
  ServletContext servletContext = getServletContext();
  Properties proxySettings = (Properties) servletContext.getAttribute(ProxySettingsServlet.PROXY_SETTINGS_ATTR_KEY);
  if (proxySettings == null) {
    proxySettings = new Properties();
  }
%>
	<h2>Proxy configuration</h2>
	<form action="proxy-settings" method="POST">
	<div class="proxy-settings">
		<label class="textfield-label" style="width:70px" for="<%=ProxySettingsServlet.HTTP_PROXY_HOST%>">Host:</label>
		<input type="text" 
			name="<%= ProxySettingsServlet.HTTP_PROXY_HOST %>" 
			value="<%= ProxySettingsServlet.getPropertyOrEmptyString(proxySettings, ProxySettingsServlet.HTTP_PROXY_HOST) %>" 
			class="textfield proxy-host-textfield">
			
		<label class="textfield-label" for="<%= ProxySettingsServlet.HTTP_PROXY_PORT %>">Port:</label>
		<input type="text" 
			name="<%= ProxySettingsServlet.HTTP_PROXY_PORT %>" 
			value="<%= ProxySettingsServlet.getPropertyOrEmptyString(proxySettings, ProxySettingsServlet.HTTP_PROXY_PORT) %>"
			class="textfield proxy-port-textfield">
	</div>
	<div>
		<label class="textfield-label" style="width:70px" for="<%= ProxySettingsServlet.HTTP_PROXY_USER %>">User:</label>
		<input type="text" 
			name="<%= ProxySettingsServlet.HTTP_PROXY_USER %>" 
			value="<%= ProxySettingsServlet.getPropertyOrEmptyString(proxySettings, ProxySettingsServlet.HTTP_PROXY_USER) %>"
			class="textfield">
	</div>
	<div>
		<label class="textfield-label" style="width:70px" for="<%= ProxySettingsServlet.HTTP_PROXY_PASSWORD %>">Password:</label>
		<input type="password" 
			name="<%= ProxySettingsServlet.HTTP_PROXY_PASSWORD %>" 
			value="<%= ProxySettingsServlet.getPropertyOrEmptyString(proxySettings, ProxySettingsServlet.HTTP_PROXY_PASSWORD) %>"
			class="textfield">
	</div>
	<br>
		<input type="submit" value="Submit" class="button"> 
		<a href="index.jsp" class="button">Cancel</a>
	</form>
</body>
</html>
