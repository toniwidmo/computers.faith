var markdown_libs_loaded = false;

/* A simple content module for loading a local markdown file and parsing it into html */
function markdown_menuitem(args) {
  return "javascript:markdown_load('"+args+"');";
}

function markdown_display(markdown) {
	var converter = new showdown.Converter();
  content = converter.makeHtml(markdown);

  $('#contentArea').html(content);
}
function markdown_load(md_file) {
  // File may or may not be contained in a JSON string and array. Strip uneeded characters
  md_file = md_file.replace(/"/g,'');
  md_file = md_file.replace(/\[/g,'');
  md_file = md_file.replace(/\]/g,'');
  
	if(!markdown_libs_loaded) {
		// Try to call menu again in 1/10 of a second.
		setTimeout(function () {
			markdown_load(args);
		}, 100);
		return null;
	}

  pushStateWithoutDuplicate(md_file, './?p=markdown/'+md_file);
  $.ajax({
      type: 'GET',
      url: "content/"+md_file
  }).done(markdown_display);
}
function markdown_permlink(permlink) {
  permlink = permlink.join("/");
  markdown_load(permlink);
}

//Load the showdown library (for parsing markdown)
$.getScript( "lib/showdown/showdown.min.js").done(function( script, textStatus ) {
  console.log( "showdown.min.js load was performed." );
  markdown_libs_loaded = true;
})
.fail(function( jqxhr, settings, exception ) {
  console.log( exception );
  console.log( jqxhr.status );
  console.log( settings );
  $( "div.log" ).text( "Triggered ajaxError handler." );
});