// EnigMagick template
var enigmagick_template;
var enigmagick_template_loaded = false;

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
	pushStateWithoutDuplicate('EnigMagick '+args, './?p=enigmagick/'+args);
	enigmagick_display(content);
}

function enigmagick_display(content) {
	console.log( "enigmagick_display." );
	$('#contentArea').html(content);
}

function enigmagick_permlink(permlink) {
	console.log( "enigmagick_permlink." );
	permlink = permlink.join("/");
	enigmagick_load(permlink);
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
