// Chaoshex template
var chaoshex_template;
var chaoshex_template_loaded = false;

var chaoshex_prompt = "-[&gt;|&lt;]- :";
var chaoshex_text_callback_mode = 'login';


// EnigMagick API integration 
var chaoshex_enigmagick_api_enabled = false;
var chaoshex_enigmagick_texts;
var chaoshex_enigmagick_ciphers;
var chaoshex_enigmagick_matches;

// Spell Settings
var chaoshex_spell_mode;
var chaoshex_spell_target_x;
var chaoshex_spell_target_y;
var chaoshex_statement_of_intent;
var chaoshex_statement_of_intent_value;
var chaoshex_statement_of_intent_matches;


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
	$('#chaoshex_cast_cancel_btn').click(function(){ chaoshex_cancel_btn_pressed(); });
	$('#chaoshex_cast_cls_btn').click(function(){ chaoshex_cls_btn_pressed(); });
	$('#chaoshex_cast_octarine_btn').click(function(){ chaoshex_octarine_btn_pressed(); });
	$('#chaoshex_cast_psyche_btn').click(function(){ chaoshex_psyche_btn_pressed(); });
	$('#chaoshex_cast_ego_btn').click(function(){ chaoshex_ego_btn_pressed(); });
	$('#chaoshex_cast_play_btn').click(function(){ chaoshex_play_btn_pressed(); });
	$('#chaoshex_cast_work_btn').click(function(){ chaoshex_work_btn_pressed(); });
	$('#chaoshex_cast_death_btn').click(function(){ chaoshex_death_btn_pressed(); });
	$('#chaoshex_cast_sex_btn').click(function(){ chaoshex_sex_btn_pressed(); });
	$('#chaoshex_cast_war_btn').click(function(){ chaoshex_war_btn_pressed(); });
	$('#chaoshex_cast_love_btn').click(function(){ chaoshex_love_btn_pressed(); });

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
	chaoshex_text_callback_mode = mode;
	$("#chaoshex_context_buttons input").hide();
	$(".chaoshex_btn_"+mode).show();
}

/* Button Press Functions */
function chaoshex_enter_btn_pressed() {
	let cmd = $("#chaoshex_text_input").val();
	chaoshex_terminal_print(chaoshex_prompt+" "+cmd);
	$("#chaoshex_text_input").val("");

	switch(cmd) {
		case "debug":
			chaoshex_terminal_print("cmd : "+cmd);
			chaoshex_terminal_print("chaoshex_text_callback_mode : "+chaoshex_text_callback_mode);
			return true;
			break;
		case "login":
			if(chaoshex_text_callback_mode == 'login') {
				chaoshex_login_action();
				return true;
			} else {
				chaoshex_cmd_not_available();
				return false;
			}
			break;
		case "logout":
			if(chaoshex_text_callback_mode != 'login') {
				chaoshex_logout_action();
				return true;
			} else {
				chaoshex_cmd_not_available();
				return false;
			}
			break;
		case "cls":
			chaoshex_cls_action();
			return true;
			break;
		case "cancel":
			switch(chaoshex_text_callback_mode) {
				case "cast":
				case "octarine":
				case "psyche":
				case "ego":
				case "play":
				case "work":
				case "death":
				case "sex":
				case "war":
				case "love":
					chaoshex_cast_cancel_action();
					return true;
					break;
				case "scry":
					chaoshex_scry_cancel_action();
					return true;
					break;
				case "summon":
					chaoshex_summon_cancel_action();
					return true;
					break;
				default:
					chaoshex_cmd_not_available();
					return false;
			}
			break;
		case "cast":
			if(chaoshex_text_callback_mode == 'menu1') {
				chaoshex_cast_action();
				return true;
			} else {
				chaoshex_cmd_not_available();
				return false;
			}
			break;
		case "octarine":
			if(chaoshex_text_callback_mode == 'cast') {
				chaoshex_octarine_action();
				return true;
			} else {
				chaoshex_cmd_not_available();
				return false;
			}
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
			switch(chaoshex_text_callback_mode) {
				case "octarine":
					chaoshex_octarine_spell(cmd);
					return true;
					break;
				case "psyche":
					chaoshex_psyche_spell(cmd);
					return true;
					break;
				case "ego":
					chaoshex_ego_spell(cmd);
					return true;
					break;
				case "play":
					chaoshex_play_spell(cmd);
					return true;
					break;
				case "work":
					chaoshex_work_spell(cmd);
					return true;
					break;
				case "death":
					chaoshex_death_spell(cmd);
					return true;
					break;
				case "sex":
					chaoshex_sex_spell(cmd);
					return true;
					break;
				case "war":
					chaoshex_war_spell(cmd);
					return true;
					break;
				case "love":
					chaoshex_love_spell(cmd);
					return true;
					break;
			}
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
		chaoshex_btn_display('menu1');
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
		chaoshex_change_prompt("");
		chaoshex_btn_display('login');
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
		chaoshex_change_prompt("");
		chaoshex_btn_display('cast');
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
		chaoshex_change_prompt("");
		chaoshex_btn_display('menu1');
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
		//chaoshex_terminal_print("Choose [X]: ");
		chaoshex_change_prompt("Choose [X]: ");
		chaoshex_btn_display('octarine');
	}, 500);
}

