<%@ page import="java.net.URLDecoder" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.util.Locale" %>
<%@ page import="java.util.GregorianCalendar" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.lang.StringBuilder" %>
<%@ page import="ro.sync.db.Granularity" %>
<%@ page import="ro.sync.db.TimeInterval" %>
<%@ page import="ro.sync.db.TimeIntervalDescription" %>
<%@ page import="ro.sync.db.UsageData" %>
<%@ page import="ro.sync.db.BaseDBSupport" %>
<%@ page import="ro.sync.licenseservlet.BaseServletConstants" %>
<%@ page import="ro.sync.licenseservlet.LicenseInfo" %>
<%@ page import="ro.sync.licenseservlet.LicenseStore" %>
<% 
    final String UTF_8_ENCODING = "UTF-8";
    ServletContext servletContext = getServletContext();
    BaseDBSupport dbSupport = (BaseDBSupport) servletContext.getAttribute(BaseServletConstants.PARAM_DB_SUPPORT);
    int licenseKeyCount = (Integer) request.getAttribute(BaseServletConstants.PARAM_USAGE_LICENSE_KEY_COUNT);
    TimeInterval timeInterval = TimeInterval.getTimeInterval(request.getParameter(BaseServletConstants.PARAM_TIME_INTERVAL));
    try {
      timeInterval.setOffset(Integer.parseInt(request.getParameter(BaseServletConstants.PARAM_TIME_OFFSET)));
    } catch (NumberFormatException e) {
      // Neglect.
    }
    Granularity granularity = Granularity.getGranularity(request.getParameter(BaseServletConstants.PARAM_GRANULARITY));
    
    boolean isFloating = true;
    LicenseStore licenseStore = (LicenseStore) servletContext.getAttribute(BaseServletConstants.PARAM_LICENSE_STORE);
    LicenseInfo li = licenseStore.getLicenseInfo();
    if (li != null) {
	  isFloating = li.isFloating();
    }
    String serverName = "&lt;oXygen/> XML " + (isFloating ? "Floating " : "") + "License Server";
%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title><%= serverName %></title>
  <link rel="icon" type="image/png" href="../favicon.ico" />
  <link rel="stylesheet" type="text/css" href="../css/index.css" />
  <link rel="stylesheet" type="text/css" href="../css/jquery.bxslider.css" />
  <link rel="stylesheet" type="text/css" href="../css/custom.css" />
  <script type="text/javascript" src="../js/jquery-3.5.1.min.js"></script>
  <script type="text/javascript" src="../js/Chart.min.js"></script>
  <script type="text/javascript" src="../js/jquery.bxslider.min.js"></script>
</head>
<body>
<%
    // The usage report part.
    String dateString = "";
    
    Calendar c = new GregorianCalendar();
    c.setTimeInMillis(System.currentTimeMillis());
    response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
    response.setHeader("Pragma", "no-cache"); //HTTP 1.0
    response.setDateHeader("Expires", 0); //prevents caching at the proxy server

    boolean isForMonth = true;
    int monthOffset = 0;
    String dayOrHour = "daily";
    if (timeInterval == TimeInterval.DAY && isFloating) {
      c.set(Calendar.DAY_OF_MONTH, c.get(Calendar.DAY_OF_MONTH) + timeInterval.getOffset());
      dateString = c.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.ENGLISH) +
          " " + c.get(Calendar.DAY_OF_MONTH) + ", " + c.get(Calendar.YEAR);
      isForMonth = false;
      dayOrHour = "hourly";
      if (request.getParameter(BaseServletConstants.PARAM_MONTH_OFFSET) != null) {
        monthOffset = Integer.parseInt(request.getParameter(BaseServletConstants.PARAM_MONTH_OFFSET));  
      }
    } else {
      c.set(Calendar.MONTH, c.get(Calendar.MONTH) + timeInterval.getOffset());
      dateString = c.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.ENGLISH) +
          " " + c.get(Calendar.YEAR);
      if (request.getParameter(BaseServletConstants.PARAM_TIME_OFFSET) != null) {
        monthOffset = Integer.parseInt(request.getParameter(BaseServletConstants.PARAM_TIME_OFFSET));  
      }
    }
