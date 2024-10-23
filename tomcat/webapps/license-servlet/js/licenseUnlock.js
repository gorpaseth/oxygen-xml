$(document).ready(function() {
	$(".locked").click(function(e) {
		var parentCell = $(e.target).closest('.locked');
		var sessionID = parentCell.attr("data-session");
		
        var req = $.post( 
                window.location.href,
                { sessionid: sessionID }
            );
            req.done(function(e) {
            	/* Remove the "unlock" until the refresh comes... */
            	parentCell.find('.lock').hide();
            	parentCell.find('.unlock').hide();
          	});
	});
});
