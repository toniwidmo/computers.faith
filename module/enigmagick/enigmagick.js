// EnigMagick template
var enigmagick_template;

/* A content module for a web based version of the ChaosHex software */
function enigmagick_menuitem(args) {
	return "javascript:enigmagick_load('');";
}
function enigmagick_load(args) {
	displayEnigMagick();
}

function enigmagick_display(content) {
	$('#contentArea').html(content);
}

function enigmagick_permlink(permlink) {
	permlink = permlink.join("/");
	enigmagick_load(permlink);
}

function displayEnigMagick() {
	var content = enigmagick_template;

	// Append content to contentArea
	//$('#contentArea').append(content);
	$('#contentArea').html(content);
}

//Template loaded functions
function enigmagickTemplateLoaded(template) {
	enigmagick_template = template;
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
