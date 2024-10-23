<%@ page import="java.util.Date" %>
<%@ page import="ro.sync.licenseservlet.BaseServletConstants" %>
<%@ page import="ro.sync.licenseservlet.DateFormats" %>
<%@ page import="ro.sync.licenseservlet.LicenseInfo" %>
<%@ page import="ro.sync.licenseservlet.polling.LicensePollingResult" %>

<div id="subscription-status">
<%
 String refreshTimeout = (String) request.getAttribute("Refresh");
 if (refreshTimeout != null) {
   response.setHeader("Refresh", refreshTimeout);
 }
 LicenseInfo licenseInfo = (LicenseInfo) request.getAttribute(BaseServletConstants.JSP_LICENSE_INFORMATION);
 LicensePollingResult result = (LicensePollingResult) request.getAttribute("pollingResult");
 Date lastUpdated = (Date) request.getAttribute("lastUpdated");
 Boolean autoCheck = (Boolean) request.getAttribute("autocheck");

 if (licenseInfo.isSubscription()) {
%>
<h2>Subscription Status</h2>

<%
   if (Boolean.TRUE.equals(autoCheck) && result != null) {
     if (result.isPending()) {
%>
<div>Checking for subscription renewal...</div>
<%
     } else if (!result.isSuccessful()) {
%>
  <div class="fail">Failed to check for subscription renewal, because: "<%= result.getMessage() %>".</div>
<%
     } else {
%>
<div class="success">Your subscription ends on <%= DateFormats.CDF.format(licenseInfo.getSubscriptionExpirationDate()) %>.</div>
<div class="success">Your subscription key was updated on server at <%= DateFormats.PDF.format(lastUpdated) %>.</div>
<%
     }
     if (!result.isPending()) {
%> 
  <form action="license-polling" method="post"> 
    <span class="status-message">Last check was done at <%= DateFormats.PDF.format(result.getDate()) %>.</span> 
    <button id="check-again" class="refresh-button" name="action" value="force-check">Check again</button>
  </form>
<%
     }
   } else {
%>
  <div>Your subscription ends on <%= DateFormats.CDF.format(licenseInfo.getSubscriptionExpirationDate()) %>.</div>
<%
   }
%>
 <%-- Form used to opt-out automatic license checking. --%>
 <noscript>
   <form action="license-polling" method="post">Automatic checking for subscription renewal 
      <%= autoCheck ? "enabled" : "disabled" %>.
      <button class="refresh-button" name="action" value="toggle-auto-check"><%= autoCheck ? "Disable" : "Enable" %></button>
   </form>
 </noscript>
 <label class="script-only auto-check-box">
    <input id="autocheck" type="checkbox" <%= autoCheck ? "checked" : "" %>>Automatically check for subscription renewal.
 </label>
<% } %>
</div>