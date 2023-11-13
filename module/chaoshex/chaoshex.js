// Chaoshex template
var chaoshex_template;
var chaoshex_template_loaded = false;

/* A content module for a web based version of the ChaosHex software */
function chaoshex_menuitem(args) {
	return "javascript:chaoshex_load('');";
}
function chaoshex_load(args) {
	displayChaosHex();
	if(!chaoshex_template_loaded) {
		// Try to call enigmagick again in 1/10 of a second.
		setTimeout(function () {
			chaoshex_load(args);
		}, 100);
		return null;
	}
	pushStateWithoutDuplicate('ChaosHex3', './?p=chaoshex/');
}

function chaoshex_display(content) {
	$('#contentArea').html(content);
}

function chaoshex_permlink(permlink) {
	permlink = permlink.join("/");
	chaoshex_load(permlink);
}

function displayChaosHex() {
	var content = chaoshex_template;

	// Append content to contentArea
	//$('#contentArea').append(content);
	chaoshex_display(content);
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
