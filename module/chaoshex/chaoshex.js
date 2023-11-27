// Chaoshex template
var chaoshex_template;
var chaoshex_template_loaded = false;

var chaoshex_prompt = "-[&gt;|&lt;]- :";
var chaoshex_text_callback_mode = 'login';


// EnigMagick API integration 
var chaoshex_enigmagick_api_enabled = false;
var chaoshex_enigmagick_api;
var chaoshex_enigmagick_texts;
var chaoshex_enigmagick_ciphers;
var chaoshex_enigmagick_text;
var chaoshex_enigmagick_cipher;
var chaoshex_enigmagick_matches = [];
var chaoshex_enigmagick_value = 1;

// Spell Settings
var chaoshex_spell_mode;
var chaoshex_spell_template;
var chaoshex_spell_target_x;
var chaoshex_spell_target_y;
var chaoshex_statement_of_intent;
var chaoshex_hacks = 666;


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
	if(typeof config.data_sources == "object") {
		if(typeof config.data_sources.enigmagick == "object" && config.data_sources.enigmagick[0] == "enigmagick_api") {
			chaoshex_enigmagick_api = config.data_sources.enigmagick[1];
			chaoshex_enigmagick_api_enabled = true;
			console.log( "enigmagick_api detected." );
		} 
	}
	if(chaoshex_enigmagick_api_enabled) {
		chaoshex_getCipherList();
		chaoshex_getTextList();
	} else {
		// ensure the 'gematria' button doesn't show up
		$('#chaoshex_scry_gematria_btn').removeClass("chaoshex_btn_scry");

		// and since there aren't any more 'scry' features, hide that button too.
		$('#chaoshex_scry_btn').removeClass("chaoshex_btn_menu1");
	}

	chaoshex_display();
	pushStateWithoutDuplicate('ChaosHex3', './?p=chaoshex/');
}

function chaoshex_display(content) {
	var content = chaoshex_template;

	$('#contentArea').html(content);

	// Now add click methods to the buttons.
	// Enter Button
	$('#chaoshex_enter_btn').click(function(e){ chaoshex_enter_btn_pressed(e); });
	$('#chaoshex_enterX_btn').click(function(e){ chaoshex_enterX_btn_pressed(e); });
	$('#chaoshex_enterY_btn').click(function(e){ chaoshex_enterY_btn_pressed(e); });
	$('#chaoshex_enterYN_btn').click(function(e){ chaoshex_enterYN_btn_pressed(e); });
	$('#chaoshex_enterCipher_btn').click(function(e){ chaoshex_enterCipher_btn_pressed(e); });
	$('#chaoshex_enterText_btn').click(function(e){ chaoshex_enterText_btn_pressed(e); });
	$('#chaoshex_enterSearch_btn').click(function(e){ chaoshex_enterSearch_btn_pressed(e); });
	$('#chaoshex_enterQuery_btn').click(function(e){ chaoshex_enterQuery_btn_pressed(e); });

	// Login Menu options...
	$('#chaoshex_login_btn').click(function(e){ chaoshex_login_btn_pressed(e); });

	// Top Menu options...
	$('#chaoshex_cast_btn').click(function(e){ chaoshex_cast_btn_pressed(e); });
	$('#chaoshex_scry_btn').click(function(e){ chaoshex_scry_btn_pressed(e); });
	$('#chaoshex_summon_btn').click(function(e){ chaoshex_summon_btn_pressed(e); });
	$('#chaoshex_cls_btn').click(function(e){ chaoshex_cls_btn_pressed(e); });
	$('#chaoshex_logout_btn').click(function(e){ chaoshex_logout_btn_pressed(e); });

	// Cast Menu options...
	$('#chaoshex_cast_cancel_btn').click(function(e){ chaoshex_cancel_btn_pressed(e); });
	$('#chaoshex_cast_cls_btn').click(function(e){ chaoshex_cls_btn_pressed(e); });
	$('#chaoshex_cast_custom_btn').click(function(e){ chaoshex_custom_btn_pressed(e); });
	$('#chaoshex_cast_octarine_btn').click(function(e){ chaoshex_octarine_btn_pressed(e); });
	$('#chaoshex_cast_psyche_btn').click(function(e){ chaoshex_psyche_btn_pressed(e); });
	$('#chaoshex_cast_ego_btn').click(function(e){ chaoshex_ego_btn_pressed(e); });
	$('#chaoshex_cast_play_btn').click(function(e){ chaoshex_play_btn_pressed(e); });
	$('#chaoshex_cast_work_btn').click(function(e){ chaoshex_work_btn_pressed(e); });
	$('#chaoshex_cast_death_btn').click(function(e){ chaoshex_death_btn_pressed(e); });
	$('#chaoshex_cast_sex_btn').click(function(e){ chaoshex_sex_btn_pressed(e); });
	$('#chaoshex_cast_war_btn').click(function(e){ chaoshex_war_btn_pressed(e); });
	$('#chaoshex_cast_love_btn').click(function(e){ chaoshex_love_btn_pressed(e); });

	// Scry Menu options...
	$('#chaoshex_scry_gematria_btn').click(function(e){ chaoshex_gematria_btn_pressed(e); });
	$('#chaoshex_scry_cancel_btn').click(function(e){ chaoshex_scry_cancel_btn_pressed(e); });
	$('#chaoshex_scry_cls_btn').click(function(e){ chaoshex_cls_btn_pressed(e); });

	// Gematria Menu options...
	$('#chaoshex_gematria_value_btn').click(function(e){ chaoshex_gematria_value_btn_pressed(e); });
	$('#chaoshex_gematria_query_btn').click(function(e){ chaoshex_gematria_query_btn_pressed(e); });
	$('#chaoshex_gematria_matches_btn').click(function(e){ chaoshex_gematria_matches_btn_pressed(e); });
	$('#chaoshex_gematria_cipher_btn').click(function(e){ chaoshex_gematria_cipher_btn_pressed(e); });
	$('#chaoshex_gematria_text_btn').click(function(e){ chaoshex_gematria_text_btn_pressed(e); });
	$('#chaoshex_gematria_cancel_btn').click(function(e){ chaoshex_gematria_cancel_btn_pressed(e); });
	$('#chaoshex_gematria_cls_btn').click(function(e){ chaoshex_cls_btn_pressed(e); });

	// Summon Menu options...
	$('#chaoshex_summon_cancel_btn').click(function(e){ chaoshex_summon_cancel_btn_pressed(e); });
	$('#chaoshex_summon_cls_btn').click(function(e){ chaoshex_cls_btn_pressed(e); });

	// Confirm Menu options
	$('#chaoshex_confirm_yes_btn').click(function(e){ chaoshex_confirm_yes_btn_pressed(e); });
	$('#chaoshex_confirm_no_btn').click(function(e){ chaoshex_confirm_no_btn_pressed(e); });

	$("#chaoshex_text_input").focus().on('keypress',function(e) {
		if(e.which == 13) {
			console.log('Enter!');
			$(".chaoshex_enter_btn:visible").trigger("click");
		}
	});
}

