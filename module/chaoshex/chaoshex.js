// Chaoshex template
var chaoshex_template;
var chaoshex_template_loaded = false;

var chaoshex_text_callback_mode = 'login';

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
	// Enter Button
	$('#chaoshex_enter_btn').click(function(){ chaoshex_enter_btn_pressed(); });

	// Login Menu options...
	$('#chaoshex_login_btn').click(function(){ chaoshex_login_btn_pressed(); });

	// Top Menu options...
	$('#chaoshex_cast_btn').click(function(){ chaoshex_cast_btn_pressed(); });
	$('#chaoshex_scry_btn').click(function(){ chaoshex_scry_btn_pressed(); });
	$('#chaoshex_summon_btn').click(function(){ chaoshex_summon_btn_pressed(); });
	$('#chaoshex_cls_btn').click(function(){ chaoshex_cls_btn_pressed(); });
	$('#chaoshex_logout_btn').click(function(){ chaoshex_logout_btn_pressed(); });

	// Cast Menu options...
	$('#chaoshex_cast_cancel_btn').click(function(){ chaoshex_cast_cancel_btn_pressed(); });
	$('#chaoshex_cast_cls_btn').click(function(){ chaoshex_cls_btn_pressed(); });

	// Scry Menu options...
	$('#chaoshex_scry_cancel_btn').click(function(){ chaoshex_scry_cancel_btn_pressed(); });
	$('#chaoshex_scry_cls_btn').click(function(){ chaoshex_cls_btn_pressed(); });

	// Summon Menu options...
	$('#chaoshex_summon_cancel_btn').click(function(){ chaoshex_summon_cancel_btn_pressed(); });
	$('#chaoshex_summon_cls_btn').click(function(){ chaoshex_cls_btn_pressed(); });
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
function chaoshex_enter_btn_pressed() {
	let typed_msg = $("#chaoshex_text_input").val();
	chaoshex_terminal_print("-]&gt;|&lt;[- : "+typed_msg);
	$("#chaoshex_text_input").val("");

	switch(chaoshex_text_callback_mode) {
		case "login":
			if(typed_msg == 'login') {
				chaoshex_login_action();
				return true;
			}
			break;
		case "menu1":
			switch(typed_msg) {
				case 'logout':
					chaoshex_logout_action();
					return true;
					break;
				case 'cls':
					chaoshex_cls_action();
					return true;
					break;
				case 'cast':
					chaoshex_cast_action();
					return true;
					break;
				default:
					break;
			}
			break;
		case "cast":
			switch(typed_msg) {
				case 'cancel':
					chaoshex_cast_cancel_action();
					return true;
					break;
				case 'cls':
					chaoshex_cls_action();
					return true;
					break;
				case 'octarine':
					chaoshex_octarine_action();
					return true;
					break;
				case 'psyche':
					chaoshex_psyche_action();
					return true;
					break;
				case 'ego':
					chaoshex_ego_action();
					return true;
					break;
				case 'play':
					chaoshex_play_action();
					return true;
					break;
				case 'work':
					chaoshex_work_action();
					return true;
					break;
				case 'death':
					chaoshex_death_action();
					return true;
					break;
				case 'sex':
					chaoshex_sex_action();
					return true;
					break;
				case 'war':
					chaoshex_war_action();
					return true;
					break;
				case 'love':
					chaoshex_love_action();
					return true;
					break;
				default:
					break;
			}
			break;
		case "octarine":
			switch(typed_msg) {
				case 'cancel':
					chaoshex_cast_cancel_action();
					return true;
					break;
				case 'cls':
					chaoshex_cls_action();
					return true;
					break;
				default:
					chaoshex_octarine_spell(typed_msg);
					return true;
					break;
			}
			break;
		defaut:
			chaoshex_void_mode_error();
			return false;
			break;
	}
	chaoshex_unknown_cmd();
	return false;
}

function chaoshex_login_btn_pressed() {
	$("#chaoshex_text_input").val("login");
	chaoshex_enter_btn_pressed();
}

