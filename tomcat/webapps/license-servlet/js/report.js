(function() {
	var button = document.querySelector('.show-allowed-users');

	// there are no allowed users configured.
	if (button) {
		button.addEventListener('click', function() {
			window.open('../allowed-users.html', 'blank_');
		});
	}
})(); 