function chaoshex_permlink(permlink) {
	permlink = permlink.join("/");
	chaoshex_load(permlink);
}

/* Reality Hacking Visualisation Functions */
function chaoshex_hack_reality() {
	console.log("chaoshex_hack_reality()");
	// Reality Hacking Visualisation
	$("#chaoshex_context_buttons input").hide();
	$(".chaoshex_enter_btn").hide();

	chaoshex_random_hack(chaoshex_hacks);
}
	 
function chaoshex_hack_reality_complete() {
	$('.chaoshex_hack').animate({
		opacity: 0
	}, 500);
	setTimeout(function () {
		$('.chaoshex_hack').remove(); // No longer needed.
		chaoshex_terminal_print("");
		chaoshex_terminal_print("100% of neccessary updates to reality complete.");
		chaoshex_terminal_print("Reality permanently altered.");
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display('menu1');
	}, 600);
}

function chaoshex_random_hack(hacks) {
	console.log("chaoshex_random_hack()");

	//TO DO: Add other kinds of random hacks, not just rectangles.
	var rnum = Math.floor(Math.random() * 23);
	if(rnum < 5) chaoshex_rectangle_hack();
	else chaoshex_text_hack(hacks);
	
	if(hacks > 0) { 
		setTimeout(function () {
			chaoshex_random_hack(hacks - 1);
		}, 100);
	} else chaoshex_hack_reality_complete();
}

function chaoshex_rectangle_hack() {
	var colours = ["#f00","#0f0","#00f","#ff0","#f0f","#0ff","x"];
	var xcoord = Math.floor(Math.random() * 95);
	var ycoord = Math.floor(Math.random() * 95);
	var width = Math.floor(Math.random() * (100-xcoord));
	var height = Math.floor(Math.random() * (100-ycoord));
	var rand_col = Math.floor(Math.random() * colours.length);
	var colour = colours[rand_col];
	var group = Math.floor(Math.random() * 9)+1;
	var spell_class = ''
	if(colour == 'x') {
		colour = '#fc0;';
		spell_class = "chaoshex_"+chaoshex_spell_mode;
	}

	var rect = "<div class='chaoshex_hack "+spell_class+" chaoshex_hack_"+group+"' style='background: "+colour+"; position: fixed; left: "+xcoord+"%; top: "+ycoord+"%; width: "+width+"%; height: "+height+"%; animation: fading 5s;'></div>";
	$("#chaoshex_terminal").append(rect);
}

function chaoshex_randomBinary(min, max) {
	return Math.floor(min + Math.random() * (max + 1 - min)).toString(2).padStart(16,'0');
}

