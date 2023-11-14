// Chaoshex template
var chaoshex_template;
var chaoshex_template_loaded = false;

/* A content module for a web based version of the ChaosHex software */

/* BlackPress Module Standard Functions */
function chaoshex_menuitem(args) {
	return "javascript:chaoshex_load('');";
}
function chaoshex_load(args) {
	if(!chaoshex_template_loaded) {
		// Try to call enigmagick again in 1/10 of a second.
		setTimeout(function () {
			chaoshex_load(args);
		}, 100);
		return null;
	}
	chaoshex_display();
	pushStateWithoutDuplicate('ChaosHex3', './?p=chaoshex/');
}

function chaoshex_display(content) {
	var content = chaoshex_template;

	$('#contentArea').html(content);

	// Now add click methods to the buttons.
	$('#chaoshex_login_btn').click(function(){ chaoshex_login_btn_pressed(); });
	$('#chaoshex_cast_btn').click(function(){ chaoshex_cast_btn_pressed(); });
	$('#chaoshex_scry_btn').click(function(){ chaoshex_scry_btn_pressed(); });
	$('#chaoshex_summon_btn').click(function(){ chaoshex_summon_btn_pressed(); });
	$('#chaoshex_logout_btn').click(function(){ chaoshex_logout_btn_pressed(); });
}

function chaoshex_permlink(permlink) {
	permlink = permlink.join("/");
	chaoshex_load(permlink);
}

/* Button Mode Functions */
function chaoshex_btn_display(mode) {
	console.log("chaoshex_btn_display("+mode+")");
	$("#chaoshex_context_buttons input").hide();
	$(".chaoshex_btn_"+mode).show();
}

/* Button Press Functions */
function chaoshex_login_btn_pressed() {
	console.log("log in function reached.");
	chaoshex_terminal_print("-]&gt;|&lt;[- : login anon23");
	chaoshex_terminal_print("Logging in to ChaosHex as anon23");
	chaoshex_terminal_print("");
	setTimeout(function () {
		chaoshex_terminal_print("Log In Successfull");
		chaoshex_terminal_print("Welcome anon23 to the ChaosHex server");
		chaoshex_btn_display("menu1");
		chaoshex_terminal_print("Please select a command...");
		chaoshex_terminal_print("");
	}, 500);
}

function chaoshex_logout_btn_pressed() {
	console.log("log in function reached.");
	chaoshex_terminal_print("-]&gt;|&lt;[- : logout");
	chaoshex_terminal_print("Logging out of ChaosHex");
	chaoshex_terminal_print("");
	setTimeout(function () {
		chaoshex_terminal_print("Log Out Successfull");
		chaoshex_terminal_print("");
		chaoshex_btn_display("login");
		chaoshex_terminal_print("");
		chaoshex_terminal_print("");
	}, 500);
}


/* Terminal Handling Functions */
function chaoshex_terminal_print(html) {
	// Add str to terminal
	if(html == '') { html = "&nbsp;"}
	var line = `<p>${html}</p>`; 
console.log(line);
	$(line).insertBefore("#chaoshex_prompt");
}

//Template loaded functions
function chaoshexTemplateLoaded(template) {
	chaoshex_template = template;
	chaoshex_template_loaded = true;
	console.log( "chaoshex template load was performed." );
}
//Load the templates
function loadChaosHexTemplate() {
	// Get template from theme
	var theme_template = "./theme/"+config.theme+"/chaoshex.html";
	$.ajax(theme_template).done(chaoshexTemplateLoaded).fail(function(){
		// Else use default template
		$.ajax("./module/chaoshex/chaoshex.html").done(chaoshexTemplateLoaded);
	});
}
loadChaosHexTemplate();
