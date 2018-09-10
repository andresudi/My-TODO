$(function() {

	$("#username_error_message").hide();
	$("#password_error_message").hide();
	$("#email_error_message").hide();

	var error_username = false;
	var error_password = false;
	var error_email = false;

	$("#name").focusout(function() {

		check_username();
		
	});

	$("#password").focusout(function() {

		check_password();
		
	});

	$("#email").focusout(function() {

		check_email();
		
	});

	function check_username() {
	
		var username_length = $("#name").val().length;
		
		if(username_length < 5 || username_length > 20) {
			$("#username_error_message").html("Should be between 5-20 characters");
			$("#username_error_message").show();
			error_username = true;
		} else {
			$("#username_error_message").hide();
		}
	
	}

	function check_password() {
	
		var password_length = $("#password").val().length;
		
		if(password_length < 6) {
			$("#password_error_message").html("Password at least 6 characters");
			$("#password_error_message").show();
			error_password = true;
		} else {
			$("#password_error_message").hide();
		}
	
	}

	function check_email() {

		var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
	
		if(pattern.test($("#email").val())) {
			$("#email_error_message").hide();
		} else {
			$("#email_error_message").html("Invalid email address");
			$("#email_error_message").show();
			error_email = true;
		}
	}

	$("#registration_form").submit(function() {
											
		error_username = false;
		error_password = false;
		error_retype_password = false;
		error_email = false;
											
		check_username();
		check_password();
		check_retype_password();
		check_email();
		
		if(error_username == false && error_password == false && error_retype_password == false && error_email == false) {
			return true;
		} else {
			return false;	
		}

	});

});