function chaoshex_text_hack(hacks) {
	var texts = ["01","%","EnigMagickValue","EnigMagickMatch","delete","move","resize","circle","default"];
	var text = texts[Math.floor(Math.random() * texts.length)];

	var xcoord = Math.floor(Math.random() * 95);
	var ycoord = Math.floor(Math.random() * 95);
	var size = Math.floor(Math.random() * 50)/10;
	var group = Math.floor(Math.random() * 9)+1;
	var output = Math.floor(Math.random() * 10) > 7;

	switch(text) {
		case "01":
			let binary_size = Math.floor(Math.random() * 32) + 16;

			text = chaoshex_randomBinary(0,65535);
			for(i=0; i<binary_size; i++) {
				text += chaoshex_randomBinary(0,65535);
			}
			output = false;
			break;
		case "%":
			percent = Math.floor(((chaoshex_hacks-hacks)/chaoshex_hacks)*100);
			text = percent+"% of neccessary updates to reality complete";
			output = false;
			break;
		case "delete":
			// Apply fade to this whole group.
			$('.chaoshex_hack_'+group).animate({
				opacity: 0
			}, 500);
			text = "Clearing cache to remove evidence";
			output = false;
			break;
		case "circle":
			let bsize = Math.floor(Math.random() * 51);
			// Apply fade to this whole group.
			$('.chaoshex_hack_'+group).animate({
				'border-radius': bsize+'%'
			}, 1000);

			text = "Trimming datasets";
			output = false;
			break;
		case "move":
			// Apply fade to this whole group.
			$('.chaoshex_hack_'+group).animate({
				'left': xcoord+'%'
			}, 1000);
			$('.chaoshex_hack_'+group).animate({
				'top': ycoord+'%'
			}, 1000);

			text = "Reordering data";
			output = false;
			break;
		case "resize":
			let deg = Math.floor(Math.random() * 720);
			// Apply fade to this whole group.
			$('.chaoshex_hack_'+group).animate({
				'width': xcoord+'%'
			}, 1000);
			$('.chaoshex_hack_'+group).animate({
				'height': ycoord+'%'
			}, 1000);
			$('.chaoshex_hack_'+group).animate({
				'font-size': size+'em'
			}, 1000);

			text = "Reordering data";
			output = false;
			break;
		case "EnigMagickValue":
			if(chaoshex_enigmagick_api_enabled) {
				text = chaoshex_enigmagick_value;
				size = size + 2;
			} else {
				text = "Value unobtainable on this node, rerouting...";
			}
			output = false;
			break;
		case "EnigMagickMatch":
			if(chaoshex_enigmagick_api_enabled) {
				// Select a random match to display...
				if(typeof chaoshex_enigmagick_matches === "undefined" || chaoshex_enigmagick_matches === null) {
					text = "Initiating Data Search";
					output = false;
				} else {
					text = chaoshex_enigmagick_matches[Math.floor(Math.random() * chaoshex_enigmagick_matches.length)];
				}
			} else {
				text = "Hivemind fixing reality";
				output = false;
			}
			break;
		default:
			var texts = ["Accessing New Node","Root Access Obtained","Evading Detection","Rerouting to bypass Firewall","Target Data Located","Poisoning Trace","Corrupting Logs","∘{𝒵}~","⍼","-[>|<]-","🥨"];
			var text = texts[Math.floor(Math.random() * texts.length)];
			size = size + 0.5;
	}

	

	if(size > 2) {
		var width = Math.floor(Math.random() * (100-xcoord));
		var rect = "<div class='chaoshex_hack chaoshex_hack_text chaoshex_hack_"+group+"' style='position: fixed; font-size:"+size+"em; left: "+xcoord+"%; top: "+ycoord+"%; width: "+width+"%; animation: fading 6s;'>"+text+"</div>";
		if(output) {
			chaoshex_terminal_print(text);
		}
	} else if(size > 0) {
		var width = Math.floor(Math.random() * (100-xcoord)/3)+5;
		var height = Math.floor(Math.random() * (100-ycoord)/3)+5;
		var rect = "<div class='chaoshex_hack chaoshex_hack_text_border chaoshex_"+chaoshex_spell_mode+" chaoshex_hack_"+group+"' style='position: fixed; font-size:"+size+"em; left: "+xcoord+"%; top: "+ycoord+"%; width: "+width+"%; height: "+height+"%; animation: fading 5s;'>"+text+"</div>";
	}
	$("#chaoshex_terminal").append(rect);
}

/* EnigMagick Functions */

function chaoshex_getCipherList() {
	$.ajax({
        type: 'GET',
        url: chaoshex_enigmagick_api+"ciphers.php"
    }).done(chaoshex_processCipherList);
} 
function chaoshex_processCipherList(ciphers) {
	chaoshex_enigmagick_ciphers = ciphers;
	if(typeof chaoshex_enigmagick_cipher === "undefined"  || chaoshex_enigmagick_cipher == null) chaoshex_enigmagick_cipher = chaoshex_enigmagick_ciphers.ciphers[0];
}
function chaoshex_getTextList() {
	$.ajax({
        type: 'GET',
        url: chaoshex_enigmagick_api+"texts.php"
    }).done(chaoshex_processTextList);
} 
function chaoshex_processTextList(texts) {
	chaoshex_enigmagick_texts = texts;
	if(typeof chaoshex_enigmagick_text === "undefined" || chaoshex_enigmagick_text == null) chaoshex_enigmagick_text = chaoshex_enigmagick_texts.texts[0];
}
function chaoshex_getMatches(search,cipher,text) {
	chaoshex_enigmagick_matches = null;
	$.ajax({
        type: 'GET',
        url: chaoshex_enigmagick_api+"matches.php?search="+search+"&cipher="+cipher+"&text="+text+".txt"
    }).done(chaoshex_processMatches);
} 
function chaoshex_processMatches(matches) {
	chaoshex_enigmagick_matches = matches.matches;
	chaoshex_enigmagick_value = matches.value;

	if(chaoshex_text_callback_mode == "value") {
		// Display results
		chaoshex_terminal_print("Value : "+matches.value);
		chaoshex_terminal_print(matches.matches.length+" matches found in "+chaoshex_enigmagick_text.title);
		chaoshex_terminal_print("");
		
		chaoshex_enter_display("");
		chaoshex_change_prompt("");
		chaoshex_text_callback_mode = "gematria"
	}
	if(chaoshex_text_callback_mode == "query") {
		chaoshex_terminal_print("");
		// Display results
		for(i=0; i<5; i++) {
			text = chaoshex_enigmagick_matches[Math.floor(Math.random() * chaoshex_enigmagick_matches.length)];
			chaoshex_terminal_print(text);
		}
		chaoshex_terminal_print("");
		
		chaoshex_enter_display("");
		chaoshex_change_prompt("");
		chaoshex_text_callback_mode = "gematria"
	}
}

function chaoshex_showMatches() {
	// Display results
	let matches = [];
	for(i=0; i < chaoshex_enigmagick_matches.length; i++) {
		matches[i] = (i+1)+") "+chaoshex_enigmagick_matches[i];
		//chaoshex_terminal_print((i+1)+") "+chaoshex_enigmagick_matches[i]);
	}
	chaoshex_terminal_xprint(matches);
	chaoshex_enter_display("");
	chaoshex_change_prompt("");
}