function chaoshex_login_action() {
	console.log("log in function reached.");
	//chaoshex_terminal_print("-]&gt;|&lt;[- : login anon23");
	chaoshex_terminal_print("Connecting to ChaosHex as anon23");
	setTimeout(function () {
		chaoshex_terminal_print("∘{𝒵}~ ⍼ ");
	}, 300);
	setTimeout(function () {
		chaoshex_terminal_type("-");
	}, 800);
	setTimeout(function () {
		chaoshex_terminal_type("[");
	}, 900);
	setTimeout(function () {
		chaoshex_terminal_type(">");
	}, 1000);
	setTimeout(function () {
		chaoshex_terminal_type("|");
	}, 1100);
	setTimeout(function () {
		chaoshex_terminal_type("<");
	}, 1200);
	setTimeout(function () {
		chaoshex_terminal_type("]");
	}, 1300);
	setTimeout(function () {
		chaoshex_terminal_type("-");
	}, 1400);
	setTimeout(function () {
		chaoshex_terminal_print("Hivemind Connection Successfull");
		chaoshex_terminal_print("Welcome anon23 to the ChaosHex Hivemind");
		chaoshex_text_callback_mode = 'menu1';
		chaoshex_btn_display(chaoshex_text_callback_mode);
		chaoshex_terminal_print("Please select a command...");
		chaoshex_terminal_print("");
	}, 1500);
}

function chaoshex_logout_btn_pressed() {
	$("#chaoshex_text_input").val("logout");
	chaoshex_enter_btn_pressed();
}

function chaoshex_logout_action() {
	console.log("log in function reached.");
	chaoshex_terminal_print("Logging out of ChaosHex");
	chaoshex_terminal_print("Disconnecting from Hivemind");
	chaoshex_terminal_print("");
	setTimeout(function () {
		chaoshex_terminal_print("Logging out of ChaosHex");
	}, 500);
	setTimeout(function () {
		chaoshex_terminal_print("Disconnecting from Hivemind");
	}, 700);
	setTimeout(function () {
		chaoshex_terminal_print("Hivemind Disconnected");
		chaoshex_terminal_print("Log out Complete");
		chaoshex_terminal_print("");
		chaoshex_text_callback_mode = 'login';
		chaoshex_btn_display(chaoshex_text_callback_mode);
		chaoshex_terminal_print("");
	}, 1000);
}

function chaoshex_cls_btn_pressed() {
	$("#chaoshex_text_input").val("cls");
	chaoshex_enter_btn_pressed();
}

function chaoshex_cls_action() {
	console.log("cls function reached.");
	setTimeout(function () {
		$( ".chaoshex_cls" ).remove();
	}, 500);
}

// Cast btn and cast menu buttons...
function chaoshex_cast_btn_pressed() {
	$("#chaoshex_text_input").val("cast");
	chaoshex_enter_btn_pressed();
}

function chaoshex_cast_action() {
	console.log("cast function reached.");
	chaoshex_terminal_print("Cast a spell with ChaosHex");
	chaoshex_terminal_print("");
	setTimeout(function () {
		chaoshex_terminal_print("Select option: ");
		chaoshex_terminal_print("");
		chaoshex_text_callback_mode = 'cast';
		chaoshex_btn_display(chaoshex_text_callback_mode);
	}, 500);
}

function chaoshex_cancel_btn_pressed() {
	$("#chaoshex_text_input").val("cancel");
	chaoshex_enter_btn_pressed();
}

function chaoshex_cast_cancel_action() {
	console.log("cast cancel function reached.");
	chaoshex_terminal_print("Spell cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_text_callback_mode = 'menu1';
		chaoshex_btn_display(chaoshex_text_callback_mode);
	}, 500);
}

function chaoshex_octarine_btn_pressed() {
	$("#chaoshex_text_input").val("octarine");
	chaoshex_enter_btn_pressed();
}

function chaoshex_octarine_action() {
	console.log("cast octarine spell function reached.");
	chaoshex_terminal_print("Casting an Octarine spell");
	chaoshex_terminal_print("");
	setTimeout(function () {
		chaoshex_terminal_print("Octarine Spell Template: 'Magically Empower [X]'");
		chaoshex_terminal_print("Choose [X]: ");
		chaoshex_text_callback_mode = 'octarine';
		chaoshex_btn_display(chaoshex_text_callback_mode);
	}, 500);
}