%>
    <h1 class="mainTitle"><%= serverName %> Usage Statistics<br/><%= dateString %></h1>
    <p><a href="../index.jsp" class="link">&lt; Back to main page</a></p>
    <p class="licenseKeyCount">Maximum number of <% if (isFloating) { %>concurrent <% } %>licenses = <%= licenseKeyCount %></p>
    <p>The following chart shows the peak number of licenses that were consumed
    and the total number of users that were rejected, on a <%= dayOrHour %> basis.</p>
    <p>The maximum number of consumed licenses are shown in <span class="green">green</span>,
    while the total number of rejected users are shown in <span class="red">red</span>.
    The <span class="blue">blue</span> line corresponds to the maximum number of concurrent licenses available on the server.</p>
    <p>This chart can be used to detect the amount of concurrent licenses that are needed to avoid having rejected users.</p>
    <div class="timeContainerDiv">
      <ul class="timeContainer"></ul>
<% if (!isForMonth) { %>
      <a id="back2Month">Back to month view</a>
<% } %>      
    </div>
    <div class="bigContainer">
      <div id="usage-legend" class="chart-legend"></div>
      <div style="clear:both"></div>
	    <div class="chartContainer">
	      <div class="nodata">No data for this <%= timeInterval.getValue() %></div>
	      <canvas id="usage-graph" class="usage-graph"></canvas>
	    </div>
    </div>