/* Button Mode Functions */
function chaoshex_btn_display(mode) {
	console.log("chaoshex_btn_display("+mode+")");
	chaoshex_text_callback_mode = mode;
	$("#chaoshex_context_buttons input").hide();
	$(".chaoshex_btn_"+mode).show();
}
function chaoshex_enter_display(mode) {
	console.log("chaoshex_enter_display("+mode+")");
	$(".chaoshex_enter_btn").hide();
	$("#chaoshex_enter"+mode+"_btn").show();
}

/* Button Press Functions */
function chaoshex_enter_btn_pressed(e) {
	let cmd = $("#chaoshex_text_input").val();
	chaoshex_terminal_print(chaoshex_prompt+" "+cmd);
	$("#chaoshex_text_input").val("");

	switch(cmd) {
		case "debug":
			chaoshex_terminal_print("cmd : "+cmd);
			chaoshex_terminal_print("chaoshex_text_callback_mode : "+chaoshex_text_callback_mode);
			chaoshex_terminal_print("chaoshex_spell_mode : "+chaoshex_spell_mode);
			chaoshex_terminal_print("chaoshex_spell_template : "+chaoshex_spell_template);
			chaoshex_terminal_print("chaoshex_spell_target_x : "+chaoshex_spell_target_x);
			chaoshex_terminal_print("chaoshex_spell_target_y : "+chaoshex_spell_target_y);
			chaoshex_terminal_print("chaoshex_statement_of_intent : "+chaoshex_statement_of_intent);
			chaoshex_terminal_print("chaoshex_enigmagick_api : "+chaoshex_enigmagick_api);
			chaoshex_terminal_print("chaoshex_enigmagick_text : "+JSON.stringify(chaoshex_enigmagick_text));
			chaoshex_terminal_print("chaoshex_enigmagick_cipher : "+JSON.stringify(chaoshex_enigmagick_cipher));
			chaoshex_terminal_print("chaoshex_enigmagick_value : "+chaoshex_enigmagick_value);
			chaoshex_terminal_print("");
			chaoshex_terminal_print("chaoshex_enigmagick_texts : "+JSON.stringify(chaoshex_enigmagick_texts));
			chaoshex_terminal_print("");
			chaoshex_terminal_print("chaoshex_enigmagick_ciphers : "+JSON.stringify(chaoshex_enigmagick_ciphers));
			chaoshex_terminal_print("");
			chaoshex_terminal_print("chaoshex_enigmagick_matches : "+JSON.stringify(chaoshex_enigmagick_matches));
			chaoshex_terminal_print("");
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
		case "custom":
			if(chaoshex_text_callback_mode == 'cast') {
				chaoshex_custom_action();
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
			if(chaoshex_text_callback_mode == 'cast') {
				chaoshex_psyche_action();
				return true;
			} else {
				chaoshex_cmd_not_available();
				return false;
			}
			break;
		case 'ego':
			if(chaoshex_text_callback_mode == 'cast') {
				chaoshex_ego_action();
				return true;
			} else {
				chaoshex_cmd_not_available();
				return false;
			}
			break;
		case 'play':
			if(chaoshex_text_callback_mode == 'cast') {
				chaoshex_play_action();
				return true;
			} else {
				chaoshex_cmd_not_available();
				return false;
			}
			break;
		case 'work':
			if(chaoshex_text_callback_mode == 'cast') {
				chaoshex_work_action();
				return true;
			} else {
				chaoshex_cmd_not_available();
				return false;
			}
			break;
		case 'death':
			if(chaoshex_text_callback_mode == 'cast') {
				chaoshex_death_action();
				return true;
			} else {
				chaoshex_cmd_not_available();
				return false;
			}
			break;
		case 'sex':
			if(chaoshex_text_callback_mode == 'cast') {
				chaoshex_sex_action();
				return true;
			} else {
				chaoshex_cmd_not_available();
				return false;
			}
			break;
		case 'war':
			if(chaoshex_text_callback_mode == 'cast') {
				chaoshex_war_action();
				return true;
			} else {
				chaoshex_cmd_not_available();
				return false;
			}
			break;
		case 'love':
			if(chaoshex_text_callback_mode == 'cast') {
				chaoshex_love_action();
				return true;
			} else {
				chaoshex_cmd_not_available();
				return false;
			}
			break;
		case 'scry':
			chaoshex_scry_action();
			return true;
			break;
		case 'gematria':
			if(chaoshex_text_callback_mode == 'scry') {
				chaoshex_gematria_action();
				return true;
			} else {
				chaoshex_cmd_not_available();
				return false;
			}
			break;
		case 'cipher':
			if(chaoshex_text_callback_mode == 'gematria') {
				chaoshex_gematria_cipher_action();
				return true;
			} else {
				chaoshex_cmd_not_available();
				return false;
			}
			break;
		case 'text':
			if(chaoshex_text_callback_mode == 'gematria') {
				chaoshex_gematria_text_action();
				return true;
			} else {
				chaoshex_cmd_not_available();
				return false;
			}
			break;
		case 'matches':
			if(chaoshex_text_callback_mode == 'gematria') {
				chaoshex_showMatches();
				return true;
			} else {
				chaoshex_cmd_not_available();
				return false;
			}
			break;
		case 'query':
			if(chaoshex_text_callback_mode == 'gematria') {
				chaoshex_gematria_query_action();
				return true;
			} else {
				chaoshex_cmd_not_available();
				return false;
			}
			break;
		case 'value':
			if(chaoshex_text_callback_mode == 'gematria') {
				chaoshex_gematria_value_action();
				return true;
			} else {
				chaoshex_cmd_not_available();
				return false;
			}
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

function chaoshex_enterX_btn_pressed(e) {
	chaoshex_spell_target_x = $("#chaoshex_text_input").val();
	$("#chaoshex_text_input").val("");
	chaoshex_terminal_print(chaoshex_prompt+" "+chaoshex_spell_target_x);
	chaoshex_spell_template = chaoshex_spell_template.replace("[X]", chaoshex_spell_target_x);
	chaoshex_terminal_print(chaoshex_spell_template);

	if(chaoshex_spell_template.search('[Y]') != -1) {
		chaoshex_enter_display('Y');
		chaoshex_change_prompt("Choose [Y]: ");
	} else {
		chaoshex_statement_of_intent = chaoshex_spell_template;
		chaoshex_confirm_spell();
	}
}

function chaoshex_enterY_btn_pressed(e) {
	chaoshex_spell_target_y = $("#chaoshex_text_input").val();
	$("#chaoshex_text_input").val("");
	chaoshex_terminal_print(chaoshex_prompt+" "+chaoshex_spell_target_y);
	chaoshex_spell_template = chaoshex_spell_template.replace("[Y]", chaoshex_spell_target_y);
	chaoshex_terminal_print(chaoshex_spell_template);

	chaoshex_statement_of_intent = chaoshex_spell_template;
	chaoshex_confirm_spell();
}

function chaoshex_confirm_spell() {
	const randomCipher = chaoshex_enigmagick_ciphers.ciphers[Math.floor(Math.random() * chaoshex_enigmagick_ciphers.ciphers.length)].short_name;
	const randomText = chaoshex_enigmagick_texts.texts[Math.floor(Math.random() * chaoshex_enigmagick_texts.texts.length)].file.slice(0, -4);
	chaoshex_getMatches(chaoshex_statement_of_intent,randomCipher,randomText);

	//chaoshex_spell_mode = chaoshex_text_callback_mode;

	chaoshex_terminal_print("");
	chaoshex_terminal_print("Warning. Reality will be permanently altered. Continue? [Yes/No]");
	chaoshex_terminal_print("");
	chaoshex_enter_display('YN');
	chaoshex_btn_display('confirm');
	chaoshex_change_prompt("Confirm [Y/N]");
}

function chaoshex_confirm_yes_btn_pressed(e) {
	$("#chaoshex_text_input").val("Y");
	chaoshex_enterYN_btn_pressed();
}
function chaoshex_confirm_no_btn_pressed(e) {
	$("#chaoshex_text_input").val("N");
	chaoshex_enterYN_btn_pressed();
}


function chaoshex_enterYN_btn_pressed(e) {
	confirm_yn = $("#chaoshex_text_input").val();
	$("#chaoshex_text_input").val("");
	chaoshex_terminal_print(chaoshex_prompt+" "+confirm_yn);

	if(confirm_yn.charAt(0) == 'Y' || confirm_yn.charAt(0) == 'y') {
		// Launch spell routines.
		chaoshex_terminal_print("Hacking into reality...");
		chaoshex_btn_display('menu1');
		chaoshex_hack_reality();
	} else {
		chaoshex_terminal_print("");
		chaoshex_terminal_print("Spell cancelled");
		chaoshex_terminal_print("");
		chaoshex_enter_display('');
		chaoshex_change_prompt("");
		chaoshex_btn_display('menu1');
	}
}

function chaoshex_login_btn_pressed(e) {
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
	}, 850);
	setTimeout(function () {
		chaoshex_terminal_type(">");
	}, 900);
	setTimeout(function () {
		chaoshex_terminal_type("|");
	}, 950);
	setTimeout(function () {
		chaoshex_terminal_type("<");
	}, 1000);
	setTimeout(function () {
		chaoshex_terminal_type("]");
	}, 1050);
	setTimeout(function () {
		chaoshex_terminal_type("-");
	}, 1100);
	setTimeout(function () {
		chaoshex_terminal_print("Hivemind Connection Successfull");
		chaoshex_terminal_print("Welcome anon23 to the ChaosHex Hivemind");
		chaoshex_btn_display('menu1');
		chaoshex_terminal_print("Please select a command...");
		chaoshex_terminal_print("");
	}, 1150);
}

function chaoshex_logout_btn_pressed(e) {
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

function chaoshex_cls_btn_pressed(e) {
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
function chaoshex_cast_btn_pressed(e) {
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

function chaoshex_cancel_btn_pressed(e) {
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

function chaoshex_custom_btn_pressed(e) {
	$("#chaoshex_text_input").val("custom");
	chaoshex_enter_btn_pressed();
}

function chaoshex_custom_action() {
	console.log("cast custom spell function reached.");
	chaoshex_terminal_print("Casting a spell with custom Statement of Intent");
	chaoshex_terminal_print("");
	setTimeout(function () {
		chaoshex_spell_template = "[X]";
		chaoshex_terminal_print("Statement of Intent: '"+chaoshex_spell_template+"'");
		chaoshex_enter_display('X');
		chaoshex_change_prompt("Choose [X]: ");
	}, 500);
}

function chaoshex_custom_cancel_btn_pressed(e) {
	console.log("cast cancel function reached.");
	chaoshex_terminal_print("Spell cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display('cast');
	}, 500);
}

function chaoshex_octarine_btn_pressed(e) {
	$("#chaoshex_text_input").val("octarine");
	chaoshex_enter_btn_pressed();
}

function chaoshex_octarine_action() {
	console.log("cast octarine spell function reached.");
	chaoshex_terminal_print("Casting an Octarine spell");
	chaoshex_terminal_print("");
	chaoshex_spell_mode = 'octarine';
	setTimeout(function () {
		chaoshex_spell_template = "Magically Empower [X]";
		chaoshex_terminal_print("Octarine Spell Template: '"+chaoshex_spell_template+"'");
		chaoshex_enter_display('X');
		chaoshex_change_prompt("Choose [X]: ");
		//chaoshex_btn_display('octarine');
	}, 500);
}

function chaoshex_octarine_cancel_btn_pressed(e) {
	console.log("cast cancel function reached.");
	chaoshex_terminal_print("Spell cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display('cast');
	}, 500);
}


function chaoshex_psyche_btn_pressed(e) {
	$("#chaoshex_text_input").val("psyche");
	chaoshex_enter_btn_pressed();
}

function chaoshex_psyche_action() {
	console.log("cast psyche spell function reached.");
	chaoshex_terminal_print("Casting a White spell");
	chaoshex_terminal_print("");
	chaoshex_spell_mode = 'psyche';
	setTimeout(function () {
		chaoshex_spell_template = "Psyche of [X] will [Y]";
		chaoshex_terminal_print("White Spell Template: '"+chaoshex_spell_template+"'");
		//chaoshex_terminal_print("Choose [X]: ");
		chaoshex_enter_display('X');
		chaoshex_change_prompt("Choose [X]: ");
		//chaoshex_btn_display('death');
	}, 500);
}

function chaoshex_psyche_cancel_btn_pressed(e) {
	console.log("cast psyche cancel function reached.");
	chaoshex_terminal_print("Spell cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display('cast');
	}, 500);
}


function chaoshex_ego_btn_pressed(e) {
	$("#chaoshex_text_input").val("ego");
	chaoshex_enter_btn_pressed();
}

function chaoshex_ego_action() {
	console.log("cast ego spell function reached.");
	chaoshex_terminal_print("Casting a Yellow spell");
	chaoshex_terminal_print("");
	chaoshex_spell_mode = 'yellow';
	setTimeout(function () {
		chaoshex_spell_template = "[X] will gain glamour of [Y]";
		chaoshex_terminal_print("Yellow Spell Template: '"+chaoshex_spell_template+"'");
		//chaoshex_terminal_print("Choose [X]: ");
		chaoshex_enter_display('X');
		chaoshex_change_prompt("Choose [X]: ");
		//chaoshex_btn_display('death');
	}, 500);
}

function chaoshex_ego_cancel_btn_pressed(e) {
	console.log("cast ego cancel function reached.");
	chaoshex_terminal_print("Spell cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display('cast');
	}, 500);
}


function chaoshex_play_btn_pressed(e) {
	$("#chaoshex_text_input").val("play");
	chaoshex_enter_btn_pressed();
}

function chaoshex_play_action() {
	console.log("cast play spell function reached.");
	chaoshex_terminal_print("Casting a Blue spell");
	chaoshex_terminal_print("");
	chaoshex_spell_mode = 'blue';
	setTimeout(function () {
		chaoshex_spell_template = "[X] will get pleasure from [Y]";
		chaoshex_terminal_print("Blue Spell Template: '"+chaoshex_spell_template+"'");
		//chaoshex_terminal_print("Choose [X]: ");
		chaoshex_enter_display('X');
		chaoshex_change_prompt("Choose [X]: ");
		//chaoshex_btn_display('death');
	}, 500);
}

function chaoshex_play_cancel_btn_pressed(e) {
	console.log("cast play cancel function reached.");
	chaoshex_terminal_print("Spell cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display('cast');
	}, 500);
}