function chaoshex_octarine_spell(target_x) {
	chaoshex_terminal_print("Magically Empower "+target_x);
	chaoshex_change_prompt("");
	chaoshex_btn_display('dgsgdsg');
}


function chaoshex_octarine_cancel_btn_pressed() {
	console.log("cast cancel function reached.");
	chaoshex_terminal_print("Spell cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display('cast');
	}, 500);
}

function chaoshex_sex_btn_pressed() {
	$("#chaoshex_text_input").val("sex");
	chaoshex_enter_btn_pressed();
}

function chaoshex_sex_action() {
	console.log("cast sex spell function reached.");
	chaoshex_terminal_print("Casting a Purple spell");
	chaoshex_terminal_print("");
	setTimeout(function () {
		chaoshex_terminal_print("Purple Spell Template: '[X] will be created'");
		//chaoshex_terminal_print("Choose [X]: ");
		chaoshex_change_prompt("Choose [X]: ");
		chaoshex_btn_display('sex');
	}, 500);
}

function chaoshex_sex_spell(target_x) {
	chaoshex_terminal_print(target_x+" will be created");
	chaoshex_change_prompt("");
	chaoshex_btn_display('dgsgdsg');
}

function chaoshex_sex_cancel_btn_pressed() {
	console.log("cast cancel function reached.");
	chaoshex_terminal_print("Spell cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display('cast');
	}, 500);
}


function chaoshex_death_btn_pressed() {
	$("#chaoshex_text_input").val("death");
	chaoshex_enter_btn_pressed();
}

function chaoshex_death_action() {
	console.log("cast sex spell function reached.");
	chaoshex_terminal_print("Casting a Black spell");
	chaoshex_terminal_print("");
	setTimeout(function () {
		chaoshex_terminal_print("Black Spell Template: '[X] will come to an end'");
		//chaoshex_terminal_print("Choose [X]: ");
		chaoshex_change_prompt("Choose [X]: ");
		chaoshex_btn_display('death');
	}, 500);
}

function chaoshex_death_spell(target_x) {
	chaoshex_terminal_print(target_x+" will come to an end");
	chaoshex_change_prompt("");
	chaoshex_btn_display('dgsgdsg');
}


function chaoshex_death_cancel_btn_pressed() {
	console.log("cast cancel function reached.");
	chaoshex_terminal_print("Spell cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display('cast');
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
		chaoshex_change_prompt("");
		chaoshex_btn_display("scry");
	}, 500);
}

function chaoshex_scry_cancel_btn_pressed() {
	console.log("scry cancel function reached.");
	chaoshex_terminal_print("-]&gt;|&lt;[- : cancel");
	chaoshex_terminal_print("Divination cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display('menu1');
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
		chaoshex_change_prompt("");
		chaoshex_btn_display('summon');
	}, 500);
}

function chaoshex_summon_cancel_btn_pressed() {
	console.log("summon cancel function reached.");
	chaoshex_terminal_print("-]&gt;|&lt;[- : cancel");
	chaoshex_terminal_print("Evocation cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display('menu1');
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
function chaoshex_change_prompt(prompt) {
	// Add str to terminal
	if(prompt == '') { prompt ='-[&gt;|&lt;]- :' }

	chaoshex_prompt = prompt;
	$("#chaoshex_prompt").html(prompt);
	$("#chaoshex_input_prompt").html(prompt);
}
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
