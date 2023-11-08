// EnigMagick template
var enigmagick_template;
var enigmagick_template_loaded = false;
var enigmagick_api="";

/* A content module for a web based version of the ChaosHex software */
function enigmagick_menuitem(args) {
	console.log( "enigmagick_menuitem." );
	return "javascript:enigmagick_load('"+args+"');";
}
function enigmagick_load(args) {
	console.log( "enigmagick_load." );
	if(!enigmagick_template_loaded) {
		// Try to call enigmagick again in 1/10 of a second.
		setTimeout(function () {
			enigmagick_load(args);
		}, 100);
		return null;
	}

	var content = enigmagick_template;

	enigmagick_display(content);
	if(typeof config.data_sources == "object") {
		console.log(config.data_sources);
		console.log(config.data_sources.enigmagick);
		console.log(typeof config.data_sources.enigmagick);
		console.log(config.data_sources.enigmagick[0]);
		if(typeof config.data_sources.enigmagick == "object" && config.data_sources.enigmagick[0] == "enigmagick_api") {
			enigmagick_api = config.data_sources.enigmagick[1];
			console.log( "enigmagick_api." );
		} else {
			console.log("EnigMagick Error: API Incorrectly Defined.");
		}
	}
	if(enigmagick_api != "") {
		$("#enigmagick_input_opt_btn").click(function(){ console.log( "search options button pressed." ); enigmagick_sch_opt_btn_pressed(); });
		enigmagick_parse_args(args);
	} else {
		enigmagick_warning_msg("EnigMagick Error: API Not Defined.");
	}
}

function enigmagick_sch_opt_btn_pressed() {
	console.log( "enigmagick_sch_opt_btn_pressed()." );
	if($("#enigmagick_search_options").is(":visible")) {
		$("#enigmagick_input_opt_btn").prop("value","Show Search Options");
		$("#enigmagick_search_options").hide();
	} else {
		$("#enigmagick_input_opt_btn").prop("value","Hide Search Options");
		$("#enigmagick_search_options").show();
	}
}

function enigmagick_parse_args(args) {
	// Time to handle the arguments passed in for search.
	args = JSON.parse(args.replace(/&quot;/g,'"'));
	console.log("enigmagick_parse_args(args)");
	console.log(args);
	pushStateWithoutDuplicate('EnigMagick '+args, './?p=enigmagick/'+args);
}

function enigmagick_warning_msg(warning_msg) {
	$("#enigmagic_warning_message_body").html(warning_msg);
	$("#enigmagic_warning_message").show();
}

function enigmagick_display(content) {
	console.log( "enigmagick_display." );
	$('#contentArea').html(content);
}

function enigmagick_permlink(permlink) {
	console.log( "enigmagick_permlink." );
	let args, search, cipher, text;

	switch(permlink.length) {
		case 1:
			// search -> default cipher and text

			args = '{"search": "'+search+'"}';
			break;
		case 2:
			// search/cipher -> search with specified cipher on default text
			args = '{"search": "'+search+'","tag":"'+permlink[1]+'"}';
			break;
		case 3:
			// search/cipher/text -> search with specified cipher on specified text
			args = '{"search": "'+search+'","tag":"'+permlink[1]+'","text":"'+permlink[2]+'"}';
			break;
	}

	enigmagick_load(args);
}



//Template loaded functions
function enigmagickTemplateLoaded(template) {
	enigmagick_template = template;
	enigmagick_template_loaded = true;
	console.log( "enigmagick template load was performed." );
}
//Load the templates
function loadEnigMagickTemplate() {
	// Get template from theme
	var theme_template = "./theme/"+config.theme+"/enigmagick.html";
	$.ajax(theme_template).done(enigmagickTemplateLoaded).fail(function(){
		// Else use default template
		$.ajax("./module/enigmagick/enigmagick.html").done(enigmagickTemplateLoaded);
	});
}
loadEnigMagickTemplate();