function chaoshex_work_btn_pressed(e) {
	$("#chaoshex_text_input").val("work");
	chaoshex_enter_btn_pressed();
}

function chaoshex_work_action() {
	console.log("cast work spell function reached.");
	chaoshex_terminal_print("Casting an Orange spell");
	chaoshex_terminal_print("");
	chaoshex_spell_mode = 'orange';
	setTimeout(function () {
		chaoshex_spell_template = "[X] will succeed at [Y]";
		chaoshex_terminal_print("Orange Spell Template: '"+chaoshex_spell_template+"'");
		//chaoshex_terminal_print("Choose [X]: ");
		chaoshex_enter_display('X');
		chaoshex_change_prompt("Choose [X]: ");
		//chaoshex_btn_display('death');
	}, 500);
}

function chaoshex_work_cancel_btn_pressed(e) {
	console.log("cast work cancel function reached.");
	chaoshex_terminal_print("Spell cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display('cast');
	}, 500);
}


function chaoshex_death_btn_pressed(e) {
	$("#chaoshex_text_input").val("death");
	chaoshex_enter_btn_pressed();
}

function chaoshex_death_action() {
	console.log("cast sex spell function reached.");
	chaoshex_terminal_print("Casting a Black spell");
	chaoshex_terminal_print("");
	chaoshex_spell_mode = 'black';
	setTimeout(function () {
		chaoshex_spell_template = "[X] will come to an end";
		chaoshex_terminal_print("Black Spell Template: '"+chaoshex_spell_template+"'");
		//chaoshex_terminal_print("Choose [X]: ");
		chaoshex_enter_display('X');
		chaoshex_change_prompt("Choose [X]: ");
		//chaoshex_btn_display('death');
	}, 500);
}