function chaoshex_octarine_spell(target_x) {
	chaoshex_terminal_print("Magically Empower "+target_x);
}


function chaoshex_octarine_cancel_btn_pressed() {
	console.log("cast cancel function reached.");
	chaoshex_terminal_print("-]&gt;|&lt;[- : cancel");
	chaoshex_terminal_print("Spell cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_text_callback_mode = 'cast';
		chaoshex_btn_display(chaoshex_text_callback_mode);
	}, 500);
}

// Scry button and scry menu buttons
function chaoshex_scry_btn_pressed() {
	console.log("scry function reached.");
	chaoshex_terminal_print("-]&gt;|&lt;[- : scry");
	chaoshex_terminal_print("Divination with ChaosHex");
	chaoshex_terminal_print("");
	setTimeout(function () {
		chaoshex_terminal_print("Select option: ");
		chaoshex_terminal_print("");
		chaoshex_btn_display("scry");
		chaoshex_text_callback_mode = 'scry';
		chaoshex_btn_display(chaoshex_text_callback_mode);
	}, 500);
}

function chaoshex_scry_cancel_btn_pressed() {
	console.log("scry cancel function reached.");
	chaoshex_terminal_print("-]&gt;|&lt;[- : cancel");
	chaoshex_terminal_print("Divination cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_text_callback_mode = 'menu1';
		chaoshex_btn_display(chaoshex_text_callback_mode);
	}, 500);
}

// Summon button and summon menu buttons
function chaoshex_summon_btn_pressed() {
	console.log("cast function reached.");
	chaoshex_terminal_print("-]&gt;|&lt;[- : summon");
	chaoshex_terminal_print("Evoke entity with ChaosHex");
	chaoshex_terminal_print("");
	setTimeout(function () {
		chaoshex_terminal_print("Select option: ");
		chaoshex_terminal_print("");
		chaoshex_text_callback_mode = 'summon';
		chaoshex_btn_display(chaoshex_text_callback_mode);
	}, 500);
}

function chaoshex_summon_cancel_btn_pressed() {
	console.log("summon cancel function reached.");
	chaoshex_terminal_print("-]&gt;|&lt;[- : cancel");
	chaoshex_terminal_print("Evocation cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_text_callback_mode = 'menu1';
		chaoshex_btn_display(chaoshex_text_callback_mode);
	}, 500);
}

// Error functions
function chaoshex_unknown_cmd() {
	chaoshex_terminal_print("Unrecognised Request");
	chaoshex_terminal_print("");
}

function chaoshex_void_mode_error() {
	chaoshex_terminal_print("∘{𝒵}~ ERROR ⍼ ");
	setTimeout(function () {
		chaoshex_terminal_print("unstable state");
	}, 300);
	setTimeout(function () {
		chaoshex_terminal_type("⍼");
	}, 800);
	setTimeout(function () {
		chaoshex_terminal_type("𝒵");
	}, 900);
	setTimeout(function () {
		chaoshex_terminal_type("Z");
	}, 1000);
	setTimeout(function () {
		chaoshex_terminal_type("@");
	}, 1100);
	setTimeout(function () {
		chaoshex_terminal_type("🥨 ");
	}, 1200);
	setTimeout(function () {
		chaoshex_terminal_type("#");
	}, 1300);
	setTimeout(function () {
		chaoshex_terminal_type("*");
	}, 1400);
}

/* Terminal Handling Functions */
function chaoshex_terminal_type(html) {
	// Add str to terminal
	if(html == '') { html = "&nbsp;"}
	var line = `<span class="chaoshex_cls">${html}</span>`; 
console.log(line);
	$(".chaoshex_cls").last().append(line);
	$('#chaoshex_terminal').animate({
		scrollTop: $("#chaoshex_terminal").prop("scrollHeight")
	}, 200);
}
function chaoshex_terminal_print(html) {
	// Add str to terminal
	if(html == '') { html = "&nbsp;"}
	var line = `<p class="chaoshex_cls">${html}</p>`; 
console.log(line);
	$(line).insertBefore("#chaoshex_prompt");
	$('#chaoshex_terminal').animate({
		scrollTop: $("#chaoshex_terminal").prop("scrollHeight")
	}, 200);
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
