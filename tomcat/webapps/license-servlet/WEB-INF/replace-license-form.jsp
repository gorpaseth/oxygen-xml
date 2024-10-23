<%@ page import="ro.sync.licenseservlet.BaseServletConstants" %>
<%@ page import="java.util.Date" %>
<%@ page import="ro.sync.licenseservlet.DateFormats" %>
<%@ page import="ro.sync.licenseservlet.LicenseInfo" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>&lt;oXygen/> XML License Server</title>
<link rel="icon" type="image/png" href="../favicon.ico">
<link rel="stylesheet" type="text/css" href="../css/index.css">
</head>
<body>
<h1 class="mainTitle">&lt;oXygen/> XML License Server</h1>
<p><a href="../index.jsp" class="link">&lt; Back to main page</a></p>
<%
  response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
  response.setHeader("Pragma", "no-cache"); //HTTP 1.0
  response.setDateHeader("Expires", 0); //prevents caching at the proxy server
%>

<p>The current license key will be replaced by a new one or removed. 
When replacing you will be asked to provide a new license key and to activate it with this server instance. 
During this process you can use the Cancel button to revert to the current license key:</p>

<% LicenseInfo licenseInfo = (LicenseInfo) request.getAttribute(BaseServletConstants.JSP_LICENSE_INFORMATION); %>
<table class="info">
<tbody>
<tr>
<td>Product</td>
<td><%= licenseInfo.getLicenseComponent() %></td>
</tr>
<tr>
<td>Version</td>
<td><%= licenseInfo.getLicenseVersion() %></td>
</tr>
<tr>
<td>Registration name</td>
<td><%= licenseInfo.getLicenseRegistrationName() %></td>
</tr>
<tr>
<td>Company</td>
<td><%= licenseInfo.getLicenseCompany() %></td>
</tr>
<tr>
<td>Category</td>
<td><%= licenseInfo.getLicenseCategory() %></td>
</tr>
<% if (!licenseInfo.hasUnlimitedSeats()) { %>
  <tr>
  <td>Number of licenses</td>
  <td><%= licenseInfo.getLicenseCount().get() %></td>
  </tr>
<% } %>
<% if (!licenseInfo.isSubscription()) { %>
<tr>
<%
    if (licenseInfo.getLicenseMaintenance() == 0) {
      // No maintenance...
%>
  <td>Maintenance pack</td>
  <td>[<span class="notice">NO</span>]</td>
<%
    } else {
      // With maintenance...
%>  
  <td>Maintenance pack valid until</td>
  <td><%= DateFormats.CDF.format(licenseInfo.getLicenseMaintenanceDate()) %>
      <% if (licenseInfo.getLicenseMaintenanceDate().before(new Date(System.currentTimeMillis()))) { %>
        [<span class="notice">EXPIRED</span>]
      <% } %>
  </td>
<% } %>
</tr>
<% } %>
</tbody>
</table>
<br>
<%-- <p>Do you want to proceed?</p> --%>

<div class="form"> 
  <a href="../replace.jsp" class="button">Replace</a> 
  <a href="../remove.jsp" class="button">Remove</a> 
  <a href="../index.jsp" class="button">Cancel</a> 
</div> 
<br/>
</body>
</html>