function chaoshex_death_cancel_btn_pressed(e) {
	console.log("cast cancel function reached.");
	chaoshex_terminal_print("Spell cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display('cast');
	}, 500);
}


function chaoshex_sex_btn_pressed(e) {
	$("#chaoshex_text_input").val("sex");
	chaoshex_enter_btn_pressed();
}

function chaoshex_sex_action() {
	console.log("cast sex spell function reached.");
	chaoshex_terminal_print("Casting a Purple spell");
	chaoshex_terminal_print("");
	chaoshex_spell_mode = 'purple';
	setTimeout(function () {
		chaoshex_spell_template = "[X] will be created";
		chaoshex_terminal_print("Purple Spell Template: '"+chaoshex_spell_template+"'");
		//chaoshex_terminal_print("Choose [X]: ");
		chaoshex_enter_display('X');
		chaoshex_change_prompt("Choose [X]: ");
		//chaoshex_btn_display('sex');
	}, 500);
}

function chaoshex_sex_cancel_btn_pressed(e) {
	console.log("cast cancel function reached.");
	chaoshex_terminal_print("Spell cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display('cast');
	}, 500);
}


function chaoshex_war_btn_pressed(e) {
	$("#chaoshex_text_input").val("war");
	chaoshex_enter_btn_pressed();
}

