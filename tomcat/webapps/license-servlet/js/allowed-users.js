(function() {

	/**
	 * Class handling the display for the allowed users configuration.
	 *
	 * @constructor
	 */
	var ShowUsersHandler = function() { };

	/**
	 * Load the allowed users configuration.
	 */
	ShowUsersHandler.prototype.loadConfiguration = function() {
		var request = new XMLHttpRequest();
		request.addEventListener("load", function() {
			var config = JSON.parse(request.response);
			var messageContainer = document.getElementById('message');
			
			if(config.loadingException) {
				this.renderErrorMessage(config.loadingException);
			} else if (config.isAccessRestricted) {
				this.renderRestrictedMessage(messageContainer, config.filePath);
				// render the users.
				this.renderUsers(config.users);
			} else {
				this.renderUnrestrictedMessage(messageContainer, config.filePath);
			}
		}.bind(this));
		request.open("GET", "allowed-users");
		request.setRequestHeader('Accept', 'application/json');

		request.send();
	};

	/**
	 * Render the users loading error message.
	 *
	 * @param messageContainer the message container.
	 * @param errorMessage the error message
	 */
	ShowUsersHandler.prototype.renderErrorMessage = function(errorMessage) {
		var errorElement = document.createElement('div');
		errorElement.classList.add('loadingError');
		errorElement.innerText = errorMessage;

		this.errorElement = errorElement;

		document.body.appendChild(errorElement);
	};

	/**
	 * Render the message when the user access is restricted.
	 *
	 * @param messageContainer the message container.
	 * @param filePath the config file path.
	 */
	ShowUsersHandler.prototype.renderRestrictedMessage = function(messageContainer, filePath) {
		messageContainer.innerHTML = 'Allowed users to request licenses configured in file: <em>' +
			filePath + '</em>';
	};

	/**
	 * Render the message informing the admin how to configure an allowed users list.
	 *
	 * @param messageContainer the message container.
	 * @param filePath the config file path.
	 */
	ShowUsersHandler.prototype.renderUnrestrictedMessage = function(messageContainer, filePath) {
		messageContainer.innerHTML = 'You can provide a list of users who are allowed to request licenses. Create a file named "allowed-users.txt" and enter each user name on a separate line. Then save it to: <em>' + 
			filePath + '</em>'
	};

	/**
	 * Render the users table.
	 *
	 * @param users the array of users.
	 */
	ShowUsersHandler.prototype.renderUsers = function(users) {
		var table = document.createElement('table');
		table.classList.add('info');
		this.table = table;

		var tableBody = document.createElement('tbody');

		var userRow;
		for (var i = 0; i < users.length; i++) {
			userRow = document.createElement('tr');
			var userCell = document.createElement('td');
			userCell.innerText = users[i];
			userRow.appendChild(userCell);

			tableBody.appendChild(userRow);
		}
		table.appendChild(tableBody);

		document.body.appendChild(table);
	};

	/**
	 * Reloads the users from the config file.
	 */
	ShowUsersHandler.prototype.reloadUsers = function() {
		// clear previous state.
		if(this.table) {
			this.table.parentNode.removeChild(this.table);
			this.table = null;
		}
		if(this.errorElement) {
			this.errorElement.parentNode.removeChild(this.errorElement);
			this.errorElement = null;
		}

		var request = new XMLHttpRequest();
		request.addEventListener("load", this.loadConfiguration.bind(this));
		request.open("POST", "allowed-users");
		request.setRequestHeader('Accept', 'application/json');

		request.send();
	};


	window.addEventListener('load', function() {
		var showHandler = new ShowUsersHandler();

		var reloadButton = document.getElementById('reload-allowed-users');
		reloadButton.addEventListener('click', function() {
			showHandler.reloadUsers();
		});

		showHandler.loadConfiguration();
	});
})(); 
