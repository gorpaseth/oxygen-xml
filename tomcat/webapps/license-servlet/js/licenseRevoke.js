$(document).ready(function() {
	$(".ximage").click(function(e) {
		var parentCell = $(e.target).closest('.ximage');
		var name = parentCell.attr("data-name");
		var sessionID = parentCell.attr("data-session");
		
        var req = $.post( 
                window.location.href,
                { 
                	name: name,
                	sessionid: sessionID
                }
            );
            req.done(function(e) {
            	/* Remove the row until the refresh comes... */
            	parentCell.closest('tr').hide();
          	});
	});
});