function chaoshex_war_action() {
	console.log("cast war spell function reached.");
	chaoshex_terminal_print("Casting a red spell");
	chaoshex_terminal_print("");
	chaoshex_spell_mode = 'red';
	setTimeout(function () {
		chaoshex_spell_template = "[X] will take over [Y]";
		chaoshex_terminal_print("Red Spell Template: '"+chaoshex_spell_template+"'");
		//chaoshex_terminal_print("Choose [X]: ");
		chaoshex_enter_display('X');
		chaoshex_change_prompt("Choose [X]: ");
		//chaoshex_btn_display('death');
	}, 500);
}

function chaoshex_war_cancel_btn_pressed(e) {
	console.log("cast war cancel function reached.");
	chaoshex_terminal_print("Spell cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display('cast');
	}, 500);
}


function chaoshex_love_btn_pressed(e) {
	$("#chaoshex_text_input").val("love");
	chaoshex_enter_btn_pressed();
}

function chaoshex_love_action() {
	console.log("cast love spell function reached.");
	chaoshex_terminal_print("Casting a Green spell");
	chaoshex_terminal_print("");
	chaoshex_spell_mode = 'green';
	setTimeout(function () {
		chaoshex_spell_template = "[X] will attract [Y]";
		chaoshex_terminal_print("Green Spell Template: '"+chaoshex_spell_template+"'");
		//chaoshex_terminal_print("Choose [X]: ");
		chaoshex_enter_display('X');
		chaoshex_change_prompt("Choose [X]: ");
		//chaoshex_btn_display('death');
	}, 500);
}

function chaoshex_love_cancel_btn_pressed(e) {
	console.log("cast love cancel function reached.");
	chaoshex_terminal_print("Spell cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display('cast');
	}, 500);
}

// Scry button and scry menu buttons
function chaoshex_scry_btn_pressed(e) {
	$("#chaoshex_text_input").val("scry");
	chaoshex_enter_btn_pressed();
}

function chaoshex_scry_action() {
	console.log("scry function reached.");
	chaoshex_terminal_print("Divination with ChaosHex");
	chaoshex_terminal_print("");
	setTimeout(function () {
		chaoshex_terminal_print("Select option: ");
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display("scry");
	}, 500);
}

function chaoshex_scry_cancel_btn_pressed(e) {
	console.log("scry cancel function reached.");
	chaoshex_terminal_print("-]&gt;|&lt;[- : cancel");
	chaoshex_terminal_print("Divination cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display('menu1');
	}, 500);
}

function chaoshex_gematria_btn_pressed(e) {
	console.log("gematria btn function reached.");
	$("#chaoshex_text_input").val("gematria");
	chaoshex_enter_btn_pressed();
}

function chaoshex_gematria_action() {
	console.log("gematria action function reached.");
	chaoshex_terminal_print("Gematria with ChaosHex");

	if(chaoshex_enigmagick_api_enabled) {
		chaoshex_terminal_print("Accessing EnigMagick");
		chaoshex_terminal_print("");
		chaoshex_terminal_print("Current Cipher: "+chaoshex_enigmagick_cipher.name);
		chaoshex_terminal_print("Current Text: "+chaoshex_enigmagick_text.title);
		chaoshex_terminal_print("Current Value: "+chaoshex_enigmagick_value);
		chaoshex_terminal_print("Matches: "+chaoshex_enigmagick_matches.length);
		chaoshex_terminal_print("");

		setTimeout(function () {
			chaoshex_btn_display('gematria');
		}, 500);
	} else {
		chaoshex_terminal_print("EnigMagick Unavailable.");
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
	}

}
function chaoshex_gematria_cancel_btn_pressed(e) {
	console.log("gematria cancel function reached.");
	chaoshex_terminal_print("-]&gt;|&lt;[- : cancel");
	chaoshex_terminal_print("Gematria cancelled");
	setTimeout(function () {
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display('scry');
	}, 500);
}