<% if (isForMonth && isFloating) { %>
    <p>Click on a bar to see how the license consumption evolved every hour for that particular day.</p>
    <div class="emptyStuff"></div>
    <p>The following chart shows the peak number of licenses that were consumed per hour throughout the month.</p>
    <p>This is useful for identifying the time of day when the most licenses were consumed.</p>
    <div class="bigContainer" id="peakContainer">
      <div id="peak-legend" class="chart-legend"></div>
      <div style="clear:both"></div>
	    <div class="chartContainer">
	      <div class="nodata">No data for this <%= timeInterval.getValue() %></div>
	      <canvas id="peak-graph" class="peak-graph"></canvas>
	    </div>
    </div>
<%  }
    if (dbSupport != null) {
      try {
        UsageData[] usageGraph = dbSupport.getUsageGraph(timeInterval, granularity);
        UsageData[] rejectionGraph = dbSupport.getRejectionGraph(timeInterval, granularity);
        
        UsageData[][] peakUsageGraph = null;
        if (isForMonth && isFloating) {
          peakUsageGraph = dbSupport.getMonthlyHourPeakUsageGraph(timeInterval);
        }
%>
        <script type="text/javascript">
        
        $(document).ready(function() {
        
        var valuesReject = [], valuesUsage = [], labels = [];
<%      if (isForMonth && isFloating) { %>        
        var valuesPeakUsage = [], valuesPeakRejection = [], peakLabels = [];
<%      }
        int maxUsage = 0;
        for (int i = 0; i < usageGraph.length; i++) {
          UsageData usageData = usageGraph[i];
          UsageData rejectData = rejectionGraph[i];
          maxUsage = Math.max(maxUsage, (int)(usageGraph[i].getData() + rejectionGraph[i].getData()));
%>
          valuesUsage.push(<%= usageData.getData() %>);
          valuesReject.push(<%= rejectData.getData() %>);
          labels.push('<%= usageData.getDescription() %>');
<%          
        }
%>        
        var availableLicensesLine =
            Array.apply(null, Array(valuesUsage.length)).map(function(){return <%= licenseKeyCount %> });
<%        
        if (isForMonth && isFloating) {
          for (int i = 0; i < peakUsageGraph.length; i++) {
%>          valuesPeakUsage.push(<%= peakUsageGraph[i][0].getData() %>);
            peakLabels.push('<%= peakUsageGraph[i][0].getDescription() %>');
            valuesPeakRejection.push(<%= peakUsageGraph[i][1].getData() %>);
<%        }
%>          
          var dayOffsets = [];
<%        
          int[] dayOffsets = dbSupport.getDayOffsetsForMonth(timeInterval);
          for (int i = 0; i < dayOffsets.length; i++) {
%>          dayOffsets.push(<%= dayOffsets[i] %>);
<%        }
        }
%>
        var consumedLicenses = '';
        var rejectedUsers = '';
<%      if (isForMonth) { %>
          consumedLicenses = "Consumed licenses (maximum per day)";
          rejectedUsers = "Rejected users (total per day)";
<%      } else { %>
          consumedLicenses = "Consumed licenses (total per hour)";
          rejectedUsers = "Rejected users (total per hour)";
<%      } %>
        var data = {
            labels: labels, 
            datasets: [ 
                {
                    type: 'line',
                    label: 'Line Component',
                    data: availableLicensesLine,
                    borderColor: '#65A5DA',
                    backgroundColor: "transparent",
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    pointHitRadius: 0,
                },
                { 
                    label: consumedLicenses,
                    backgroundColor: "#52803d",
                    hoverBackgroundColor: "#3a6a23",
                    borderColor: "#52803d", 
                    data: valuesUsage, 
                },
                { 
                    label: rejectedUsers,
                    backgroundColor: "#CC0000",
                    hoverBackgroundColor: "#A70000",
                    borderColor: "#CC0000", 
                    data: valuesReject, 
                },
            ] 
        };
<%    if (isForMonth && isFloating) { %>
        var peakData = {
            labels: peakLabels, 
            datasets: [ 
                {
                    type: 'line',
                    label: 'Line Component',
                    data: availableLicensesLine,
                    borderColor: '#65A5DA',
                    backgroundColor: "transparent",
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    pointHitRadius: 0,
                },
                { 
                    label: "Consumed licenses (maximum per hour)",
                    backgroundColor: "#52803d",
                    hoverBackgroundColor: "#3a6a23",
                    borderColor: "#52803d", 
                    data: valuesPeakUsage, 
                },
                { 
                    label: "Rejected users (maximum per hour)",
                    backgroundColor: "#CC0000",
                    hoverBackgroundColor: "#A70000",
                    borderColor: "#CC0000", 
                    data: valuesPeakRejection, 
                },
            ] 
        };
<%    }
	int maxTicksLimit = Math.min(10, licenseKeyCount);
	int fixedStepSize = (int) Math.max(1, Math.ceil(((float) licenseKeyCount) / maxTicksLimit));
	double x = Math.max(maxUsage, licenseKeyCount);
	maxTicksLimit = (int) Math.min(10, x);
	// Step size should be rounded up, always int.
	fixedStepSize = (int) Math.ceil(((double) x / maxTicksLimit));
	int max = Math.max((int) (fixedStepSize * maxTicksLimit), maxUsage);
	
	if (maxTicksLimit == 10) {
	  // Chart may have less than 10 ticks.
	  int updatedMaxTicks = (int) Math.ceil((double) maxUsage / fixedStepSize);
	  int newMax = updatedMaxTicks * fixedStepSize;
	  maxTicksLimit = updatedMaxTicks;
	  max = newMax;
	}
%>      
        window.legendToggle = function (e, datasetIndex, isUsage) {
            var index = datasetIndex;
            // Use "usage" or "peak" charts.
            var ci = isUsage ? e.view.usageChart : e.view.peakChart;
            var meta = ci.getDatasetMeta(index);
            if ( index == 1 ) {
            	// When having usage data hidden, also hide the "line".
            	var lineMeta = ci.getDatasetMeta(0);
            	lineMeta.hidden = lineMeta.hidden === null? !ci.data.datasets[0].hidden : null;
            }
            
            // Hide/show the specified data set.
            meta.hidden = meta.hidden === null? !ci.data.datasets[index].hidden : null;
            
            if (!!meta.hidden) {
            	$(e.target).closest('.legendItemMax').find('input[type=checkbox]').removeAttr('checked');
            } else {
	            $(e.target).closest('.legendItemMax').find('input[type=checkbox]').prop('checked', true);
            }

            // We toggled a dataset. Rerender the chart
            ci.update();
        };
        
        var commonOptions = {
        		title: {
              display: true,
              fontSize: 20,
              fontColor: "#337AB7",
            },
        		legend: {
        			// Hide the "original" legend.
              display: false
            },
            scales: {
                xAxes:[{
                	// Present the data stacked.
                	stacked:true,
                	// No gridlines vertically.
                	gridLines: { display: false }
                }], 
                yAxes:[{ 
                  scaleLabel: {
                    display: true,
                    labelString: 'License consumption'
                  },
                  // Present the data stacked.
                  stacked:true,
                  // Customize ticks min, max and step size.
                  ticks: {
                	  beginAtZero: true,
                	  min: 0,
                    max: <%= max %>,
                    fixedStepSize: Math.ceil(<%= fixedStepSize %>)
                  }
                }] 
              }
        };
        var usageOptions = {
        		title: {
        			text: 'Concurrent license consumption per <%= granularity.getValue() %>'
        		},
            legendCallback: function (chart) {
              var text = [];
              for (var i = 1; i < chart.data.datasets.length; i++) {
                text.push('<div class="legendItemMax" data-datasetIndex="' 
                    + chart.legend.legendItems[i].datasetIndex + 
                    '" onclick="legendToggle(event, ' + chart.legend.legendItems[i].datasetIndex + ', true)">');
                
                text.push('<input style="vertical-align: middle" type="checkbox" id="' + chart.data.datasets[i].label.replace(/\s+/g, '') + '" checked/>');  
                text.push('<div class="legendColor" style="background-color:' + chart.data.datasets[i].backgroundColor + '"></div>');
                text.push("<div class='legendLabel' style='display:inline-block'>" + chart.data.datasets[i].label + "</div>");
                text.push("</div>");
              }
              return text.join("");
            },
<%      if (isForMonth && isFloating) { %>
            hover: {
            	onHover: function (e) {
            		if (e[0]) {
            			$("#usage-graph").css("cursor", "pointer");
            		} else {
            			$("#usage-graph").css("cursor", "default");
            		}
            	}
            }
<%      }%>
        };
<%    if (isForMonth && isFloating) { %>        
        var peakOptions = {
            title: {
              text: 'Concurrent license consumption per hour'
            },
            legendCallback: function (chart) {
              var text = [];
              for (var i = 1; i < chart.data.datasets.length; i++) {
                text.push('<div class="legendItemMax" data-datasetIndex="' 
                    + chart.legend.legendItems[i].datasetIndex + 
                    '" onclick="legendToggle(event, ' + chart.legend.legendItems[i].datasetIndex + ', false)">');
                
                text.push('<input style="vertical-align: middle" type="checkbox" id="' + chart.data.datasets[i].label.replace(/\s+/g, '') + '" checked/>');  
                text.push('<div class="legendColor" style="background-color:' + chart.data.datasets[i].backgroundColor + '"></div>');
                text.push("<div class='legendLabel' style='display:inline-block'>" + chart.data.datasets[i].label + "</div>");
                text.push("</div>");
              }
              return text.join("");
            }
        };
<%    } %>  
        if (<%= maxUsage %> == 0) {
        	var noDataWarning = $('.nodata');
        	if (noDataWarning) {
        		noDataWarning.css('display', 'block');
        		var sideOffset = - noDataWarning.width() / 2;
        		noDataWarning.css('margin-left',  sideOffset + 'px');
        		sideOffset = - noDataWarning.height() / 2;
        		noDataWarning.css('margin-top',  sideOffset + 'px');
        	}
        }
        
        var extendedOptions = {};
        // Join the common options with the "usage" ones.
        extendedOptions =	$.extend(true, extendedOptions, commonOptions, usageOptions);
        
        var chartElement=document.getElementById('usage-graph');
        // Create the usage chart.
        window.usageChart = new Chart(chartElement, { type:'bar', data: data, options: extendedOptions });
        usageChart.store = new Array();
        // Replace the original legend with the one generated by us.
        document.getElementById('usage-legend').innerHTML = usageChart.generateLegend();

<%    if (isForMonth && isFloating) { %>
        extendedOptions = {}; 
        // Join the common options with the "peak' ones.
        extendedOptions = $.extend(true, extendedOptions, commonOptions, peakOptions);
        
        var chartPeakElement=document.getElementById('peak-graph');
        // Create the peak chart.
        window.peakChart = new Chart(chartPeakElement, { type:'bar', data: peakData, options: extendedOptions });
        peakChart.store = new Array();
        // Replace the original legend with the one generated by us.
        document.getElementById('peak-legend').innerHTML = peakChart.generateLegend();
<%    } %>
        var generateUrl = function (
        		timeIntervalParam, timeIntervalValue, 
        		timeOffsetParam,   timeOffsetValue, 
        		granularityParam,  granularityValue,
        		monthOffsetParam,  monthOffsetValue) {
        	
          var theURI = window.location.origin + window.location.pathname
                    + "?" + timeIntervalParam + "=" + timeIntervalValue
                    + "&" + timeOffsetParam + "=" + timeOffsetValue
                    + "&" + granularityParam + "=" + granularityValue;
        	
          if (monthOffsetParam && monthOffsetValue) {
        	  theURI += "&" + monthOffsetParam + "=" + monthOffsetValue;
          }
          
        	return theURI;
        }
<%      
      if (isFloating) {
        if (isForMonth) {
%>        // Click on chart Bar.
          chartElement.addEventListener("click", function(e) {
        	  var activeElement = usageChart.getElementAtEvent(e);
            if (activeElement && activeElement[0]) {
            	var usageByHourUrl = 
                generateUrl(
                   "<%= BaseServletConstants.PARAM_TIME_INTERVAL %>", "<%= TimeInterval.DAY.getValue() %>",
                   "<%= BaseServletConstants.PARAM_TIME_OFFSET %>",   dayOffsets[activeElement[0]._index],
                   "<%= BaseServletConstants.PARAM_GRANULARITY %>",   "<%= Granularity.HOUR.getValue() %>",
                   "<%= BaseServletConstants.PARAM_MONTH_OFFSET %>",  <%= timeInterval.getOffset() %>
                   );
              var xmlHttp = new XMLHttpRequest(); 
                 xmlHttp.onreadystatechange = function() {
                   if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                     window.location = usageByHourUrl;
                   }
                 } 
                 xmlHttp.open("GET", usageByHourUrl, true); 
                 xmlHttp.send(null); 
            }
          });
<%
        } else {
%>          var back2MonthUrl = generateUrl(
                 "<%= BaseServletConstants.PARAM_TIME_INTERVAL %>", "<%= TimeInterval.MONTH.getValue() %>",
                 "<%= BaseServletConstants.PARAM_TIME_OFFSET %>",   <%= monthOffset %>,
                 "<%= BaseServletConstants.PARAM_GRANULARITY %>",   "<%= Granularity.DAY.getValue() %>"
                 );
            $('#back2Month').attr('href', back2MonthUrl);
<%      }
      }
%>
        
        var timeContainer = document.querySelector('.timeContainer');
        var timeObj = {}, timeActivity = [];
<%
        TimeInterval monthInterval = timeInterval;
        monthInterval = TimeInterval.MONTH;
        monthInterval.setOffset(monthOffset);
        
        TimeIntervalDescription[] timeActivity = isForMonth ? dbSupport.getAllMonthsOfActivity()
                                                            : dbSupport.getAllDaysForMonth(monthInterval);

        for (int i = 0; i < timeActivity.length; i++) {
          if (timeActivity[i].getOffset() > 0) {
            // We are in positive range... This means we cannot predict future...
            break;
          }
%>
          timeObj.description="<%= timeActivity[i].getLabel() %>";
          timeObj.offset="<%= timeActivity[i].getOffset() %>";
          timeActivity.push(timeObj);
          
          timeContainer.innerHTML +=
            "<li data-offset='" + timeObj.offset + "' class='sliderItem'>" + timeObj.description + "</li>";
<%        
        }
%>
        // Need to get the current month offset.
        var currentSlide = $('.sliderItem[data-offset=<%= timeInterval.getOffset() %>]').addClass('activeSlide');
        
        var slidesPerPage = 9;
        var mySlider = $('.timeContainer').bxSlider(
        		{
        			infiniteLoop: false,
        			hideControlOnEnd: true,
        			minSlides: slidesPerPage,
        			maxSlides: slidesPerPage,
        			slideWidth: 80,
        			slideMargin: 5,
        			/* slideSelector: '.sliderItem', */
        			startSlide: Math.floor( ($('.sliderItem').index(currentSlide) )/slidesPerPage),
        			pager: false,
        		}
        );
       
     <% if (isFloating) { %>   
        
        // Click on List item.
        $('.sliderItem').click(function() {
            if ($(this).attr('data-offset') && 
            		$(this).attr('data-offset') != <%= timeInterval.getOffset() %>) {
            	
            	var xmlHttp = new XMLHttpRequest();
            	var onClickDestination = generateUrl(
                        "<%= BaseServletConstants.PARAM_TIME_INTERVAL %>",
                        "<%= isForMonth ? TimeInterval.MONTH.getValue() : TimeInterval.DAY.getValue() %>",
                        "<%= BaseServletConstants.PARAM_TIME_OFFSET %>",
                        $(this).attr('data-offset'),
                        "<%= BaseServletConstants.PARAM_GRANULARITY %>",
                        "<%= isForMonth ? Granularity.DAY.getValue() : Granularity.HOUR.getValue() %>",
                        "<%= BaseServletConstants.PARAM_MONTH_OFFSET %>",
                        <%= monthOffset %>);
            	
            	xmlHttp.onreadystatechange = function() {
            		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            			window.location = onClickDestination;
            		}
            	}
            	xmlHttp.open("GET", onClickDestination, true);
            	xmlHttp.send(null);
            }                  
        });
    <% } %>
      });
      </script>
<%
      } catch (SQLException e) {
        e.printStackTrace();
      }
    } else {
      // Error handling the DB !!!
    }
%>
</body>
</html>