function chaoshex_gematria_cipher_btn_pressed(e) {
	$("#chaoshex_text_input").val("cipher");
	chaoshex_enter_btn_pressed();
}
function chaoshex_gematria_cipher_action() {
	console.log("gematria cipher action function reached.");

	chaoshex_terminal_print("Select cipher: ");
	chaoshex_terminal_print("");
	for(i=0; i < chaoshex_enigmagick_ciphers.ciphers.length; i++) {
		chaoshex_terminal_print(i+") "+chaoshex_enigmagick_ciphers.ciphers[i].name);
	}
	chaoshex_change_prompt("Cipher: ");
	chaoshex_enter_display("Cipher");
}
function chaoshex_gematria_text_btn_pressed(e) {
	$("#chaoshex_text_input").val("text");
	chaoshex_enter_btn_pressed();
}
function chaoshex_gematria_text_action() {
	console.log("gematria text action function reached.");

	chaoshex_terminal_print("Select text: ");
	chaoshex_terminal_print("");
	for(i=0; i < chaoshex_enigmagick_texts.texts.length; i++) {
		chaoshex_terminal_print(i+") "+chaoshex_enigmagick_texts.texts[i].title);
	}
	chaoshex_change_prompt("Text: ");
	chaoshex_enter_display("Text");
}
function chaoshex_gematria_value_btn_pressed(e) {
	$("#chaoshex_text_input").val("value");
	chaoshex_enter_btn_pressed();
}
function chaoshex_gematria_value_action() {
	setTimeout(function () {
		chaoshex_terminal_print("Enter string to evaluate: ");
		chaoshex_terminal_print("");
		
		chaoshex_change_prompt("Search: ");
		chaoshex_enter_display("Search");
	}, 500);
}
function chaoshex_gematria_query_btn_pressed(e) {
	$("#chaoshex_text_input").val("query");
	chaoshex_enter_btn_pressed();
}
function chaoshex_gematria_query_action() {
	setTimeout(function () {
		chaoshex_terminal_print("Ask a question for this divination: ");
		chaoshex_terminal_print("");
		
		chaoshex_change_prompt("Query: ");
		chaoshex_enter_display("Query");
	}, 500);
}
function chaoshex_enterCipher_btn_pressed(e) {
	console.log("enter cipher function reached.");

	let cmd = $("#chaoshex_text_input").val();
	chaoshex_terminal_print(chaoshex_prompt+" "+cmd);

	index = parseInt(cmd,10);
	if(typeof chaoshex_enigmagick_ciphers.ciphers[index] === 'undefined') {
		chaoshex_terminal_print("Invalid cipher. Selecting default...");
		chaoshex_enigmagick_cipher = chaoshex_enigmagick_ciphers.ciphers[0];
	}
	else {
		chaoshex_enigmagick_cipher = chaoshex_enigmagick_ciphers.ciphers[index];
	}

	chaoshex_terminal_print("Cipher selected: "+chaoshex_enigmagick_cipher.name);
	chaoshex_terminal_print("");

	chaoshex_change_prompt("");
	chaoshex_enter_display("");
}
function chaoshex_enterText_btn_pressed(e) {
	console.log("enter text function reached.");

	let cmd = $("#chaoshex_text_input").val();
	chaoshex_terminal_print(chaoshex_prompt+" "+cmd);

	index = parseInt(cmd,10);
	if(typeof chaoshex_enigmagick_texts.texts[index] === 'undefined') {
		chaoshex_terminal_print("Invalid cipher. Selecting default...");
		chaoshex_enigmagick_text = chaoshex_enigmagick_texts.texts[0];
	}
	else {
		chaoshex_enigmagick_text = chaoshex_enigmagick_texts.texts[index];
	}

	chaoshex_terminal_print("Text selected: "+chaoshex_enigmagick_text.title);
	chaoshex_terminal_print("");

	chaoshex_change_prompt("");
	chaoshex_enter_display("");
}

function chaoshex_enterSearch_btn_pressed(e) {
	console.log("enter search function reached.");

	let cmd = $("#chaoshex_text_input").val();
	chaoshex_terminal_print(chaoshex_prompt+" "+cmd);

	chaoshex_change_prompt("Searching... ");
	chaoshex_enter_display("Searching");
	chaoshex_text_callback_mode = 'value';

	chaoshex_getMatches(cmd,chaoshex_enigmagick_cipher.short_name,chaoshex_enigmagick_text.file.slice(0, -4));
}
function chaoshex_enterQuery_btn_pressed(e) {
	console.log("enter search function reached.");

	let cmd = $("#chaoshex_text_input").val();
	chaoshex_terminal_print(chaoshex_prompt+" "+cmd);

	chaoshex_change_prompt("Searching... ");
	chaoshex_enter_display("Searching");
	chaoshex_text_callback_mode = 'query';

	chaoshex_getMatches(cmd,chaoshex_enigmagick_cipher.short_name,chaoshex_enigmagick_text.file.slice(0, -4));
}
function chaoshex_gematria_matches_btn_pressed() {
	$("#chaoshex_text_input").val("matches");
	chaoshex_enter_btn_pressed();
}

// Summon button and summon menu buttons
function chaoshex_summon_btn_pressed(e) {
	$("#chaoshex_text_input").val("summon");
	chaoshex_enter_btn_pressed();
}

function chaoshex_summon_action() {
	console.log("summon function reached.");
	chaoshex_terminal_print("Evoke entity with ChaosHex");
	chaoshex_terminal_print("");
	setTimeout(function () {
		chaoshex_terminal_print("Select option: ");
		chaoshex_terminal_print("");
		chaoshex_change_prompt("");
		chaoshex_btn_display('summon');
	}, 500);
}

function chaoshex_summon_cancel_btn_pressed(e) {
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
	$("#chaoshex_text_input").trigger("focus");
}
function chaoshex_terminal_type(html) {
	// Add str to terminal
	if(html == '') { html = "&nbsp;"}
	var line = `<span class="chaoshex_cls">${html}</span>`; 
console.log(line);
	$(".chaoshex_cls").last().append(line);
	$('#chaoshex_terminal').animate({
		scrollTop: $("#chaoshex_terminal").prop("scrollHeight")
	}, 10);
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
function chaoshex_terminal_xprint(str_array) {
	// Add str to terminal
	let html;
	for(i=0; i < str_array.length; i++) {
		html = str_array[i];
		if(html == '') { html = "&nbsp;"}
		var line = `<p class="chaoshex_cls">${html}</p>`; 
		$(line).insertBefore("#chaoshex_prompt");
	}
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
